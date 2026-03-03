import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const body = await req.json();
        const updateData: any = {};
        const fields = ['title', 'description', 'status', 'priority', 'dueDate', 'assigneeId'];

        fields.forEach(field => {
            if (body[field] !== undefined) {
                if (field === 'dueDate' && body[field]) {
                    updateData[field] = new Date(body[field]);
                } else {
                    updateData[field] = body[field];
                }
            }
        });

        const task = await prisma.task.update({
            where: { id },
            data: updateData,
        });
        return NextResponse.json(task);
    } catch (error: any) {
        console.error('[Task ID API] PUT Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await prisma.task.delete({ where: { id } });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('[Task ID API] DELETE Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
