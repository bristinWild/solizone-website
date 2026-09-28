import type { Metadata } from "next";
import { SectionShell } from "@/components/section-shell";
import { AboutContent } from "@/components/section-content";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
    return (
        <SectionShell title="About">
            <AboutContent />
        </SectionShell>
    );
}