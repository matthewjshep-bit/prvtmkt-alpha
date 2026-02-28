const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    try {
        const firms = await prisma.firm.findMany();
        console.log('--- FIRM TOMBSTONE SETTINGS (DB) ---');
        firms.forEach(f => {
            console.log(`[FIRM] ${f.name} (${f.id})`);
            console.log(`  Tombstone Layout: ${JSON.stringify(f.tombstoneLayout)}`);
            console.log(`  Padding: ${f.tombstonePadding}`);
            console.log(`  Max Width: ${f.tombstoneMaxWidth}`);
            console.log(`  Colors: ${f.tombstoneInfoBgColor}, ${f.tombstoneMetricsBgColor}, ${f.tombstoneMediaBgColor}, ${f.tombstoneNarrativeBgColor}`);
        });
    } catch (e) {
        console.error('Prisma query failed:', e.message);
    }
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
