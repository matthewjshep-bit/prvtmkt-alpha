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
        const updateData: any = {};
        const fields = [
            'address', 'assetType', 'strategy', 'purchaseAmount', 'financedAmount',
            'rehabAmount', 'arv', 'stillImageURL', 'generatedVideoURL', 'isPublic',
            'capRate', 'sqFt', 'investmentOverview', 'images', 'financingType',
            'teamMemberIds', 'context', 'firmId', 'teamMemberId'
        ];

        fields.forEach(field => {
            if (body[field] !== undefined) updateData[field] = body[field];
        });

        const deal = await prisma.deal.update({
            where: { id },
            data: updateData,
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
