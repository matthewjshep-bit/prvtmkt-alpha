import { NextResponse } from "next/server";
import axios from "axios";
import * as jose from "jose";

const KLING_API_BASE = "https://api.klingai.com/v1";

async function generateKlingToken() {
    const accessKey = process.env.KLING_ACCESS_KEY;
    const secretKey = process.env.KLING_SECRET_KEY;

    if (!accessKey || !secretKey) {
        throw new Error("Kling credentials missing");
    }

    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 1800; // 30 minutes

    const token = await new jose.SignJWT({
        iss: accessKey,
        exp,
        iat,
    })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .sign(new TextEncoder().encode(secretKey));

    return token;
}

export async function POST(req: Request) {
    try {
        const { imageUrl, dealId } = await req.json();

        if (!imageUrl || !dealId) {
            return NextResponse.json({ error: "Missing imageUrl or dealId" }, { status: 400 });
        }

        const token = await generateKlingToken();

        const systemPrompt = "A cinematic FPV drone shot that initiates from a frame-perfect recreation of the uploaded image, meticulously preserving all architectural details, material textures, and the existing color palette. The camera begins on a steady, wide-angle establishing shot, then smoothly pulls back, ascends slightly, and pans slowly to reveal the surrounding environment and broader footprint of the structure. The motion is fluid and professional, maintaining the high-fidelity lighting and atmospheric depth of the original photo. Every structural element from the initial frame remains consistent and geometrically accurate as the perspective expands into a larger, coherent scene. Hyper-realistic textures, 8k resolution, stable drone flight, seamless spatial expansion.";

        const negativePrompt = "morphing, flickering, architectural distortion, extra windows, blurred textures, unrealistic gravity.";

        const response = await axios.post(`${KLING_API_BASE}/videos/image2video`, {
            model_name: "kling-v1",
            image: imageUrl,
            prompt: systemPrompt,
            negative_prompt: negativePrompt,
            duration: 5,
            mode: "high_quality",
            callback_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/kling/webhook?dealId=${dealId}`
        }, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error("Kling AI Start Error:", error.response?.data || error.message);
        return NextResponse.json({
            error: error.response?.data?.error || error.message
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
        const response = await axios.get(`${KLING_API_BASE}/videos/tasks/${taskId}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error("Kling AI Poll Error:", error.response?.data || error.message);
        return NextResponse.json({
            error: error.response?.data?.error || error.message
        }, { status: error.response?.status || 500 });
    }
}
