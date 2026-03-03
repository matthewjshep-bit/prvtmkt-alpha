console.log('[Prisma] lib/prisma.ts evaluation @ ' + new Date().toISOString());

import { PrismaClient } from '../prisma/generated-client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

// Force client reload after schema update - cmm77fh8m0003fujpwmlx789a-rev1

const prismaClientSingleton = () => {
    // We use DATABASE_URL (Transaction Mode / port 6543).
    const url = process.env.DATABASE_URL;
    // Belt and suspenders: Explicitly add sslmode=no-verify to the string 
    // to force the underlying driver to bypass cert validation.
    const connectionString = url?.includes('sslmode=')
        ? url.replace(/sslmode=[^&]+/, 'sslmode=no-verify')
        : `${url}${url?.includes('?') ? '&' : '?'}sslmode=no-verify`;

    console.log('[Prisma] Initializing new PrismaClient instance v6');
    const pool = new pg.Pool({
        connectionString,
        ssl: {
            rejectUnauthorized: false
        }
    });
    const adapter = new PrismaPg(pool);
    const client = new PrismaClient({ adapter });
    console.log('[Prisma] Models on new instance:', Object.keys(client).filter(k => !k.startsWith('_')).join(', '));
    return client;
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
    prisma_v7: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma_v7 ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma_v7 = prisma;
