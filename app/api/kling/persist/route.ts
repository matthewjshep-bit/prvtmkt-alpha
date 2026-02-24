import { NextResponse } from "next/server";
import axios from "axios";
import { uploadToSupabase } from "@/lib/supabase-storage";

export async function POST(req: Request) {
    try {
        const { videoUrl, dealId } = await req.json();

        if (!videoUrl || !dealId) {
            return NextResponse.json({ error: "Missing videoUrl or dealId" }, { status: 400 });
        }

        // 1. Download video from Kling's temporary URL
        const response = await axios.get(videoUrl, { responseType: 'arraybuffer' });
        const buffer = Buffer.from(response.data);

        // 2. Upload to Supabase
        const fileName = `deals/${dealId}/cinematic-${Date.now()}.mp4`;
        const supabaseUrl = await uploadToSupabase(buffer, fileName, "video/mp4");

        // Note: We don't update the DB here because the app currently relies on client-side state.
        // We return the Supabase URL to the client so it can update its own state.
        return NextResponse.json({ url: supabaseUrl });
    } catch (error: any) {
        console.error("Kling Persistence Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
