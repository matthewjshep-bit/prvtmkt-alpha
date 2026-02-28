import prisma from '../lib/prisma';

async function main() {
    const users = await prisma.user.findMany();
    console.log('--- SYSTEM USER REGISTRY (DB) ---');
    users.forEach((u: any) => console.log(`[USER] ${u.email} - Role: ${u.role} - FirmID: ${u.firmId}`));
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
