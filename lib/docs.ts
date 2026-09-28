import fs from "node:fs";
import path from "node:path";
import { createSlugger } from "./slug";

/**
 * Docs registry. Each product is a "talk" made of ordered chapters.
 * A chapter's content lives in content/docs/<product>/<chapter>.md,
 * written with `##` for topics (these become sidebar links) and `###` for sub-points.
 *
 * To add Zoner later: create content/docs/zoner/*.md, list the chapters below,
 * and flip its status to "live".
 */

export type Chapter = { slug: string; title: string; summary: string };

export type Product = {
    slug: string;
    name: string;
    tagline: string;
    status: "live" | "soon";
    chapters: Chapter[];
};

export const PRODUCTS: Product[] = [
    {
        slug: "solizone-evm",
        name: "Solizone EVM",
        tagline: "An EVM execution environment built for the Logos ecosystem.",
        status: "live",
        chapters: [
            { slug: "introduction", title: "Introduction", summary: "What Solizone EVM is, why it exists, and the one picture to keep in mind." },
            { slug: "execution", title: "Execution", summary: "How transactions run: REVM, persistent state, receipts and state roots." },
            { slug: "blocks", title: "Blocks and the chain", summary: "How executed transactions become a parent-linked chain of Solizone blocks." },
            { slug: "state-persistence", title: "State persistence", summary: "Checkpoints and snapshots: how EVM state survives a restart." },
            { slug: "hybrid-storage", title: "Logos Storage and hybrid history", summary: "Keeping recent blocks local, archiving old history to Logos Storage, and verifying what comes back." },
            { slug: "node-runtime", title: "The node runtime", summary: "The long-running node: its loop, what survives a stop, and how it recovers." },
            { slug: "publication", title: "Publishing to Logos", summary: "How canonical blocks reach the Logos blockchain, and why publication is not storage." },
            { slug: "architecture", title: "Architecture and trade-offs", summary: "Why the layers are split this way, what it does and does not buy, and how it compares." },
            { slug: "design-principles", title: "Design principles", summary: "The boundaries that keep execution independent of infrastructure." },
            { slug: "status", title: "Where it stands today", summary: "What works now, what does not yet, and how it got here." },
            { slug: "next-phase", title: "The next phase", summary: "Opening Solizone EVM to Ethereum tooling, and the hardening that comes after." },
            { slug: "get-started", title: "Get started", summary: "Run Solizone EVM locally." },
            { slug: "wrap-up", title: "Wrap-up", summary: "The whole talk in one sentence, one analogy and one diagram." },
        ],
    },
    {
        slug: "zoner",
        name: "Zoner",
        tagline: "Developer framework for Solidity on Solizone.",
        status: "soon",
        chapters: [],
    },
    {
        slug: "solicamp",
        name: "Solicamp",
        tagline: "Deploy Solidity straight from Logos Basecamp.",
        status: "soon",
        chapters: [],
    },
];

export const DEFAULT_PRODUCT = PRODUCTS[0];

export type Topic = { id: string; title: string };
export type ChapterNav = Chapter & { topics: Topic[] };

export const getProduct = (slug: string) =>
    PRODUCTS.find((p) => p.slug === slug && p.status === "live");

export const chapterFile = (product: string, chapter: string) =>
    path.join(process.cwd(), "content", "docs", product, `${chapter}.md`);

export const readChapter = (product: string, chapter: string) =>
    fs.readFileSync(chapterFile(product, chapter), "utf8");

/**
 * Pull `##` headings out of a chapter for the sidebar.
 * Slugs every heading in order with the same slugger the page renderer uses,
 * so the sidebar links always match the ids on the page.
 */
export const extractTopics = (markdown: string): Topic[] => {
    const slug = createSlugger();
    const topics: Topic[] = [];
    let inFence = false;
    for (const line of markdown.split("\n")) {
        if (line.trimStart().startsWith("```")) {
            inFence = !inFence;
            continue;
        }
        if (inFence) continue;
        const match = /^(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
        if (!match) continue;
        const text = match[2].replace(/[*_`]/g, "");
        const id = slug(text);
        if (match[1].length === 2) topics.push({ id, title: text });
    }
    return topics;
};

/** Sidebar data for a product: every chapter with its topics. */
export const getProductNav = (product: Product): ChapterNav[] =>
    product.chapters.map((c) => ({
        ...c,
        topics: extractTopics(readChapter(product.slug, c.slug)),
    }));