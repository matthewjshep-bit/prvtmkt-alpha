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
                bio: { type: "string" },
                logoUrl: { type: "string" },
                primaryColor: { type: "string", description: "The dominant brand hex color (e.g. #0055ff)" },
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
                    bio: { type: "string" },
                    imageURL: { type: "string" },
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
                    address: { type: "string" },
                    assetType: { type: "string", enum: ["INDUSTRIAL", "RETAIL", "MULTIFAMILY", "SF", "LAND"] },
                    strategy: { type: "string" },
                    description: { type: "string" },
                    stillImageURL: { type: "string" },
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

        // Call Firecrawl with extraction enabled
        // We use LLM extraction directly from Firecrawl if they support it, 
        // or we'll get the markdown and we can process it with an LLM here.
        const response = await axios.post(
            FIRECRAWL_API_URL,
            {
                url: url,
                formats: ["markdown", "extract"],
                extract: {
                    schema: EXTRACTION_SCHEMA,
                    prompt: "Extract the investment firm details, its team members, and its portfolio/completed deals. Be comprehensive about biographies and deal summaries. Focus on finding high-quality bios and images if available. For team member images, look for standard headshot URLs. For deals, look for property photos."
                }
            },
            {
                headers: {
                    Authorization: `Bearer ${apiKey}`,
                    "Content-Type": "application/json"
                },
                timeout: 60000 // Scrapes + AI can take a while
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
