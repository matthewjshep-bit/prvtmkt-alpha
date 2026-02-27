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
        // For debugging in this environment
        try {
            const fs = require('fs');
            fs.appendFileSync('/tmp/firm_put_payload.log', `\n--- ${new Date().toISOString()} ---\nID: ${id}\nPayload: ${JSON.stringify(body, null, 2)}\n`);
        } catch (e) { }

        const updateData: any = {};
        const fields = [
            'name', 'slug', 'logoUrl', 'primaryColor', 'backgroundColor', 'fontColor',
            'accentColor', 'showAgencyBranding', 'bio', 'heroMediaUrl', 'physicalAddress',
            'linkedInUrl', 'googleReviewsUrl', 'logoScale', 'borderRadius', 'isColorLinked',
            'isFontLinked', 'firmNameFontFamily', 'firmNameFontWeight', 'firmNameFontSize',
            'firmNameFontColor', 'bioFontFamily', 'bioFontSize', 'bioFontColor',
            'memberCardBgColor', 'memberPhotoSpacing', 'showMemberNarrative', 'isMemberCardColorLinked',
            'showSearchBar', 'cardShadowIntensity', 'viewLayoutMode', 'portfolioListStyle', 'teamListStyle'
        ];

        const intFields = ['bioFontSize', 'firmNameFontSize', 'memberPhotoSpacing'];
        const floatFields = ['logoScale', 'cardShadowIntensity'];
        const booleanFields = ['showAgencyBranding', 'isColorLinked', 'isFontLinked', 'showMemberNarrative', 'isMemberCardColorLinked', 'showSearchBar'];

        fields.forEach(field => {
            if (body[field] !== undefined && body[field] !== null) {
                if (intFields.includes(field)) {
                    const val = parseInt(String(body[field]));
                    if (!isNaN(val)) {
                        updateData[field] = val;
                    }
                } else if (floatFields.includes(field)) {
                    const val = parseFloat(String(body[field]));
                    if (!isNaN(val)) {
                        updateData[field] = val;
                    }
                } else if (booleanFields.includes(field)) {
                    updateData[field] = Boolean(body[field]);
                } else {
                    updateData[field] = body[field];
                }
            }
        });

        console.log(`[Firm API] Updating firm ${id} with fields:`, Object.keys(updateData));

        const firm = await prisma.firm.update({
            where: { id },
            data: updateData,
        });

        // Trigger cache invalidation for global style propagation
        try {
            revalidatePath(`/firms/${firm.slug}`);
            revalidatePath(`/admin/${firm.slug}/mysite`);
        } catch (revalidateError) {
            console.error('[Firm API] Revalidation Error (ignoring):', revalidateError);
        }

        return NextResponse.json(firm);
    } catch (error: any) {
        console.error('[Firm API] PUT Error:', error);

        // Handle specific Prisma errors
        if (error.code === 'P2002') {
            return NextResponse.json({ error: 'Unique constraint failed (likely the slug)' }, { status: 400 });
        }

        return NextResponse.json({
            error: error.message || 'Unknown database error',
            details: error.meta || error.clientVersion || 'No additional details',
            code: error.code
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
