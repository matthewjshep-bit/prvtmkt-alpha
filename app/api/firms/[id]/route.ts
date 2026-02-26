import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const firm = await prisma.firm.findUnique({
            where: { id: params.id },
            include: {
                teamMembers: true,
                deals: true,
            },
        });
        if (!firm) {
            return NextResponse.json({ error: 'Firm not found' }, { status: 404 });
        }
        return NextResponse.json(firm);
    } catch (error: any) {
        console.error('[Firm API] GET Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await req.json();
        const firm = await prisma.firm.update({
            where: { id: params.id },
            data: {
                name: body.name,
                slug: body.slug,
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
        console.error('[Firm API] PUT Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        await prisma.firm.delete({
            where: { id: params.id },
        });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('[Firm API] DELETE Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
