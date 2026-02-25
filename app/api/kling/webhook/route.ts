import { NextResponse } from "next/server";
import axios from "axios";
import { uploadToSupabase } from "@/lib/supabase-storage";

export async function POST(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const dealId = searchParams.get("dealId");
        const body = await req.json();

        console.log("Kling Webhook Received:", { dealId, data: body });

        if (!dealId) {
            return NextResponse.json({ error: "Missing dealId in webhook" }, { status: 400 });
        }

        const taskStatus = body.data?.task_status?.toLowerCase() || body.task_status?.toLowerCase();
        const videoUrl = body.data?.video_url || body.video_url;

        if (taskStatus === "succeeded" && videoUrl) {
            console.log("Kling Webhook: Generation Success. Triggering Persistence Directly...");

            // 1. Download video from Kling
            const response = await axios.get(videoUrl, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(response.data);

            // 2. Upload to Supabase
            const fileName = `deals/${dealId}/cinematic-${Date.now()}.mp4`;
            const supabaseUrl = await uploadToSupabase(buffer, fileName, "video/mp4");

            console.log("Kling Webhook: Persistence Completed Directly:", supabaseUrl);
        } else {
            console.log("Kling Webhook: Task not yet succeeded or missing URL", { status: taskStatus });
        }

        return NextResponse.json({ status: "ok" });
    } catch (error: any) {
        console.error("Kling Webhook Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
