import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { members } = await req.json();

        if (!Array.isArray(members)) {
            return NextResponse.json({ error: 'Invalid members data' }, { status: 400 });
        }

        // Perform bulk updates in a transaction
        await prisma.$transaction(
            members.map((m: { id: string; order: number }) =>
                prisma.teamMember.update({
                    where: { id: m.id },
                    data: { sortOrder: m.order } as any,
                })
            )
        );

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('[Members Reorder API] POST Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
