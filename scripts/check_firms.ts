import prisma from '../lib/prisma';

async function main() {
    const firms = await prisma.firm.findMany();
    console.log('--- FIRM TOMBSTONE SETTINGS (DB) ---');
    firms.forEach((f: any) => {
        console.log(`[FIRM] ${f.name} (${f.id})`);
        console.log(`  Tombstone Layout: ${JSON.stringify((f as any).tombstoneLayout)}`);
        console.log(`  Padding: ${(f as any).tombstonePadding}`);
        console.log(`  Max Width: ${(f as any).tombstoneMaxWidth}`);
        console.log(`  Colors: ${(f as any).tombstoneInfoBgColor}, ${(f as any).tombstoneMetricsBgColor}, ${(f as any).tombstoneMediaBgColor}, ${(f as any).tombstoneNarrativeBgColor}`);
    });
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
