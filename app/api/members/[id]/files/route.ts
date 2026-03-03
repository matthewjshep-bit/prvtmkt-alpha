import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

// GET: Fetch all files for a specific team member
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        if (!id) throw new Error('Member ID is required');

        console.log(`[API] Fetching files for member: ${id}. Available Prisma models:`, Object.keys(prisma).filter(k => !k.startsWith('_')).join(', '));

        // @ts-ignore
        const files = await prisma.assetFile.findMany({
            where: { teamMemberId: id },
            orderBy: { createdAt: 'desc' }
        });
        return NextResponse.json(files);
    } catch (error: any) {
        console.error('Error fetching member files:', error);
        const prismaKeys = Object.keys(prisma || {}).filter(k => !k.startsWith('_'));
        return NextResponse.json({
            error: 'Failed to fetch files',
            message: error.message,
            prismaKeys,
            stack: error.stack
        }, { status: 500 });
    }
}

// POST: Create/Upload a new file
export async function POST(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { name, content, type } = body;

        console.log(`[API] Creating file for member: ${id}, type: ${type}`);
        // @ts-ignore
        const newFile = await prisma.assetFile.create({
            data: {
                name,
                content: content || "",
                type: type || 'OTHER',
                teamMemberId: id
            }
        });

        return NextResponse.json(newFile);
    } catch (error: any) {
        console.error('Error creating member file:', error);
        return NextResponse.json({
            error: 'Failed to create file',
            message: error.message
        }, { status: 500 });
    }
}

// PUT: Update an existing file (usually specified by file ID in the body)
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const body = await request.json();
        const { fileId, content, name, type } = body;

        if (!fileId) {
            return NextResponse.json({ error: 'File ID is required' }, { status: 400 });
        }

        console.log(`[API] Updating file: ${fileId} for member: ${id}`);
        // @ts-ignore
        const updatedFile = await prisma.assetFile.update({
            where: { id: fileId },
            data: {
                content,
                name,
                type
            }
        });

        return NextResponse.json(updatedFile);
    } catch (error: any) {
        console.error('Error updating member file:', error);
        return NextResponse.json({
            error: 'Failed to update file',
            message: error.message
        }, { status: 500 });
    }
}

// DELETE: Remove a file
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        const { searchParams } = new URL(request.url);
        const fileId = searchParams.get('fileId');

        if (!fileId) {
            return NextResponse.json({ error: 'File ID is required' }, { status: 400 });
        }

        console.log(`[API] Deleting file: ${fileId} for member: ${id}`);
        // @ts-ignore
        await prisma.assetFile.delete({
            where: { id: fileId }
        });

        return NextResponse.json({ success: true });
    } catch (error: any) {
        console.error('Error deleting member file:', error);
        return NextResponse.json({
            error: 'Failed to delete file',
            message: error.message
        }, { status: 500 });
    }
}
