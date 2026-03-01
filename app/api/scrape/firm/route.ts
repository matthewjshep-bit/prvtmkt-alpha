import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// This endpoint scrapes a firm's website using Firecrawl and extracts 
// structured data (Firm, Team, Deals) using AI.

const FIRECRAWL_API_URL = "https://api.firecrawl.dev/v1/scrape";
const FIRECRAWL_MAP_URL = "https://api.firecrawl.dev/v1/map";

// Default Schema for extraction
const EXTRACTION_SCHEMA = {
    type: "object",
    properties: {
        firm: {
            type: "object",
            properties: {
                name: { type: "string" },
                bio: { type: "string", description: "Comprehensive firm biography or mission statement" },
                logoUrl: { type: "string", description: "Full URL to high quality firm logo" },
                primaryColor: { type: "string", description: "The dominant brand hex color" },
                backgroundColor: { type: "string", description: "The suggested dark background hex color" },
                fontColor: { type: "string", description: "The suggested light text hex color" },
                accentColor: { type: "string", description: "The suggested accent brand hex color" },
                physicalAddress: { type: "string" },
                linkedInUrl: { type: "string" }
            },
            required: ["name"]
        },
        team: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    name: { type: "string" },
                    role: { type: "string" },
                    bio: { type: "string", description: "Detailed professional biography" },
                    imageURL: { type: "string", description: "URL to headshot photo" },
                    email: { type: "string" },
                    linkedInUrl: { type: "string" }
                },
                required: ["name"]
            }
        },
        deals: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    address: { type: "string", description: "Full address, property name, or title of the project (e.g. 'Hotel Emma')" },
                    assetType: { type: "string", description: "e.g. MULTIFAMILY, HOTEL, OFFICE, INDUSTRIAL, RETAIL, LAND, or MIXED_USE" },
                    strategy: { type: "string", description: "e.g. VALUE_ADD, CORE, FIX_FLIP, OPPORTUNISTIC, STABILIZED, or BUY_AND_HOLD" },
                    description: { type: "string", description: "Detailed narrative regarding this specific deal or property" },
                    imageURL: { type: "string", description: "Direct URL to a high-quality photo of the asset" },
                    images: {
                        type: "array",
                        items: { type: "string" },
                        description: "List of all high-quality image URLs found for this property"
                    },
                    purchaseAmount: { type: "string", description: "The dollar amount of the transaction if visible (as a string or number)" }
                }
            }
        }
    }
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
                error: "Firecrawl API Key is missing. Please add FIRECRAWL_API_KEY to your environment variables."
            }, { status: 500 });
        }

        console.log(`Phase 1: Mapping structure for ${url}...`);

        // 1. Map the site to find subpages
        let targetUrls = [url];
        const baseUrl = new URL(url).origin;
        try {
            const mapRes = await axios.post(FIRECRAWL_MAP_URL,
                { url, search: "team, about, leadership, portfolio, deals, projects, gallery, assets, properties" },
                { headers: { Authorization: `Bearer ${apiKey}` }, timeout: 15000 }
            );

            if (mapRes.data.success && mapRes.data.links && mapRes.data.links.length > 0) {
                const rawLinks = mapRes.data.links as string[];

                // Convert to absolute and filter
                const usefulLinks = rawLinks.map(l => {
                    if (l.startsWith('http')) return l;
                    if (l.startsWith('/')) return `${baseUrl}${l}`;
                    return `${baseUrl}/${l}`;
                }).filter(l => {
                    const low = l.toLowerCase();
                    return low.includes('team') ||
                        low.includes('leadership') ||
                        low.includes('portfolio') ||
                        low.includes('deals') ||
                        low.includes('projects') ||
                        low.includes('about') ||
                        low.includes('properties') ||
                        low.includes('asset');
                });

                const sortedLinks = usefulLinks.sort((a, b) => {
                    const lowA = a.toLowerCase();
                    const lowB = b.toLowerCase();

                    // Priority 1: Portfolio / Deals / Projects
                    const isPortA = lowA.includes('portfolio') || lowA.includes('projects') || lowA.includes('deals') || lowA.includes('properties');
                    const isPortB = lowB.includes('portfolio') || lowB.includes('projects') || lowB.includes('deals') || lowB.includes('properties');
                    if (isPortA && !isPortB) return -1;
                    if (isPortB && !isPortA) return 1;

                    // Priority 2: Team / About
                    const isTeamA = lowA.includes('team') || lowA.includes('leadership') || lowA.includes('about');
                    const isTeamB = lowB.includes('team') || lowB.includes('leadership') || lowB.includes('about');
                    if (isTeamA && !isTeamB) return -1;
                    if (isTeamB && !isTeamA) return 1;

                    return 0;
                });

                targetUrls = [...targetUrls, ...sortedLinks];
                // Limit to top 8 pages total for deeper discovery
                targetUrls = Array.from(new Set(targetUrls)).slice(0, 8);
            }
        } catch (mapErr) {
            console.warn("Map phase failed, falling back to homepage only scrape.");
        }

        console.log(`Phase 2: Scraping discovered pages: ${targetUrls.join(", ")}`);

        // 2. Scrape all target pages in parallel
        const scrapePromises = targetUrls.map(u => {
            const lowU = u.toLowerCase();
            const isPortfolio = lowU.includes('portfolio') || lowU.includes('projects') || lowU.includes('deals') || lowU.includes('properties');

            return axios.post(FIRECRAWL_API_URL,
                {
                    url: u,
                    formats: ["extract"],
                    // If it's a portfolio page, we MUST scroll and wait for images/cards to load
                    actions: isPortfolio ? [
                        { type: "wait", milliseconds: 1500 },
                        { type: "scroll", direction: "down", amount: 2000 },
                        { type: "wait", milliseconds: 1000 },
                        { type: "scroll", direction: "down", amount: 2000 },
                        { type: "wait", milliseconds: 1000 }
                    ] : [],
                    extract: {
                        schema: EXTRACTION_SCHEMA,
                        prompt: "Extract firm details, team members, and portfolio assets/projects from this page. Find name, bio, logoUrl, brand colors for the firm. Extract every team member with their Name, Role, Bio, and ImageURL. For projects/deals, use the Project Name (e.g. 'Hotel Emma') as the 'address' field. Also capture AssetType, Strategy, Description, imageURL, and ALL other gallery photos in the 'images' array. Capture everything you see."
                    }
                },
                { headers: { Authorization: `Bearer ${apiKey}` }, timeout: 85000 }
            ).catch(err => {
                console.error(`Scrape failed for ${u}:`, err.response?.data || err.message);
                return { data: { success: false, error: err.message, status: err.response?.status } };
            });
        });

        const results = await Promise.all(scrapePromises);

        // 3. Merge Results
        const mergedData: any = {
            firm: null,
            team: [],
            deals: []
        };

        const teamMap = new Map<string, any>();
        const dealMap = new Map<string, any>();

        results.forEach((res, index) => {
            const url = targetUrls[index];
            if (res.data?.success) {
                const ext = res.data.data?.extract || res.data.data || {};
                const metadata = res.data.data?.metadata || {};

                console.log(`Processing results for ${url}... found team: ${ext.team?.length || 0}, deals: ${ext.deals?.length || 0}`);

                // Merge Firm info
                if (ext.firm?.name || metadata.title) {
                    if (!mergedData.firm) {
                        mergedData.firm = {
                            name: ext.firm?.name || metadata.title,
                            bio: ext.firm?.bio || metadata.description || "",
                            logoUrl: ext.firm?.logoUrl || metadata.ogImage || "",
                            ...ext.firm
                        };
                    } else if (ext.firm) {
                        if (ext.firm.bio && ext.firm.bio.length > (mergedData.firm.bio?.length || 0)) {
                            mergedData.firm.bio = ext.firm.bio;
                        }
                        mergedData.firm = { ...ext.firm, ...mergedData.firm };
                    }
                }

                // Merge and deduplicate Team with comparison
                const teamArr = Array.isArray(ext.team) ? ext.team : [];
                teamArr.forEach((m: any) => {
                    const key = (m.name || "").toLowerCase().trim();
                    if (!key) return;
                    const existing = teamMap.get(key);
                    if (!existing) {
                        teamMap.set(key, m);
                    } else if ((m.bio?.length || 0) > (existing.bio?.length || 0)) {
                        teamMap.set(key, { ...existing, ...m });
                    }
                });

                // Merge and deduplicate Deals with comparison
                const dealsArr = Array.isArray(ext.deals) ? ext.deals : [];
                dealsArr.forEach((d: any) => {
                    const key = (d.address || "").toLowerCase().trim();
                    if (!key) return;
                    const existing = dealMap.get(key);
                    if (!existing) {
                        dealMap.set(key, { ...d, images: Array.from(new Set([d.imageURL, ...(d.images || [])])).filter(Boolean) });
                    } else {
                        // Prefer longer description
                        if ((d.description?.length || 0) > (existing.description?.length || 0)) {
                            existing.description = d.description;
                        }
                        // Aggregate images
                        existing.images = Array.from(new Set([...existing.images, d.imageURL, ...(d.images || [])])).filter(Boolean);
                        if (!existing.imageURL && d.imageURL) existing.imageURL = d.imageURL;

                        // Supplement fields
                        if (!existing.assetType && d.assetType) existing.assetType = d.assetType;
                        if (!existing.strategy && d.strategy) existing.strategy = d.strategy;
                    }
                });
            } else {
                console.warn(`Scrape failed for ${url}: ${res.data?.error || "Unknown error"}`);
            }
        });

        mergedData.team = Array.from(teamMap.values());
        mergedData.deals = Array.from(dealMap.values());

        // Ensure we ALWAYS have a firm object even if extraction was shaky
        if (!mergedData.firm) {
            mergedData.firm = { name: "Imported Firm" };
        }

        // Final name cleaning
        if (mergedData.firm.name) {
            mergedData.firm.name = mergedData.firm.name.replace(/ \| .*/, '').replace(/ - .*/, '').trim();
        }

        return NextResponse.json({
            success: true,
            data: mergedData,
            scrapedCount: targetUrls.length,
            pageUrls: targetUrls
        });

    } catch (error: any) {
        console.error("Deep Import Error:", error.response?.data || error.message);
        return NextResponse.json({
            error: "Failed to process website structure",
            detail: error.response?.data || error.message
        }, { status: 500 });
    }
}
