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
            'showSearchBar', 'cardShadowIntensity', 'viewLayoutMode', 'portfolioListStyle', 'teamListStyle',
            'tombstoneLayout', 'tombstonePadding', 'tombstoneMaxWidth',
            'tombstoneInfoBgColor', 'tombstoneMetricsBgColor', 'tombstoneMediaBgColor', 'tombstoneNarrativeBgColor'
        ];

        const intFields = ['bioFontSize', 'firmNameFontSize', 'memberPhotoSpacing', 'tombstonePadding', 'tombstoneMaxWidth'];
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

        console.log(`[Firm API] Updating firm ${id} with Data:`, JSON.stringify(updateData, null, 2));

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
        console.log(`[Firm API] Deep Delete initiated for Firm: ${id}`);

        // Perform cascading deletions in a transaction to ensure atomicity
        await prisma.$transaction(async (tx) => {
            // 1. Delete all deals associated with this firm
            const deletedDeals = await tx.deal.deleteMany({
                where: { firmId: id }
            });
            console.log(`[Firm API] Deleted ${deletedDeals.count} associated deals.`);

            // 2. Delete all activities associated with this firm
            await tx.activityLog.deleteMany({
                where: { firmId: id }
            });

            // 3. Delete all invitations associated with this firm
            await tx.invitation.deleteMany({
                where: { firmId: id }
            });

            // 4. Handle Team Members
            // First, find all members to log or handle specific logic
            const members = await tx.teamMember.findMany({
                where: { firmId: id }
            });

            // Delete all team members
            const deletedMembers = await tx.teamMember.deleteMany({
                where: { firmId: id }
            });
            console.log(`[Firm API] Deleted ${deletedMembers.count} associated team members.`);

            // 5. Handle Users (Optional: Keep users but detach firm? No, user belongsTo firm)
            // If the user is only associated with this firm, we should delete them
            await tx.user.deleteMany({
                where: { firmId: id }
            });

            // 6. Delete the Firm itself
            await tx.firm.delete({
                where: { id },
            });
        });

        console.log(`[Firm API] Firm ${id} and all sub-entities cleared.`);
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('[Firm API] DELETE Error:', error);
        return NextResponse.json({
            error: "Failed to delete firm and its associations",
            details: error.message
        }, { status: 500 });
    }
}
