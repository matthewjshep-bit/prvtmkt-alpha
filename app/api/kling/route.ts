import { NextResponse } from "next/server";
import axios from "axios";
import * as jose from "jose";

const KLING_API_BASE = "https://api.klingai.com/v1";

// Note: Official status endpoint for image2video is model-specific
// GET /v1/videos/image2video/{task_id}

async function generateKlingToken() {
    const accessKey = process.env.KLING_ACCESS_KEY;
    const secretKey = process.env.KLING_SECRET_KEY;

    if (!accessKey || !secretKey) {
        throw new Error("Kling credentials missing");
    }

    const iat = Math.floor(Date.now() / 1000) - 60; // 1 min in past for clock drift
    const exp = iat + 3600; // 60 minutes

    const token = await new jose.SignJWT({
        iss: accessKey,
    })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setIssuedAt(iat)
        .setNotBefore(iat)
        .setExpirationTime(exp)
        .sign(new TextEncoder().encode(secretKey));

    return token;
}

function getBaseUrl(req: Request) {
    // 1. Explicit Env Var (Best)
    if (process.env.NEXT_PUBLIC_BASE_URL) return process.env.NEXT_PUBLIC_BASE_URL;

    // 2. Vercel System Env Var
    if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;

    // 3. Request-based detection (Good for tunnels/ngrok)
    const url = new URL(req.url);
    return `${url.protocol}//${url.host}`;
}

export async function POST(req: Request) {
    try {
        const accessKey = process.env.KLING_ACCESS_KEY;
        const secretKey = process.env.KLING_SECRET_KEY;

        if (!accessKey || !secretKey) {
            console.error("Kling Handshake Blocked: Missing KLING_ACCESS_KEY or KLING_SECRET_KEY in environment.");
            return NextResponse.json({
                error: "Kling AI Credentials Missing. Please check your system environment variables."
            }, { status: 500 });
        }

        const { imageUrl, dealId } = await req.json();

        if (!imageUrl || !dealId) {
            return NextResponse.json({ error: "Missing imageUrl or dealId" }, { status: 400 });
        }

        const token = await generateKlingToken();
        console.log(`[Kling AI] Authorized. Token: ${token.substring(0, 8)}...`);

        const durationInSeconds = 5;
        const dronePrompt = `Cinematic ${durationInSeconds}s drone pull-back establishing shot. Start from detail in the image and expand to a professional aerial view. High resolution, high fidelity.`;

        // Extreme robustness: Providing both top-level and arguments-wrapped keys
        const payload = {
            model: "kling-v1",
            model_name: "kling-v1",
            prompt: dronePrompt,
            image: imageUrl,
            image_url: imageUrl,
            duration: `${durationInSeconds}`,
            mode: "pro",
            arguments: {
                prompt: dronePrompt,
                negative_prompt: "low quality, text, logos, face",
                image: imageUrl,
                duration: `${durationInSeconds}`,
                mode: "pro"
            },
            callback_url: `${getBaseUrl(req)}/api/kling/webhook?dealId=${dealId}`,
            replyUrl: `${getBaseUrl(req)}/api/kling/webhook?dealId=${dealId}`
        };

        console.log("[Kling AI] Requesting Task:", JSON.stringify(payload, null, 2));

        const response = await axios.post(`${KLING_API_BASE}/videos/image2video`, payload, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        console.log("[Kling AI] Success Response:", JSON.stringify(response.data, null, 2));

        if (response.data.code !== 0 && response.data.code !== undefined) {
            throw new Error(response.data.message || response.data.msg || "Kling API Error");
        }

        return NextResponse.json(response.data);
    } catch (error: any) {
        const errorData = error.response?.data;
        console.error("Kling AI Start Error:", JSON.stringify(errorData || error.message, null, 2));
        return NextResponse.json({
            error: errorData?.message || errorData?.msg || errorData?.error || error.message
        }, { status: error.response?.status || 500 });
    }
}

// GET handler for polling
export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const taskId = searchParams.get("taskId");

    if (!taskId) {
        return NextResponse.json({ error: "Missing taskId" }, { status: 400 });
    }

    try {
        const token = await generateKlingToken();
        const url = `${KLING_API_BASE}/videos/image2video/${taskId}`;
        console.log(`[Kling AI] Polling URL: ${url}`);

        const response = await axios.get(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        console.log(`[Kling AI] Polling Response for Task ${taskId}:`, JSON.stringify(response.data, null, 2));
        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error("Kling AI Poll Error:", JSON.stringify(error.response?.data || error.message, null, 2));
        return NextResponse.json({
            error: error.response?.data?.error || error.message
        }, { status: error.response?.status || 500 });
    }
}
