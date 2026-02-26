import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
    // Rely on the DATABASE_URL environment variable from .env/Vercel
    // Ensure it includes pgbouncer=true in the connection string for Transaction Mode.
    return new PrismaClient();
};

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined;
};

const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
