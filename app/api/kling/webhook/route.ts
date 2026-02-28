import { NextResponse } from "next/server";
import axios from "axios";
import { uploadToSupabase } from "@/lib/supabase-storage";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const dealIdFromQuery = searchParams.get("dealId");
        const body = await req.json();

        console.log("[Kling AI] Persistence Interaction Received:", { dealIdFromQuery, taskId: body.data?.task_id || body.taskId });

        // Detection: Is this a webhook or a direct persistence call?
        const isDirectPersist = !!body.videoUrl;
        const dealId = dealIdFromQuery || body.dealId;

        if (!dealId) {
            return NextResponse.json({ error: "Missing dealId" }, { status: 400 });
        }

        let isSuccess = false;
        let videoUrl = "";

        if (isDirectPersist) {
            isSuccess = true;
            videoUrl = body.videoUrl;
        } else {
            const rawStatus = (body.data?.task_status || body.task_status);
            const taskStatus = rawStatus?.toLowerCase();
            isSuccess = taskStatus === "succeed" || taskStatus === "succeeded";

            // Official Path from Docs: data.task_result.videos[0].url
            videoUrl = body.data?.task_result?.videos?.[0]?.url ||
                body.data?.video_info?.videos?.[0]?.url ||
                body.data?.video_url ||
                body.video_url;

            console.log(`[Kling Webhook] Status: ${taskStatus} for Deal: ${dealId}. URL Found: ${!!videoUrl}`);
        }

        if (isSuccess && videoUrl) {
            console.log("[Kling AI] Downloading video from:", videoUrl);

            // 1. Download video from Kling
            const response = await axios.get(videoUrl, { responseType: 'arraybuffer' });
            const buffer = Buffer.from(response.data);

            // 2. Upload to Supabase (Permanent Storage)
            const fileName = `deals/${dealId}/cinematic-${Date.now()}.mp4`;
            const supabaseUrl = await uploadToSupabase(buffer, fileName, "video/mp4");

            // 3. Persist to Prisma Database
            await prisma.deal.update({
                where: { id: dealId },
                data: { generatedVideoURL: supabaseUrl }
            });

            console.log(`[Kling AI] Full Loop Complete. DB Updated for Deal ${dealId}: ${supabaseUrl}`);
            return NextResponse.json({ url: supabaseUrl, status: "ok" });
        }

        return NextResponse.json({
            status: "ignored",
            message: "Task not yet succeeded or missing URL",
            debug_status: body.data?.task_status || body.task_status
        });
    } catch (error: any) {
        console.error("[Kling AI] Persistence Process Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
