import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';

// Force client reload after schema update - cmm3y0p97000008mf

const prismaClientSingleton = () => {
    // We use DATABASE_URL (Transaction Mode / port 6543).
    const url = process.env.DATABASE_URL;
    // Belt and suspenders: Explicitly add sslmode=no-verify to the string 
    // to force the underlying driver to bypass cert validation.
    const connectionString = url?.includes('sslmode=')
        ? url.replace(/sslmode=[^&]+/, 'sslmode=no-verify')
        : `${url}${url?.includes('?') ? '&' : '?'}sslmode=no-verify`;

    const pool = new pg.Pool({
        connectionString,
        ssl: {
            rejectUnauthorized: false
        }
    });
    const adapter = new PrismaPg(pool);
    return new PrismaClient({ adapter });
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
