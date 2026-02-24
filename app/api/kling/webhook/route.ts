import { NextResponse } from "next/server";
import axios from "axios";

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
            console.log("Kling Webhook: Generation Success. Triggering Persistence...");

            // Call our internal persistence route to save to Supabase
            // Note: In a production app, we'd use a server-to-server call or shared utility
            const persistRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/kling/persist`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ videoUrl, dealId })
            });

            const persistData = await persistRes.json();
            console.log("Kling Webhook: Persistence Completed:", persistData.url);
        } else {
            console.log("Kling Webhook: Task not yet succeeded or missing URL", { status: taskStatus });
        }

        return NextResponse.json({ status: "ok" });
    } catch (error: any) {
        console.error("Kling Webhook Error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
