import prisma from '../lib/prisma';

async function main() {
    const count = await prisma.user.count();
    console.log('--- USER COUNT ---');
    console.log(count);
    const users = await prisma.user.findMany();
    users.forEach(u => console.log(`[USER] ${u.email} (${u.id})`));
}

main()
    .catch(e => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });
