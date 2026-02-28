import prisma from '../lib/prisma';

async function main() {
    try {
        const columns: any = await prisma.$queryRaw`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'TeamMember' 
      AND table_schema = 'public'
    `;
        console.log('--- TeamMember Columns in DB ---');
        console.log(JSON.stringify(columns, null, 2));

        const sample = await prisma.teamMember.findFirst();
        console.log('\n--- Prisma Client Sample Object Keys ---');
        if (sample) {
            console.log(Object.keys(sample));
        } else {
            console.log('No members found in table.');
        }
    } catch (err) {
        console.error('Error during inspection:', err);
    } finally {
        process.exit(0);
    }
}

main();
