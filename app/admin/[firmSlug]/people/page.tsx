"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function PeopleRedirect() {
    const router = useRouter();
    const params = useParams();
    const firmSlug = params.firmSlug;

    useEffect(() => {
        router.replace(`/admin/${firmSlug}/people/gallery-editor`);
    }, [firmSlug, router]);

    return null;
}
