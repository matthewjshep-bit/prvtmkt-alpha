import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const firm = await prisma.firm.findUnique({
            where: { id },
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
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const body = await req.json();
        console.log(`[Firm API] PUT Request for ID: ${id}`);
        console.log(`[Firm API] Payload:`, JSON.stringify(body, null, 2));

        const firm = await prisma.firm.update({
            where: { id },
            data: {
                name: body.name,
                slug: body.slug,
                logoUrl: body.logoUrl,
                primaryColor: body.primaryColor,
                backgroundColor: body.backgroundColor,
                fontColor: body.fontColor,
                accentColor: body.accentColor,
                showAgencyBranding: body.showAgencyBranding,
                bio: body.bio,
                heroMediaUrl: body.heroMediaUrl,
                physicalAddress: body.physicalAddress,
                linkedInUrl: body.linkedInUrl,
                googleReviewsUrl: body.googleReviewsUrl,
                logoScale: body.logoScale,
                borderRadius: body.borderRadius,
                isColorLinked: body.isColorLinked,
                isFontLinked: body.isFontLinked,
                firmNameFontFamily: body.firmNameFontFamily,
                firmNameFontWeight: body.firmNameFontWeight,
                firmNameFontSize: body.firmNameFontSize,
                firmNameFontColor: body.firmNameFontColor,
                bioFontFamily: body.bioFontFamily,
                bioFontSize: body.bioFontSize,
                bioFontColor: body.bioFontColor,
            },
        });

        // Trigger cache invalidation for global style propagation
        revalidatePath(`/firms/${firm.slug}`);
        revalidatePath(`/admin/${firm.slug}/mysite`);
        revalidatePath('/'); // For global dashboards if applicable

        return NextResponse.json(firm);
    } catch (error: any) {
        console.error('[Firm API] PUT Error:', error);
        return NextResponse.json({
            error: error.message,
            stack: error.stack,
            cause: error.cause,
            code: error.code // Prisma error codes
        }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await prisma.firm.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('[Firm API] DELETE Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
