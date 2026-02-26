import 'dotenv/config';
import { PrismaClient, AssetType, Strategy, UserRole } from '@prisma/client';
import { MOCK_FIRMS, MOCK_DEALS, MOCK_TEAM_MEMBERS } from '../lib/mock-data';

const prisma = new PrismaClient();

async function main() {
    console.log('Start seeding...');

    // 1. Create Firms
    for (const mockFirm of MOCK_FIRMS) {
        await prisma.firm.upsert({
            where: { slug: mockFirm.slug },
            update: {},
            create: {
                id: mockFirm.id,
                name: mockFirm.name,
                slug: mockFirm.slug,
                logoUrl: mockFirm.logoUrl,
                primaryColor: mockFirm.primaryColor,
                physicalAddress: mockFirm.physicalAddress,
                linkedInUrl: mockFirm.linkedInUrl,
                googleReviewsUrl: mockFirm.googleReviewsUrl,
                bio: mockFirm.bio,
                backgroundColor: mockFirm.backgroundColor || "#0a0a0a",
                accentColor: mockFirm.accentColor || "#151515",
                fontColor: mockFirm.fontColor || "#ffffff",
                logoScale: mockFirm.logoScale || 100,
                borderRadius: mockFirm.borderRadius || "rounded",
                isColorLinked: mockFirm.isColorLinked || false,
                firmNameFontFamily: mockFirm.firmNameFontFamily || "Inter",
                firmNameFontWeight: mockFirm.firmNameFontWeight || "900",
                firmNameFontSize: mockFirm.firmNameFontSize || 72,
                bioFontFamily: mockFirm.bioFontFamily || "Inter",
                bioFontSize: mockFirm.bioFontSize || 18,
            },
        });
    }

    // 2. Create Users (Creating a default admin for each firm)
    for (const mockFirm of MOCK_FIRMS) {
        const email = `admin@${mockFirm.slug}.com`;
        await prisma.user.upsert({
            where: { email },
            update: {},
            create: {
                email,
                password: 'password123', // Demo password
                role: UserRole.FIRM_ADMIN,
                firmId: mockFirm.id,
            },
        });
    }

    // 3. Create Team Members
    for (const mockMember of MOCK_TEAM_MEMBERS) {
        await prisma.teamMember.upsert({
            where: { slug: mockMember.slug },
            update: {},
            create: {
                id: mockMember.id,
                name: mockMember.name,
                slug: mockMember.slug,
                role: mockMember.role,
                email: mockMember.email,
                imageURL: mockMember.imageURL,
                firmId: mockMember.firmIds[0], // Using the first firmId from mock
            },
        });
    }

    // 4. Create Deals
    for (const mockDeal of MOCK_DEALS) {
        await prisma.deal.upsert({
            where: { id: mockDeal.id },
            update: {},
            create: {
                id: mockDeal.id,
                address: mockDeal.address,
                assetType: mockDeal.assetType as AssetType,
                strategy: mockDeal.strategy as Strategy,
                purchaseAmount: mockDeal.purchaseAmount,
                financedAmount: mockDeal.financedAmount,
                stillImageURL: mockDeal.stillImageURL,
                isPublic: mockDeal.isPublic,
                capRate: mockDeal.capRate,
                sqFt: mockDeal.sqFt,
                firmId: mockDeal.firmId,
                teamMemberId: mockDeal.teamMemberIds[0], // Using the first team member
            },
        });
    }

    console.log('Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
