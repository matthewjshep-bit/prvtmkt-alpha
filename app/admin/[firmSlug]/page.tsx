"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function TenantAdminIndex() {
    const params = useParams();
    const router = useRouter();
    const firmSlug = params.firmSlug as string;

    // Primary landing redirect - when entering the admin panel via root, default to My Site
    useEffect(() => {
        router.push(`/admin/${firmSlug}/mysite`);
    }, [firmSlug, router]);

    return null;
}
