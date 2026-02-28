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
        if (body.userId !== undefined) {
            const targetUserId = body.userId;
            console.log(`[Member API] Identity Sync Triggered: Member=${id}, User=${targetUserId}`);

            // 1. Identity Check
            if (targetUserId) {
                console.log(`[Member API] Checking for existing links...`);
                const existingOwner = await prisma.teamMember.findFirst({
                    where: { userId: targetUserId }
                });

                // 2. Conflict Resolver
                if (existingOwner && existingOwner.id !== id) {
                    console.log(`[Member API] Resolving Conflict: Detaching user from Member=${existingOwner.id}`);
                    await prisma.teamMember.update({
                        where: { id: existingOwner.id },
                        data: { userId: null }
                    });
                    console.log(`[Member API] Conflict resolved.`);
                } else {
                    console.log(`[Member API] No identity conflict found.`);
                }
            }

            // 3. Finalize Link
            console.log(`[Member API] Finalizing link to Member=${id}...`);
            const member = await prisma.teamMember.update({
                where: { id },
                data: { ...updateData, userId: targetUserId || null },
            });
            console.log(`[Member API] Link successful.`);

            return NextResponse.json(member);
        }

        console.log(`[Member API] Standard Update (no identity change) Member=${id}`);
        const member = await prisma.teamMember.update({
            where: { id },
            data: updateData,
        });
        console.log(`[Member API] Update successful.`);
        return NextResponse.json(member);
    } catch (error: any) {
        console.error('[Member API] Profile Association Failure:', {
            id,
            error: error.message,
            code: error.code
        });

        if (error.code === 'P2002') {
            return NextResponse.json({
                error: `This identity is already active on another profile record.`
            }, { status: 400 });
        }

        return NextResponse.json({
            error: `Link Error: ${error.message}`
        }, { status: 500 });
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
