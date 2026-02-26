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
        const data: any = {
            address: body.address,
            assetType: body.assetType,
            strategy: body.strategy,
            purchaseAmount: body.purchaseAmount,
            financedAmount: body.financedAmount,
            stillImageURL: body.stillImageURL,
            isPublic: body.isPublic ?? false,
            capRate: body.capRate,
            sqFt: body.sqFt,
            firm: { connect: { id: body.firmId } },
        };

        const teamMemberId = body.teamMemberId || (Array.isArray(body.teamMemberIds) && body.teamMemberIds[0]);
        if (teamMemberId) {
            data.teamMember = { connect: { id: teamMemberId } };
        }

        const deal = await prisma.deal.create({ data });
        return NextResponse.json(deal);
    } catch (error: any) {
        console.error('[Deals API] POST Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
