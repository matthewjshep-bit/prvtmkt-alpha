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
        // Try to list buckets to verify connectivity and key
        const { data, error } = await supabase.storage.listBuckets();

        if (error) {
            report.connection = "Failed";
            report.errors.push(error.message);
        } else {
            report.connection = "Success";
            report.buckets = data.map(b => b.name);

            const targetBucket = process.env.SUPABASE_BUCKET || "deal-media";
            const bucketExists = data.some(b => b.name === targetBucket);

            report.targetBucketStatus = bucketExists ? "Found" : "Not Found";
            if (!bucketExists) {
                report.errors.push(`Bucket '${targetBucket}' was not found in this Supabase project.`);
            }
        }
    } catch (err: any) {
        report.connection = "Error";
        report.errors.push(err.message);
    }

    return NextResponse.json(report);
}
