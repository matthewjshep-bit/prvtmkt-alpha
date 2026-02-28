import { Resend } from 'resend';

const resendToken = process.env.RESEND_API_KEY;

if (!resendToken) {
    console.warn('RESEND_API_KEY is not set in environment variables');
}

export const resend = new Resend(resendToken);
