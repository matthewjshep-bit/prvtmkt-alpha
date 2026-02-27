import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const users = await prisma.user.findMany({
            orderBy: {
                email: 'asc',
            },
        });
        return NextResponse.json(users);
    } catch (error: any) {
        console.error('[Users API] GET Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Ensure firmId is present, default to a system firm if necessary or error out
        // For now, let's assume the frontend sends a valid firmId or we handle 'system' case
        let firmId = body.firmId;

        // If 'system' is passed, we might need a special firm or handle it differently
        // Prisma schema says firmId is required and must exist in Firm table
        if (firmId === 'system' || !firmId) {
            // Find the first firm or create a 'System' firm if one doesn't exist
            const firstFirm = await prisma.firm.findFirst();
            if (firstFirm) {
                firmId = firstFirm.id;
            } else {
                return NextResponse.json({ error: 'No firm available for user association' }, { status: 400 });
            }
        }

        const user = await prisma.user.create({
            data: {
                email: body.email,
                password: body.password || 'password123', // Default password if not provided
                role: body.role || 'USER',
                firmId: firmId,
            },
        });
        return NextResponse.json(user);
    } catch (error: any) {
        console.error('[Users API] POST Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
