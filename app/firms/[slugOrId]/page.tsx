"use client";

import { use } from "react";
import { useData } from "@/context/DataContext";
import { notFound } from "next/navigation";
import PublicPortalView from "@/components/PublicPortalView";

export default function FirmProfilePage({
    params,
}: {
    params: Promise<{ slugOrId: string }>;
}) {
    const { firms, deals, teamMembers, isInitialized } = useData();
    const { slugOrId } = use(params);

    const firm = firms.find((f) => f.id === slugOrId || f.slug === slugOrId);

    if (isInitialized && !firm) {
        notFound();
    }

    if (!firm) return null;

    return (
        <PublicPortalView
            firm={firm}
            deals={deals}
            teamMembers={teamMembers}
            isInitialized={isInitialized}
        />
    );
}
