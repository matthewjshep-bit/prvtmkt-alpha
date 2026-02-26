import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const firms = await prisma.firm.findMany({
            include: {
                teamMembers: true,
                deals: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json(firms);
    } catch (error: any) {
        console.error('[Firms API] GET Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const firm = await prisma.firm.create({
            data: {
                name: body.name,
                slug: body.slug || body.name.toLowerCase().replace(/\s+/g, '-'),
                logoUrl: body.logoUrl,
                primaryColor: body.primaryColor,
                bio: body.bio,
                physicalAddress: body.physicalAddress,
                linkedInUrl: body.linkedInUrl,
                googleReviewsUrl: body.googleReviewsUrl,
            },
        });
        return NextResponse.json(firm);
    } catch (error: any) {
        console.error('[Firms API] POST Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
