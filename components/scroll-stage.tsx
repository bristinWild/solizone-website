"use client";

import { useRef, type ReactNode } from "react";
import {
    motion,
    useReducedMotion,
    useScroll,
    useTransform,
} from "framer-motion";

/**
 * Keeps the hero pinned while the next section slides up over it.
 * As the next section rises, the hero recedes (scales down and dims),
 * so the two read as stacked panels rather than separate pages.
 */
export const ScrollStage = ({
    hero,
    children,
}: {
    hero: ReactNode;
    children: ReactNode;
}) => {
    const nextRef = useRef<HTMLDivElement>(null);
    const reduceMotion = useReducedMotion();

    // 0 when the next section's top touches the viewport bottom,
    // 1 when it reaches the viewport top.
    const { scrollYProgress } = useScroll({
        target: nextRef,
        offset: ["start end", "start start"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);

    return (
        <>
            <div className="sticky top-0 h-[100dvh] w-full p-inset">
                <motion.div
                    style={reduceMotion ? undefined : { scale, opacity }}
                    className="relative h-full w-full will-change-transform"
                >
                    {hero}
                </motion.div>
            </div>

            <div ref={nextRef} className="relative z-10 bg-background">
                {children}
            </div>
        </>
    );
};