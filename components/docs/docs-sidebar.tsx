"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import { cn } from "@/lib/utils";

type Topic = { id: string; title: string };
type ChapterNav = { slug: string; title: string; topics: Topic[] };
type ProductLink = { slug: string; name: string; status: "live" | "soon" };

export type DocsSidebarProps = {
    productSlug: string;
    productName: string;
    products: ProductLink[];
    chapters: ChapterNav[];
};

const pad = (n: number) => String(n).padStart(2, "0");

/** Tracks which `##` topic is currently at the top of the reading area. */
const useActiveTopic = (ids: string[]) => {
    const [active, setActive] = useState<string | null>(ids[0] ?? null);

    useEffect(() => {
        if (!ids.length) return;
        const fromHash = decodeURIComponent(window.location.hash.slice(1));
        setActive(ids.includes(fromHash) ? fromHash : ids[0]);

        const visible = new Map<string, boolean>();
        const observer = new IntersectionObserver(
            (entries) => {
                for (const e of entries) visible.set(e.target.id, e.isIntersecting);
                const firstVisible = ids.find((id) => visible.get(id));
                if (firstVisible) {
                    setActive(firstVisible);
                    return;
                }
                // Between headings: the active topic is the last one scrolled past.
                const passed = ids.filter((id) => {
                    const el = document.getElementById(id);
                    return el && el.getBoundingClientRect().top < 140;
                });
                if (passed.length) setActive(passed[passed.length - 1]);
            },
            { rootMargin: "-110px 0px -65% 0px" }
        );

        ids.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
    }, [ids.join("|")]); // eslint-disable-line react-hooks/exhaustive-deps

    return active;
};

const SidebarContent = ({
    productSlug,
    productName,
    products,
    chapters,
    onNavigate,
}: DocsSidebarProps & { onNavigate?: () => void }) => {
    const pathname = usePathname();
    const currentSlug = pathname?.split("/")[3];
    const current = chapters.find((c) => c.slug === currentSlug);
    const activeTopic = useActiveTopic(current?.topics.map((t) => t.id) ?? []);

    return (
        <nav aria-label={`${productName} docs`} className="flex flex-col gap-8 text-sm">
            {/* Products: one talk per product. Only live ones are clickable. */}
            <div className="flex flex-col gap-1">
                <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/40">
                    Products
                </p>
                {products.map((p) => {
                    const isCurrent = p.slug === productSlug;
                    if (p.status === "soon") {
                        return (
                            <span
                                key={p.slug}
                                className="flex items-center justify-between rounded-xl px-3 py-2 text-foreground/35"
                                aria-disabled
                            >
                                {p.name}
                                <span className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider">
                                    Soon
                                </span>
                            </span>
                        );
                    }
                    return (
                        <Link
                            key={p.slug}
                            href={`/docs/${p.slug}`}
                            onClick={onNavigate}
                            className={cn(
                                "flex items-center justify-between rounded-xl px-3 py-2 font-medium transition-colors",
                                isCurrent ? "bg-white/[0.08] text-foreground" : "text-foreground/70 hover:bg-white/[0.05]"
                            )}
                        >
                            {p.name}
                            {isCurrent && <span aria-hidden className="size-1.5 rounded-full bg-success" />}
                        </Link>
                    );
                })}
            </div>

            {/* Chapters of the current talk; the open chapter lists its topics. */}
            <div className="flex flex-col">
                <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/40">
                    The talk
                </p>
                <ol className="flex flex-col gap-0.5">
                    {chapters.map((c, i) => {
                        const isOpen = c.slug === currentSlug;
                        return (
                            <li key={c.slug}>
                                <Link
                                    href={`/docs/${productSlug}/${c.slug}`}
                                    onClick={onNavigate}
                                    aria-current={isOpen ? "page" : undefined}
                                    className={cn(
                                        "group flex items-baseline gap-3 rounded-xl px-3 py-2 transition-colors",
                                        isOpen ? "text-foreground" : "text-foreground/60 hover:bg-white/[0.04] hover:text-foreground"
                                    )}
                                >
                                    <span
                                        className={cn(
                                            "font-[family-name:var(--font-geist-mono)] text-[11px] tabular-nums",
                                            isOpen ? "text-foreground/70" : "text-foreground/30"
                                        )}
                                    >
                                        {pad(i + 1)}
                                    </span>
                                    <span className={cn("leading-snug", isOpen && "font-semibold")}>{c.title}</span>
                                </Link>

                                {isOpen && c.topics.length > 0 && (
                                    <ul className="mb-3 ml-[1.35rem] mt-1 flex flex-col border-l border-white/10">
                                        {c.topics.map((t) => {
                                            const isActive = t.id === activeTopic;
                                            return (
                                                <li key={t.id}>
                                                    <a
                                                        href={`#${t.id}`}
                                                        onClick={onNavigate}
                                                        className={cn(
                                                            "-ml-px block border-l py-1.5 pl-4 pr-2 leading-snug transition-colors",
                                                            isActive
                                                                ? "border-foreground font-medium text-foreground"
                                                                : "border-transparent text-foreground/50 hover:text-foreground/85"
                                                        )}
                                                    >
                                                        {t.title}
                                                    </a>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                )}
                            </li>
                        );
                    })}
                </ol>
            </div>
        </nav>
    );
};

/** Desktop: sticky column on the left. */
export const DocsSidebar = (props: DocsSidebarProps) => (
    <aside className="sticky top-28 hidden h-[calc(100dvh-8rem)] w-72 shrink-0 overflow-y-auto overscroll-contain pb-10 pr-4 lg:block [scrollbar-width:thin]">
        <SidebarContent {...props} />
    </aside>
);

/** Mobile / tablet: a "Contents" button that opens the same list. */
export const DocsMobileNav = (props: DocsSidebarProps) => {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const currentSlug = pathname?.split("/")[3];
    const index = props.chapters.findIndex((c) => c.slug === currentSlug);
    const current = props.chapters[index];

    useEffect(() => setOpen(false), [pathname]);

    return (
        <div className="mb-8 lg:hidden">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                className="flex w-full items-center justify-between rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-left text-sm"
            >
                <span className="flex flex-col">
                    <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-foreground/40">
                        Contents
                    </span>
                    <span className="font-medium">
                        {current ? `${pad(index + 1)} · ${current.title}` : props.productName}
                    </span>
                </span>
                <ChevronDownIcon className={cn("size-5 transition-transform", open && "rotate-180")} />
            </button>
            {open && (
                <div className="mt-2 max-h-[65dvh] overflow-y-auto rounded-2xl border border-white/10 bg-[hsl(240_3%_10%)] p-3">
                    <SidebarContent {...props} onNavigate={() => setOpen(false)} />
                </div>
            )}
        </div>
    );
};