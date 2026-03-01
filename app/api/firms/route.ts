import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';

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
                backgroundColor: body.backgroundColor || '#4987a7',
                fontColor: body.fontColor,
                accentColor: body.accentColor || '#4987a7',
                showAgencyBranding: body.showAgencyBranding,
                bio: body.bio,
                heroMediaUrl: body.heroMediaUrl,
                physicalAddress: body.physicalAddress,
                linkedInUrl: body.linkedInUrl,
                googleReviewsUrl: body.googleReviewsUrl,
                logoScale: body.logoScale,
                borderRadius: body.borderRadius,
                isColorLinked: body.isColorLinked ?? true,
                isFontLinked: body.isFontLinked,
                firmNameFontFamily: body.firmNameFontFamily,
                firmNameFontWeight: body.firmNameFontWeight,
                firmNameFontSize: body.firmNameFontSize,
                firmNameFontColor: body.firmNameFontColor,
                bioFontFamily: body.bioFontFamily,
                bioFontSize: body.bioFontSize,
                bioFontColor: body.bioFontColor,
                showSearchBar: body.showSearchBar,
                cardShadowIntensity: body.cardShadowIntensity,
                viewLayoutMode: body.viewLayoutMode,
                portfolioListStyle: body.portfolioListStyle,
                teamListStyle: body.teamListStyle,
            },
        });
        return NextResponse.json(firm);
    } catch (error: any) {
        console.error('[Firms API] POST Error details:', {
            error: error.message,
            payload: body || 'Empty Body',
            stack: error.stack
        });
        return NextResponse.json({
            error: `Database Creation Failed: ${error.message}`,
            details: error.code || 'UNKNOWN_PRISMA_ERROR'
        }, { status: 500 });
    }
}
