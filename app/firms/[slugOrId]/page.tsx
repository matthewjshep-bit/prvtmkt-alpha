"use client";

import { use } from "react";
import { useData } from "@/context/DataContext";
import { notFound } from "next/navigation";
import InternalDashboardView from "@/components/InternalDashboardView";

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
        <InternalDashboardView
            firm={firm}
            deals={deals}
            teamMembers={teamMembers}
            isInitialized={isInitialized}
        />
    );
}
