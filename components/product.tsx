"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as const;

type Product = {
    name: string;
    role: string;
    status: "live" | "soon";
    summary: string;
    body: string;
    builtOn?: string;
};

const PRODUCTS: Product[] = [
    {
        name: "Solizone EVM",
        role: "Execution layer",
        status: "live",
        summary: "Run Solidity on a Logos zone.",
        body: "An EVM execution layer built as a Logos zone. Contracts execute on Solizone, and every block is published to Logos for ordering, data availability, and finality.",
    },
    {
        name: "Zoner",
        role: "Developer framework",
        status: "soon",
        summary: "Write, test, and deploy in one workflow.",
        body: "A framework for building Solidity on Solizone, in the spirit of Foundry and Hardhat. Compile contracts, run tests, and ship to a Logos zone from one toolchain.",
    },
    {
        name: "Solicamp",
        role: "Basecamp app",
        status: "soon",
        summary: "Deploy straight from Logos Basecamp.",
        body: "Write and deploy Solidity to Solizone directly inside Logos Basecamp, with no separate toolchain to set up.",
        builtOn: "Built on Solizone EVM and Zoner",
    },
];

const grid: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const card: Variants = {
    hidden: { opacity: 0, y: 48, scale: 0.92 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.6, ease: EASE_OUT },
    },
};

const heading: Variants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

const Status = ({ status }: { status: Product["status"] }) => (
    <span
        className={cn(
            "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium",
            status === "live"
                ? "border-success/40 text-success"
                : "border-border/20 text-foreground/60"
        )}
    >
        {status === "live" && (
            <span className="size-1.5 rounded-full bg-success" aria-hidden />
        )}
        {status === "live" ? "Prototype live" : "Coming soon"}
    </span>
);

export const Products = () => {
    const reduceMotion = useReducedMotion();
    const initial = reduceMotion ? false : "hidden";

    return (
        <section id="products" aria-labelledby="products-title" className="p-inset">
            <div className="relative overflow-hidden rounded-[42px] border border-border/10 bg-[hsl(240_3%_11%)] px-sides py-20 text-foreground md:rounded-[72px] md:py-32">
                <div className="mx-auto flex max-w-6xl flex-col gap-12 md:gap-16 md:px-8">
                    <motion.header
                        initial={initial}
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.6 }}
                        variants={heading}
                        className="flex max-w-4xl flex-col gap-4"
                    >
                        <h2
                            id="products-title"
                            className="font-serif text-5xl italic leading-none sm:text-7xl lg:text-8xl"
                        >
                            What we&apos;re building
                        </h2>
                        <p className="text-base font-medium leading-snug text-foreground/70 text-pretty sm:text-lg lg:text-xl">
                            Three pieces that take Solidity from your editor to Logos
                            finality.
                        </p>
                    </motion.header>

                    <motion.div
                        initial={initial}
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.25 }}
                        variants={grid}
                        className="grid gap-4 md:grid-cols-3 md:gap-6"
                    >
                        {PRODUCTS.map((p) => (
                            <motion.article
                                key={p.name}
                                variants={card}
                                className={cn(
                                    "flex flex-col gap-5 rounded-3xl border-2 p-6 shadow-button backdrop-blur-xl md:p-8",
                                    p.status === "live"
                                        ? "border-border/25 bg-primary/[0.07]"
                                        : "border-border/10 bg-primary/[0.03]"
                                )}
                            >
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <p className="text-sm text-foreground/60">{p.role}</p>
                                    <Status status={p.status} />
                                </div>

                                <h3 className="font-serif text-4xl italic leading-none md:text-5xl">
                                    {p.name}
                                </h3>

                                <p className="text-lg font-medium leading-snug text-pretty">
                                    {p.summary}
                                </p>

                                <p className="leading-relaxed text-foreground/70 text-pretty">
                                    {p.body}
                                </p>

                                {p.builtOn && (
                                    <p className="mt-auto border-t border-border/10 pt-5 text-sm text-foreground/60">
                                        {p.builtOn}
                                    </p>
                                )}
                            </motion.article>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};