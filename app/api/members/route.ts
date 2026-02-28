import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const members = await prisma.teamMember.findMany();
        return NextResponse.json(members);
    } catch (error: any) {
        console.error('[Members API] GET Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        console.log('[Members API] POST Request received:', JSON.stringify(body, null, 2));

        const member = await prisma.teamMember.create({
            data: {
                name: body.name,
                slug: body.slug || `${body.name.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).substring(2, 7)}`,
                role: body.role,
                email: body.email || null,
                imageURL: body.imageURL,
                linkedInUrl: body.linkedInUrl,
                phoneNumber: body.phoneNumber,
                bio: body.bio,
                heroMediaUrl: body.heroMediaUrl,
                firmIds: body.firmIds || [],
                firmId: body.firmId,
                sortOrder: body.sortOrder || body.order || 0,
                userId: body.userId || null,
            } as any,
        });

        console.log('[Members API] Member created successfully:', member.id);
        return NextResponse.json(member);
    } catch (error: any) {
        console.error('[Members API] POST Error details:', {
            message: error.message,
            code: error.code,
            meta: error.meta,
            stack: error.stack
        });
        return NextResponse.json({
            error: error.message,
            code: error.code,
            details: error.meta
        }, { status: 500 });
    }
}
