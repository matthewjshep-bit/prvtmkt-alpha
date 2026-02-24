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

        console.log(`[Upload API] Received file: ${file.name} (${file.type}, ${file.size} bytes) for dealId: ${dealId}`);

        // Sanitize filename: replace spaces with dashes, remove special characters (except dots/dashes), lowercase
        const sanitizedName = file.name
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9.-]/g, '');

        const buffer = Buffer.from(await file.arrayBuffer());
        const fileName = `deals/${dealId}/${Date.now()}-${sanitizedName}`;

        console.log(`[Upload API] Attempting Supabase upload: ${fileName}`);
        const url = await uploadToSupabase(buffer, fileName, file.type);
        console.log(`[Upload API] Supabase upload success! URL: ${url}`);

        return NextResponse.json({ url });
    } catch (error: any) {
        console.error("[Upload API] Error during processing:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
