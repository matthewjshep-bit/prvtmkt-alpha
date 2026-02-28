import prisma from '../lib/prisma';

async function main() {
    try {
        console.log('--- Verifying Prisma Client Metadata ---');
        // We are testing if the generated client now correctly recognizes 'userId' on 'teamMember'
        const testUserId = "cmm5hg0wz0001k5ov3d53rsci"; // From user's previous screenshot

        console.log(`Checking membership for userId: ${testUserId}...`);
        const member = await prisma.teamMember.findFirst({
            where: { userId: testUserId }
        });

        if (member) {
            console.log(`✅ SUCCESS: Found member "${member.name}" for userId "${testUserId}"`);
        } else {
            console.log(`✅ SUCCESS: No member found for userId "${testUserId}", but query executed without error.`);
        }

    } catch (err: any) {
        console.error('❌ FAILED: Prisma still rejects the query.');
        console.error('Error Message:', err.message);
    } finally {
        process.exit(0);
    }
}

main();
