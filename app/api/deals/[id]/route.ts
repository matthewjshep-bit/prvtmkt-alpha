import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const deal = await prisma.deal.findUnique({
            where: { id },
        });
        if (!deal) {
            return NextResponse.json({ error: 'Deal not found' }, { status: 404 });
        }
        return NextResponse.json(deal);
    } catch (error: any) {
        console.error('[Deal API] GET Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const body = await req.json();
        const deal = await prisma.deal.update({
            where: { id },
            data: {
                address: body.address,
                assetType: body.assetType,
                strategy: body.strategy,
                purchaseAmount: body.purchaseAmount,
                financedAmount: body.financedAmount,
                stillImageURL: body.stillImageURL,
                isPublic: body.isPublic,
                capRate: body.capRate,
                sqFt: body.sqFt,
                firmId: body.firmId,
                teamMemberId: body.teamMemberId,
            },
        });
        return NextResponse.json(deal);
    } catch (error: any) {
        console.error('[Deal API] PUT Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await prisma.deal.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('[Deal API] DELETE Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
