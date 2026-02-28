import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
    try {
        const { token, newPassword } = await req.json();

        if (!token || !newPassword) {
            return NextResponse.json({ error: 'Token and new password are required' }, { status: 400 });
        }

        const user = await prisma.user.findFirst({
            where: {
                resetToken: token,
                resetTokenExpires: {
                    gt: new Date()
                }
            }
        });

        if (!user) {
            return NextResponse.json({ error: 'Invalid or expired recovery token' }, { status: 400 });
        }

        // In production, password hashing should occur here!
        // But the current signup/login uses plain text (as seen in context).
        await prisma.user.update({
            where: { id: user.id },
            data: {
                password: newPassword,
                resetToken: null,
                resetTokenExpires: null
            }
        });

        return NextResponse.json({ message: 'Password updated successfully' });

    } catch (error: any) {
        console.error('[Reset Password API] Error:', error);
        return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
    }
}
