import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export const dynamic = 'force-dynamic';
import { randomUUID } from 'crypto';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get('token');

    if (!token) {
        return NextResponse.json({ error: 'Token is required' }, { status: 400 });
    }

    try {
        const invitation = await prisma.invitation.findUnique({
            where: { token },
            include: { firm: true }
        });

        if (!invitation) {
            return NextResponse.json({ error: 'Invitation not found' }, { status: 404 });
        }

        if (invitation.isUsed) {
            return NextResponse.json({ error: 'Invitation already used' }, { status: 400 });
        }

        if (new Date() > invitation.expiresAt) {
            return NextResponse.json({ error: 'Invitation expired' }, { status: 400 });
        }

        return NextResponse.json(invitation);
    } catch (error: any) {
        console.error('[Invitations API] GET Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { email, role, firmId } = body;

        if (!email || !role || !firmId) {
            return NextResponse.json({ error: 'Email, role, and firmId are required' }, { status: 400 });
        }

        const token = randomUUID();
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // 7 days expiration

        const invitation = await prisma.invitation.create({
            data: {
                email,
                token,
                role,
                firmId,
                expiresAt
            },
            include: { firm: true }
        });

        // Generate invitation URL using request origin
        const protocol = req.headers.get('x-forwarded-proto') || 'http';
        const host = req.headers.get('host');
        const origin = `${protocol}://${host}`;
        const inviteLink = `${origin}/auth/signup?token=${token}`;

        // Send actual email via Resend
        const resendInstance = new Resend(process.env.RESEND_API_KEY);
        if (process.env.RESEND_API_KEY) {
            try {
                await resendInstance.emails.send({
                    from: 'PRVT MKT <onboarding@resend.dev>',
                    to: email,
                    subject: `Invitation to join ${invitation.firm.name} on PRVT MKT`,
                    html: `
                        <div style="font-family: 'Inter', sans-serif; background-color: #000000; color: #ffffff; padding: 60px 40px; border-radius: 0px; border: 1px solid #333; text-align: center; max-width: 600px; margin: 0 auto;">
                            <div style="letter-spacing: 4px; font-weight: 900; font-size: 20px; margin-bottom: 40px; border: 1px solid #fff; display: inline-block; padding: 8px 16px;">PRVT MKT</div>
                            <h1 style="color: #ffffff; font-size: 28px; font-weight: 900; text-transform: uppercase; margin-bottom: 24px; letter-spacing: 4px;">Welcome to the Inner Circle</h1>
                            <p style="font-size: 16px; line-height: 1.8; color: #888; margin-bottom: 40px; text-align: center; font-weight: 400;">
                                You have been invited by <strong style="color: #fff;">${invitation.firm.name}</strong> to join their exclusive platform as a <strong style="color: #fff;">${role === 'FIRM_ADMIN' ? 'Firm Administrator' : 'Standard User'}</strong>.
                            </p>
                            <div style="margin: 40px 0;">
                                <a href="${inviteLink}" style="display: inline-block; background-color: #ffffff; color: #000000; padding: 20px 40px; border-radius: 4px; font-weight: 900; text-decoration: none; text-transform: uppercase; letter-spacing: 3px; font-size: 13px; transition: all 0.3s ease;">Accept Invitation</a>
                            </div>
                            <p style="margin-top: 60px; font-size: 10px; color: #444; letter-spacing: 2px; text-transform: uppercase; font-weight: 700;">
                                Link expires in 7 days • PRVT MKT Technology
                            </p>
                        </div>
                    `
                });
                console.log(`[INVITE SUCCESS] Email sent to ${email}`);
            } catch (err) {
                console.error('[INVITE EMAIL FAILED]', err);
            }
        }

        return NextResponse.json(invitation);
    } catch (error: any) {
        console.error('[Invitations API] POST Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const token = searchParams.get('token');
        const body = await req.json();

        if (!token) {
            return NextResponse.json({ error: 'Token is required' }, { status: 400 });
        }

        const invitation = await prisma.invitation.update({
            where: { token },
            data: {
                isUsed: body.isUsed ?? true
            }
        });

        return NextResponse.json(invitation);
    } catch (error: any) {
        console.error('[Invitations API] PUT Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
