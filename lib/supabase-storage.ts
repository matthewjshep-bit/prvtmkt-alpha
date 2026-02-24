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
    const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, fileBuffer, {
            contentType,
            upsert: true,
        });

    if (error) {
        console.error('Supabase Upload Error:', error);
        throw error;
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

    return publicUrlData.publicUrl;
}
