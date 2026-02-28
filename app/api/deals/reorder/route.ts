import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { deals } = await req.json();

        if (!Array.isArray(deals)) {
            return NextResponse.json({ error: 'Invalid deals data' }, { status: 400 });
        }

        // Perform bulk updates in a transaction
        await prisma.$transaction(
            deals.map((d: { id: string; order: number }) =>
                prisma.deal.update({
                    where: { id: d.id },
                    data: { sortOrder: d.order } as any,
                })
            )
        );

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('[Deals Reorder API] POST Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
