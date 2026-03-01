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
                backgroundColor: { type: "string", description: "The suggested dark background hex color (e.g. #0a0a0a or similar dark brand color)" },
                fontColor: { type: "string", description: "The suggested light text hex color (e.g. #ffffff)" },
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
                    imageURL: { type: "string", description: "URL to high quality headshot" },
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
                    address: { type: "string", description: "Title or address of the property/deal" },
                    assetType: { type: "string", enum: ["INDUSTRIAL", "RETAIL", "MULTIFAMILY", "SF", "LAND", "OFFICE", "MIXED_USE"] },
                    strategy: { type: "string", description: "Investment strategy (e.g. Value-Add, Core, Debt)" },
                    description: { type: "string", description: "Detailed description of the deal/asset" },
                    imageURL: { type: "string", description: "High quality property or asset photo URL" },
                    purchaseAmount: { type: "number" }
                },
                required: ["address"]
            }
        }
    },
    required: []
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
                { url, search: "team, about, leadership, portfolio, deals" },
                { headers: { Authorization: `Bearer ${apiKey}` }, timeout: 12000 }
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
                        low.includes('about');
                });

                const sortedLinks = usefulLinks.sort((a, b) => {
                    const lowA = a.toLowerCase();
                    const lowB = b.toLowerCase();
                    if (lowA.includes('team') || lowA.includes('leadership')) return -1;
                    if (lowB.includes('team') || lowB.includes('leadership')) return 1;
                    return 0;
                });

                targetUrls = [...targetUrls, ...sortedLinks];
                // Limit to top 3 pages total (Homepage + 2 best matches)
                targetUrls = Array.from(new Set(targetUrls)).slice(0, 3);
            }
        } catch (mapErr) {
            console.warn("Map phase failed, falling back to homepage only scrape.");
        }

        console.log(`Phase 2: Scraping discovered pages: ${targetUrls.join(", ")}`);

        // 2. Scrape all target pages in parallel
        const scrapePromises = targetUrls.map(u =>
            axios.post(FIRECRAWL_API_URL,
                {
                    url: u,
                    formats: ["extract"],
                    actions: [
                        { type: "wait", milliseconds: 1000 },
                        { type: "scrollToBottom" },
                        { type: "wait", milliseconds: 500 }
                    ],
                    extract: {
                        schema: EXTRACTION_SCHEMA,
                        prompt: "Perform an exhaustive extraction of firm data, team members, and properties/deals. 1. Search for a section called 'Our Team', 'Leadership', or 'People'. Extract every individual listed, including their Name, Role, and their headshot image URL. 2. Look for 'Portfolio' or 'Deals' sections. Extract every asset with its address/name, asset type, strategy, description, and property photo. 3. Identify brand colors (primary, background, accent) and firm bio."
                    }
                },
                { headers: { Authorization: `Bearer ${apiKey}` }, timeout: 45000 }
            ).catch(err => {
                console.error(`Scrape failed for ${u}:`, err.message);
                return { data: { success: false } };
            })
        );

        const results = await Promise.all(scrapePromises);

        // 3. Merge Results
        const mergedData: any = {
            firm: null,
            team: [],
            deals: []
        };

        const seenTeam = new Set<string>();
        const seenDeals = new Set<string>();

        results.forEach((res, index) => {
            const url = targetUrls[index];
            if (res.data?.success) {
                // Firecrawl sometimes puts extraction in different places depending on version/config
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
                        // Supplement existing firm data if we find longer bio or more fields
                        if (ext.firm.bio && ext.firm.bio.length > (mergedData.firm.bio?.length || 0)) {
                            mergedData.firm.bio = ext.firm.bio;
                        }
                        mergedData.firm = { ...ext.firm, ...mergedData.firm };
                    }
                }

                // Merge and deduplicate Team
                const teamArr = Array.isArray(ext.team) ? ext.team : [];
                teamArr.forEach((m: any) => {
                    const key = (m.name || "").toLowerCase().trim();
                    if (key && !seenTeam.has(key)) {
                        seenTeam.add(key);
                        mergedData.team.push(m);
                    }
                });

                // Merge and deduplicate Deals
                const dealsArr = Array.isArray(ext.deals) ? ext.deals : [];
                dealsArr.forEach((d: any) => {
                    const addressKey = (d.address || "").toLowerCase().trim();
                    if (addressKey && !seenDeals.has(addressKey)) {
                        seenDeals.add(addressKey);
                        mergedData.deals.push(d);
                    }
                });
            } else {
                console.warn(`Scrape failed for ${url}: ${res.data?.error || "Unknown error"}`);
            }
        });

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
