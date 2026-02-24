import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const bucketName = process.env.SUPABASE_BUCKET || 'deal-media';

if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.error('Missing Supabase configuration');
}

export const supabase = createClient(supabaseUrl || '', supabaseServiceRoleKey || '');

export async function uploadToSupabase(
    fileBuffer: Buffer,
    fileName: string,
    contentType: string
): Promise<string> {
    if (!supabaseUrl || !supabaseServiceRoleKey) {
        throw new Error("Supabase environment variables (NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY) are not configured.");
    }

    const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, fileBuffer, {
            contentType,
            upsert: true,
        });

    if (uploadError) {
        console.error(`[Supabase Storage] Error uploading to bucket "${bucketName}":`, uploadError);
        // Specifically catch the "Bucket not found" case to provide an even clearer message
        if (uploadError.message === 'Bucket not found' || (uploadError as any).status === 404) {
            throw new Error(`Bucket "${bucketName}" not found. Please ensure it exists and is public in Supabase.`);
        }
        throw new Error(uploadError.message || `Upload failed for bucket "${bucketName}"`);
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
}
