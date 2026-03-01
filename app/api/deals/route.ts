import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const deals = await prisma.deal.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json(deals);
    } catch (error: any) {
        console.error('[Deals API] GET Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log(`[Deals API] POST Request received for firm: ${body.firmId}`);

        if (!body.firmId) {
            return NextResponse.json({ error: "firmId is required" }, { status: 400 });
        }

        // Helper to parse numeric strings (strips currency symbols and commas)
        const parseNum = (val: any) => {
            if (val === undefined || val === null || val === '') return null;
            if (typeof val === 'number') return val;
            const clean = String(val).replace(/[^0-9.-]/g, '');
            const parsed = parseFloat(clean);
            return isNaN(parsed) ? null : parsed;
        };

        const address = (body.address || body.propertyName || body.name || "Unknown Property").trim();

        // 1. Check for existing deal with same address and firmId (Case-Insensitive)
        const existingDeal = await prisma.deal.findFirst({
            where: {
                firmId: body.firmId,
                address: {
                    equals: address,
                    mode: 'insensitive'
                }
            }
        });

        const data: any = {
            address: address,
            assetType: body.assetType || "INDUSTRIAL",
            strategy: body.strategy || "CORE",
            purchaseAmount: parseNum(body.purchaseAmount),
            financedAmount: parseNum(body.financedAmount),
            rehabAmount: parseNum(body.rehabAmount),
            arv: parseNum(body.arv),
            capRate: parseNum(body.capRate),
            sqFt: parseNum(body.sqFt),
            stillImageURL: body.stillImageURL,
            generatedVideoURL: body.generatedVideoURL,
            isPublic: body.isPublic ?? true,
            context: body.context || body.description || "",
            financingType: body.financingType,
            investmentOverview: body.investmentOverview,
            images: Array.isArray(body.images) ? body.images : [],
            teamMemberIds: Array.isArray(body.teamMemberIds) ? body.teamMemberIds : [],
        };

        let deal;
        if (existingDeal) {
            console.log(`[Deals API] Duplicate detected for address "${address}". Updating existing deal: ${existingDeal.id}`);

            // Merge logic: Supplement images and prefer longer context
            const mergedImages = Array.from(new Set([...existingDeal.images, ...data.images])).filter(Boolean);
            const finalContext = (data.context?.length || 0) > (existingDeal.context?.length || 0)
                ? data.context
                : existingDeal.context;

            deal = await prisma.deal.update({
                where: { id: existingDeal.id },
                data: {
                    ...data,
                    images: mergedImages,
                    context: finalContext,
                    // Preserve original image if new one is missing
                    stillImageURL: data.stillImageURL || existingDeal.stillImageURL
                }
            });
        } else {
            console.log(`[Deals API] Creating new asset/deal: ${address}`);
            deal = await prisma.deal.create({
                data: {
                    ...data,
                    firm: { connect: { id: body.firmId } },
                }
            });
        }

        return NextResponse.json(deal);
    } catch (error: any) {
        console.error('[Deals API] POST Error details:', {
            message: error.message,
            code: error.code,
            meta: error.meta
        });
        return NextResponse.json({
            error: `Database Error: ${error.message}`,
            code: error.code,
            details: error.meta
        }, { status: 500 });
    }
}
