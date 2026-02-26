import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const bucketName = process.env.SUPABASE_BUCKET || "deal-media";

if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error("[Signed URL API] Missing Supabase configuration");
}

const supabase = createClient(supabaseUrl || "", supabaseServiceRoleKey || "");

export async function POST(req: Request) {
    try {
        const { fileName, contentType, id, type = "firms" } = await req.json();

        if (!fileName || !id) {
            return NextResponse.json({ error: "Missing fileName or target ID" }, { status: 400 });
        }

        // Sanitize filename: replace spaces with dashes, remove special characters (except dots/dashes), lowercase
        const sanitizedName = fileName
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^a-z0-9.-]/g, '');

        const path = `${type}/${id}/${Date.now()}-${sanitizedName}`;

        console.log(`[Signed URL API] Generating signed URL for: ${path} (Type: ${contentType})`);

        // Generate signed URL (valid for 60 minutes)
        const { data, error } = await supabase.storage
            .from(bucketName)
            .createSignedUploadUrl(path);

        if (error) {
            console.error("[Signed URL API] Error generating signed URL:", error);
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        // Get public URL for after upload
        const { data: { publicUrl } } = supabase.storage
            .from(bucketName)
            .getPublicUrl(path);

        return NextResponse.json({
            signedUrl: data.signedUrl,
            path: path,
            publicUrl: publicUrl
        });
    } catch (error: any) {
        console.error("[Signed URL API] Error during processing:", error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
