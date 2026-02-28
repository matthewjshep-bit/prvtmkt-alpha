import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { resend } from '@/lib/resend';
import crypto from 'crypto';

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const user = await prisma.user.findUnique({
            where: { email: email.toLowerCase() }
        });

        // For security reasons, don't reveal if user exists OR not.
        // But for this app, we'll return a generic "if exists" msg.
        if (!user) {
            return NextResponse.json({ message: 'If an account exists, a recovery link has been sent.' });
        }

        // Generate a random token
        const token = crypto.randomBytes(32).toString('hex');
        const expires = new Date(Date.now() + 3600000); // 1 hour from now

        await prisma.user.update({
            where: { id: user.id },
            data: {
                resetToken: token,
                resetTokenExpires: expires
            }
        });

        // Use the HOST header or environment variable for the link
        const host = req.headers.get('origin') || 'http://localhost:3000';
        const resetLink = `${host}/auth/reset-password?token=${token}`;

        // Send Email via Resend
        await resend.emails.send({
            from: 'PRVT MKT <noreply@resend.dev>',
            to: [email],
            subject: 'Account Recovery: Reset Your Password on PRVT MKT',
            html: `
                <div style="font-family: 'Inter', sans-serif; background-color: #000000; color: #ffffff; padding: 60px 40px; border-radius: 0px; border: 1px solid #333; text-align: center; max-width: 600px; margin: 0 auto;">
                    <div style="letter-spacing: 4px; font-weight: 900; font-size: 20px; margin-bottom: 40px; border: 1px solid #fff; display: inline-block; padding: 8px 16px;">PRVT MKT</div>
                    <h1 style="color: #ffffff; font-size: 28px; font-weight: 900; text-transform: uppercase; margin-bottom: 24px; letter-spacing: 4px;">Reset Your Password</h1>
                    <p style="font-size: 16px; line-height: 1.8; color: #888; margin-bottom: 40px; text-align: center; font-weight: 400;">
                        We received a request to reset the password for your <strong style="color: #fff;">PRVT MKT</strong> account. Click the button below to secure your identity.
                    </p>

                    <div style="margin: 40px 0;">
                        <a href="${resetLink}" style="display: inline-block; background-color: #ffffff; color: #000000; padding: 20px 40px; border-radius: 4px; font-weight: 900; text-decoration: none; text-transform: uppercase; letter-spacing: 3px; font-size: 13px; transition: all 0.3s ease;">Reset Password</a>
                    </div>
                    <p style="margin-top: 60px; font-size: 10px; color: #444; letter-spacing: 2px; text-transform: uppercase; font-weight: 700;">
                        Link expires in 1 hour • PRVTMKT Technology
                    </p>
                </div>
            `
        });


        return NextResponse.json({ message: 'If an account exists, a recovery link has been sent.' });

    } catch (error: any) {
        console.error('[Forgot Password API] Error:', error);
        return NextResponse.json({ error: 'An unexpected error occurred.' }, { status: 500 });
    }
}
