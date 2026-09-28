import type { Metadata } from "next";
import { SectionShell } from "@/components/section-shell";
import { RoadmapContent } from "@/components/section-content";

export const metadata: Metadata = { title: "Roadmap" };

export default function RoadmapPage() {
    return (
        <SectionShell title="Roadmap">
            <RoadmapContent />
        </SectionShell>
    );
}