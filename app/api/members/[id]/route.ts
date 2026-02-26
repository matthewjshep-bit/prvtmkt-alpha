import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const member = await prisma.teamMember.findUnique({
            where: { id },
        });
        if (!member) {
            return NextResponse.json({ error: 'Member not found' }, { status: 404 });
        }
        return NextResponse.json(member);
    } catch (error: any) {
        console.error('[Member API] GET Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        const body = await req.json();
        const member = await prisma.teamMember.update({
            where: { id },
            data: {
                name: body.name,
                slug: body.slug,
                role: body.role,
                email: body.email,
                imageURL: body.imageURL,
                firmId: body.firmId,
            },
        });
        return NextResponse.json(member);
    } catch (error: any) {
        console.error('[Member API] PUT Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    try {
        await prisma.teamMember.delete({
            where: { id },
        });
        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('[Member API] DELETE Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
