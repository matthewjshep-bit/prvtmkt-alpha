import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const activities = await prisma.activityLog.findMany({
            orderBy: {
                timestamp: 'desc',
            },
            take: 100, // Limit to recent 100
        });
        return NextResponse.json(activities);
    } catch (error: any) {
        console.error('[Activities API] GET Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const activity = await prisma.activityLog.create({
            data: {
                type: body.type,
                title: body.title,
                firmId: body.firmId || null,
                dealId: body.dealId || null,
                userId: body.userId || null,
                memberId: body.memberId || null,
            },
        });
        return NextResponse.json(activity);
    } catch (error: any) {
        console.error('[Activities API] POST Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
