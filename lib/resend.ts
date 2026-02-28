import { Resend } from 'resend';

const resendToken = process.env.RESEND_API_KEY;

if (!resendToken && process.env.NODE_ENV === 'production') {
    console.warn('⚠️  RESEND_API_KEY is not set in environment variables. Email services will fail.');
}

// During the build phase, Vercel might evaluate this module. 
// We use a placeholder to avoid the "Missing API key" error from the Resend constructor.
export const resend = new Resend(resendToken || 're_placeholder_for_build');

