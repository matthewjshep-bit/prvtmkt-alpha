import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase-storage";

export async function GET() {
    const report: any = {
        config: {
            url: process.env.NEXT_PUBLIC_SUPABASE_URL ? "Present" : "Missing",
            key: process.env.SUPABASE_SERVICE_ROLE_KEY ? "Present" : "Missing",
            bucket: process.env.SUPABASE_BUCKET || "deal-media (default)",
        },
        connection: "Pending",
        errors: []
    };

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
        report.connection = "Failed";
        report.errors.push("Missing critical environment variables.");
        return NextResponse.json(report, { status: 500 });
    }

    try {
        // 1. Connectivity Check
        const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();

        if (bucketsError) {
            report.connection = "Failed";
            report.errors.push(`Connectivity error: ${bucketsError.message}`);
        } else {
            report.connection = "Success";
            report.availableBuckets = buckets.map(b => b.name);

            const target = process.env.SUPABASE_BUCKET || "deal-media";
            const bucket = buckets.find(b => b.name === target);

            report.targetBucket = target;
            report.targetBucketStatus = bucket ? "Found" : "Not Found";

            if (!bucket) {
                report.errors.push(`CRITICAL: Bucket '${target}' not found. Please create it in Supabase.`);
            } else {
                report.bucketConfig = {
                    public: bucket.public ? "Yes" : "No (Restricted)",
                    sizeLimit: bucket.file_size_limit,
                    allowedMimeTypes: bucket.allowed_mime_types
                };

                // 2. Permission Check (Try to list files)
                const { data: files, error: filesError } = await supabase.storage
                    .from(target)
                    .list('', { limit: 1 });

                if (filesError) {
                    report.permissionCheck = "Failed";
                    report.errors.push(`Permission error on bucket '${target}': ${filesError.message}`);
                } else {
                    report.permissionCheck = "Success";
                }
            }
        }
    } catch (err: any) {
        report.connection = "Error";
        report.errors.push(`Panic error: ${err.message}`);
    }

    return NextResponse.json(report);
}
