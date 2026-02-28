import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const users = await prisma.user.findMany();
        const activities = await prisma.activityLog.findMany({
            orderBy: { timestamp: 'desc' },
            take: 20
        });
        return NextResponse.json({ users, activities });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
