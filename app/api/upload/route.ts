import { NextResponse } from "next/server";
import { uploadToSupabase } from "@/lib/supabase-storage";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;
        const dealId = formData.get("dealId") as string;

        if (!file || !dealId) {
            return NextResponse.json({ error: "Missing file or dealId" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = `deals/${dealId}/${Date.now()}-${file.name}`;

        const url = await uploadToSupabase(buffer, fileName, file.type);

        return NextResponse.json({ url });
    } catch (error: any) {
        console.error("Upload Route Error:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
