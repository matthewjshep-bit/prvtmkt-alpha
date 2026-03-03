import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
    try {
        const tasks = await prisma.task.findMany({
            orderBy: {
                createdAt: 'desc',
            },
        });
        return NextResponse.json(tasks);
    } catch (error: any) {
        console.error('[Tasks API] GET Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();

        if (!body.title || !body.firmId) {
            return NextResponse.json({ error: "title and firmId are required" }, { status: 400 });
        }

        const task = await prisma.task.create({
            data: {
                title: body.title,
                description: body.description,
                status: body.status || "INBOX",
                priority: body.priority || "NORMAL",
                dueDate: body.dueDate ? new Date(body.dueDate) : null,
                firm: { connect: { id: body.firmId } },
                ...(body.assigneeId && { assignee: { connect: { id: body.assigneeId } } })
            }
        });

        return NextResponse.json(task);
    } catch (error: any) {
        console.error('[Tasks API] POST Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
