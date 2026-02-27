import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const members = await prisma.teamMember.findMany({
            orderBy: {
                name: 'asc',
            },
        });
        return NextResponse.json(members);
    } catch (error: any) {
        console.error('[Members API] GET Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const member = await prisma.teamMember.create({
            data: {
                name: body.name,
                slug: body.slug || body.name.toLowerCase().replace(/\s+/g, '-'),
                role: body.role,
                email: body.email || null,
                imageURL: body.imageURL,
                linkedInUrl: body.linkedInUrl,
                phoneNumber: body.phoneNumber,
                bio: body.bio,
                heroMediaUrl: body.heroMediaUrl,
                firmIds: body.firmIds || [],
                firmId: body.firmId,
            },
        });
        return NextResponse.json(member);
    } catch (error: any) {
        console.error('[Members API] POST Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
