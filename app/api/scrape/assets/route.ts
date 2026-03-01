import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// This endpoint is specialized for scraping ONLY assets/deals/properties from a website.
// It prioritizes portfolio/projects/deals pages and uses a refined extraction schema.

const FIRECRAWL_API_URL = "https://api.firecrawl.dev/v1/scrape";
const FIRECRAWL_MAP_URL = "https://api.firecrawl.dev/v1/map";

const ASSET_EXTRACTION_SCHEMA = {
    type: "object",
    properties: {
        deals: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    address: { type: "string", description: "Full address, property name, or title of the project (e.g. 'Hotel Emma')" },
                    assetType: { type: "string", description: "e.g. MULTIFAMILY, HOTEL, OFFICE, INDUSTRIAL, RETAIL, LAND, or MIXED_USE" },
                    strategy: { type: "string", description: "e.g. VALUE_ADD, CORE, FIX_FLIP, OPPORTUNISTIC, STABILIZED, or BUY_AND_HOLD" },
                    description: { type: "string", description: "Detailed narrative or full biography regarding this specific deal or property" },
                    imageURL: { type: "string", description: "Direct URL to the BEST/Main high-quality photo of the asset" },
                    images: {
                        type: "array",
                        items: { type: "string" },
                        description: "List of all high-quality image URLs found for this property (gallery)"
                    },
                    purchaseAmount: { type: "string", description: "The dollar amount of the transaction if visible" },
                    sqFt: { type: "number", description: "The square footage of the property if visible" },
                    yearBuilt: { type: "number", description: "The year the property was built or renovated" }
                },
                required: ["address"]
            }
        }
    },
    required: ["deals"]
};

export async function POST(req: NextRequest) {
    try {
        const { url } = await req.json();

        if (!url) {
            return NextResponse.json({ error: "URL is required" }, { status: 400 });
        }

        const apiKey = process.env.FIRECRAWL_API_KEY;
        if (!apiKey) {
            return NextResponse.json({
                error: "Firecrawl API Key is missing."
            }, { status: 500 });
        }

        console.log(`[Asset Scraper] Mapping structure for ${url}...`);

        let targetUrls = [url];
        const baseUrl = new URL(url).origin;

        try {
            // Enhanced mapping to find specific property pages
            const mapRes = await axios.post(FIRECRAWL_MAP_URL,
                { url, search: "portfolio, deals, projects, gallery, assets, investments, properties, detail" },
                { headers: { Authorization: `Bearer ${apiKey}` }, timeout: 15000 }
            );

            if (mapRes.data.success && mapRes.data.links && mapRes.data.links.length > 0) {
                const rawLinks = mapRes.data.links as string[];

                const usefulLinks = rawLinks.map(l => {
                    if (l.startsWith('http')) return l;
                    if (l.startsWith('/')) return `${baseUrl}${l}`;
                    return `${baseUrl}/${l}`;
                }).filter(l => {
                    const low = l.toLowerCase();
                    // Keep links that look like portfolio pages OR specific property/project pages
                    return low.includes('portfolio') ||
                        low.includes('deals') ||
                        low.includes('projects') ||
                        low.includes('gallery') ||
                        low.includes('assets') ||
                        low.includes('properties') ||
                        low.includes('investments') ||
                        low.includes('detail') ||
                        low.includes('/property/') ||
                        low.includes('/project/');
                });

                // Scoring system to prioritize pages likely to have many assets vs one asset
                const sortedLinks = usefulLinks.sort((a, b) => {
                    const lowA = a.toLowerCase();
                    const lowB = b.toLowerCase();
                    const score = (s: string) => {
                        let pts = 0;
                        if (s.includes('portfolio')) pts += 10;
                        if (s.includes('projects')) pts += 8;
                        if (s.includes('deals')) pts += 6;
                        if (s.includes('properties')) pts += 5;
                        if (s.includes('detail') || s.includes('/property/') || s.includes('/project/')) pts += 2;
                        return pts;
                    };
                    return score(lowB) - score(lowA);
                });

                targetUrls = [...targetUrls, ...sortedLinks];
                // Limit to top 8 highly relevant pages for better coverage without extreme cost
                targetUrls = Array.from(new Set(targetUrls)).slice(0, 8);
            }
        } catch (mapErr) {
            console.warn("[Asset Scraper] Map phase failed or timed out.");
        }

        console.log(`[Asset Scraper] Scraping ${targetUrls.length} pages: ${targetUrls.join(", ")}`);

        const scrapePromises = targetUrls.map(u => {
            return axios.post(FIRECRAWL_API_URL,
                {
                    url: u,
                    formats: ["extract"],
                    actions: [
                        { type: "wait", milliseconds: 2000 },
                        { type: "scroll", direction: "down", amount: 2000 },
                        { type: "wait", milliseconds: 1500 },
                        { type: "scroll", direction: "down", amount: 2000 },
                        { type: "wait", milliseconds: 1000 }
                    ],
                    extract: {
                        schema: ASSET_EXTRACTION_SCHEMA,
                        prompt: "Extract every real estate asset, property, or project listed on this page. For each, capture the project/property name (e.g. 'Hotel Emma') and use it as the 'address' field. Also capture asset type, strategy, a detailed description, and a direct URL to its main photo, PLUS all other high-quality photos found in the 'images' array. Be extremely thorough. If you find a detailed biography or project description, capture the whole thing."
                    }
                },
                { headers: { Authorization: `Bearer ${apiKey}` }, timeout: 90000 }
            ).catch(err => {
                console.error(`[Asset Scraper] Failed for ${u}:`, err.response?.data || err.message);
                return { data: { success: false, error: err.message } };
            });
        });

        const results = await Promise.all(scrapePromises);

        // Merging logic with "Better Record" preference
        const dealMap = new Map<string, any>();

        results.forEach((res) => {
            if (res.data?.success) {
                const ext = res.data.data?.extract || res.data.data || {};
                const dealsArr = Array.isArray(ext.deals) ? ext.deals : [];

                dealsArr.forEach((d: any) => {
                    const key = (d.address || "").toLowerCase().trim();
                    if (!key) return;

                    const existing = dealMap.get(key);
                    if (!existing) {
                        dealMap.set(key, { ...d, images: Array.from(new Set([d.imageURL, ...(d.images || [])])).filter(Boolean) });
                    } else {
                        // Merge logic: prefer record with MORE information
                        // 1. Prefer longer description
                        if ((d.description?.length || 0) > (existing.description?.length || 0)) {
                            existing.description = d.description;
                        }
                        // 2. Aggregate images
                        const newImages = Array.from(new Set([...existing.images, d.imageURL, ...(d.images || [])])).filter(Boolean);
                        existing.images = newImages;
                        if (!existing.imageURL && d.imageURL) existing.imageURL = d.imageURL;

                        // 3. Supplement missing fields
                        if (!existing.assetType && d.assetType) existing.assetType = d.assetType;
                        if (!existing.strategy && d.strategy) existing.strategy = d.strategy;
                        if (!existing.sqFt && d.sqFt) existing.sqFt = d.sqFt;
                        if (!existing.yearBuilt && d.yearBuilt) existing.yearBuilt = d.yearBuilt;
                    }
                });
            }
        });

        const mergedDeals = Array.from(dealMap.values());
        console.log(`[Asset Scraper] Successfully extracted ${mergedDeals.length} unique assets with deep merging.`);

        return NextResponse.json({
            success: true,
            deals: mergedDeals,
            scrapedCount: targetUrls.length,
            pageUrls: targetUrls
        });

    } catch (error: any) {
        console.error("[Asset Scraper] Critical Error:", error.response?.data || error.message);
        return NextResponse.json({
            error: "Failed to scrape assets",
            detail: error.response?.data || error.message
        }, { status: 500 });
    }
}
