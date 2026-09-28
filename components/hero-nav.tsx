"use client";

import { InfoCircledIcon, ReaderIcon, RocketIcon } from "@radix-ui/react-icons";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ComponentType } from "react";
import { buttonVariants } from "./ui/button";
import { cn } from "@/lib/utils";

export const SECTIONS: {
    href: string;
    label: string;
    Icon: ComponentType<{ className?: string }>;
}[] = [
        { href: "/docs", label: "Docs", Icon: ReaderIcon },
        { href: "/about", label: "About", Icon: InfoCircledIcon },
        { href: "/roadmap", label: "Roadmap", Icon: RocketIcon },
    ];

const SPRING = { type: "spring" as const, stiffness: 320, damping: 22, mass: 0.7 };

/**
 * How each tab moves while one is hovered. Positive shift = out toward the page (left),
 * negative = tucked back toward the edge (right).
 * The hovered tab slides out and grows; every other tab tucks right and shrinks a little,
 * so the hovered one stands clear of the rest.
 */
const HOVERED = { shift: 22, scale: 1.3, rotate: -10, opacity: 1 };
const OTHERS = { shift: -10, scale: 0.88, rotate: 0, opacity: 0.7 };

const useIsDesktop = () => {
    const [isDesktop, setIsDesktop] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 768px)");
        const update = () => setIsDesktop(mq.matches);
        update();
        mq.addEventListener("change", update);
        return () => mq.removeEventListener("change", update);
    }, []);
    return isDesktop;
};

/**
 * Icon tabs on the right edge of the hero. Each one links to its own route.
 * On desktop they sit in a column; hovering bends the column toward the page.
 * On small screens they sit in a row in the top-right corner and move down instead.
 */
export const HeroNav = () => {
    const pathname = usePathname();
    const reduceMotion = useReducedMotion();
    const isDesktop = useIsDesktop();
    const [hovered, setHovered] = useState<number | null>(null);

    const activeIndex = SECTIONS.findIndex((s) => pathname?.startsWith(s.href));

    const motionFor = (i: number) => {
        if (reduceMotion) return { x: 0, y: 0, scale: 1, opacity: 1 };
        let shift = 0;
        let scale = 1;
        let opacity = 1;
        if (hovered !== null) {
            const step = i === hovered ? HOVERED : OTHERS;
            shift = step.shift;
            scale = step.scale;
            opacity = step.opacity;
        } else if (i === activeIndex) {
            // Current page sits slightly out of line so you can see where you are.
            shift = 8;
        }
        // Desktop column moves left (toward the content); mobile row moves down.
        return isDesktop
            ? { x: -shift, y: 0, scale, opacity }
            : { x: 0, y: shift * 0.4, scale: 1 + (scale - 1) * 0.6, opacity };
    };

    return (
        <nav
            aria-label="Site sections"
            onMouseLeave={() => setHovered(null)}
            className="absolute z-20 flex gap-3 top-[calc(var(--inset)+0.8rem)] right-[calc(var(--inset)+0.8rem)] md:flex-col md:gap-5 md:top-1/2 md:-translate-y-1/2 md:right-[calc(var(--inset)+1.5rem)]"
        >
            {SECTIONS.map(({ href, label, Icon }, i) => {
                const isActive = i === activeIndex;
                const isHovered = i === hovered;
                const iconRotate = reduceMotion || !isHovered ? 0 : HOVERED.rotate;

                return (
                    <motion.div
                        key={href}
                        initial={false}
                        animate={motionFor(i)}
                        transition={SPRING}
                        className={cn("relative", isHovered ? "z-20" : "z-10")}
                    >
                        <Link
                            href={href}
                            aria-label={label}
                            aria-current={isActive ? "page" : undefined}
                            onMouseEnter={() => setHovered(i)}
                            onFocus={() => setHovered(i)}
                            onBlur={() => setHovered(null)}
                            className={cn(
                                buttonVariants({ variant: isActive ? "iconButton" : "default", size: "icon-xl" }),
                                "group relative"
                            )}
                        >
                            <motion.span
                                initial={false}
                                animate={{ rotate: iconRotate }}
                                transition={SPRING}
                                className="inline-flex"
                            >
                                <Icon className="size-5 md:size-6" />
                            </motion.span>
                            <span
                                aria-hidden
                                className={cn(
                                    "pointer-events-none absolute hidden whitespace-nowrap rounded-full border border-border/30 bg-primary/20 px-3 py-1 text-xs font-medium text-foreground backdrop-blur-sm transition-all duration-200 md:block md:right-full md:mr-3",
                                    isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-2"
                                )}
                            >
                                {label}
                            </span>
                        </Link>
                    </motion.div>
                );
            })}
        </nav>
    );
};