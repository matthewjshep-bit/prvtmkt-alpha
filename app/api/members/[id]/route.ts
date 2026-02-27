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

        // Build update object only with provided fields to avoid wiping data
        const updateData: any = {};
        if (body.name !== undefined) updateData.name = body.name;
        if (body.slug !== undefined) updateData.slug = body.slug;
        if (body.role !== undefined) updateData.role = body.role;
        if (body.email !== undefined) updateData.email = body.email || null;
        if (body.imageURL !== undefined) updateData.imageURL = body.imageURL;
        if (body.linkedInUrl !== undefined) updateData.linkedInUrl = body.linkedInUrl;
        if (body.phoneNumber !== undefined) updateData.phoneNumber = body.phoneNumber;
        if (body.bio !== undefined) updateData.bio = body.bio;
        if (body.heroMediaUrl !== undefined) updateData.heroMediaUrl = body.heroMediaUrl;
        if (body.firmIds !== undefined) updateData.firmIds = body.firmIds;
        if (body.firmId !== undefined) updateData.firmId = body.firmId;

        const member = await prisma.teamMember.update({
            where: { id },
            data: updateData,
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
