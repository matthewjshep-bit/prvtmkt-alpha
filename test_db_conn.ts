import prisma from './lib/prisma';

async function test() {
    try {
        const members = await prisma.teamMember.findMany({
            select: { id: true, name: true, firmId: true, firmIds: true }
        });
        console.log('Current Members:', JSON.stringify(members, null, 2));

        const firms = await prisma.firm.findMany({
            select: { id: true, name: true, slug: true }
        });
        console.log('Current Firms:', JSON.stringify(firms, null, 2));
    } catch (error) {
        console.error('Test failed:', error);
    } finally {
        process.exit();
    }
}

test();
