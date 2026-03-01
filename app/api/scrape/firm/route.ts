import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// This endpoint scrapes a firm's website using Firecrawl and extracts 
// structured data (Firm, Team, Deals) using AI.

const FIRECRAWL_API_URL = "https://api.firecrawl.dev/v1/scrape";

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
    required: ["firm"]
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

        console.log(`Scraping and analyzing firm: ${url}`);

        const response = await axios.post(
            FIRECRAWL_API_URL,
            {
                url: url,
                formats: ["markdown", "extract"],
                extract: {
                    schema: EXTRACTION_SCHEMA,
                    prompt: "Perform a deep extraction of the investment firm's details, team members, and portfolio assets. 1. Find the firm bio and brand colors. 2. Identify all team members, extracting their full names, detailed professional bios, and links to their high-resolution headshot photos. 3. Find historical or current real estate deals/assets, including their names/addresses, types, descriptions, and property photos. Be extremely thorough and prioritize finding real image URLs for people and properties."
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                timeout: 90000
            }
        );

        if (response.data.success) {
            const extractedData = response.data.data.extract || response.data.data.metadata;
            return NextResponse.json({
                success: true,
                data: extractedData,
                rawMarkdown: response.data.data.markdown // For debugging if something is missed
            });
        } else {
            console.error("Firecrawl Error:", response.data);
            return NextResponse.json({ error: "Scraping failed", detail: response.data.error }, { status: 500 });
        }

    } catch (error: any) {
        console.error("Import Firm Error:", error.response?.data || error.message);
        return NextResponse.json({
            error: "Failed to process website",
            detail: error.response?.data || error.message
        }, { status: 500 });
    }
}
