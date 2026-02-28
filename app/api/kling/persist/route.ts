import { NextResponse } from "next/server";
import axios from "axios";
import { uploadToSupabase } from "@/lib/supabase-storage";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { videoUrl, dealId } = body;

        if (!videoUrl || !dealId) {
            return NextResponse.json({ error: "Missing videoUrl or dealId" }, { status: 400 });
        }

        console.log(`[Kling Persist] Starting for Deal ${dealId}...`);

        // 1. Download video from Kling's temporary URL
        const response = await axios.get(videoUrl, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data);

        // 2. Upload to Supabase
        const fileName = `deals/${dealId}/cinematic-${Date.now()}.mp4`;
        const supabaseUrl = await uploadToSupabase(buffer, fileName, "video/mp4");

        // 3. Persist to Database (Prisma)
        await prisma.deal.update({
            where: { id: dealId },
            data: { generatedVideoURL: supabaseUrl }
        });

        console.log(`[Kling Persist] Successful! DB Updated: ${supabaseUrl}`);
        return NextResponse.json({ url: supabaseUrl });
    } catch (error: any) {
        console.error("[Kling Persist] Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
