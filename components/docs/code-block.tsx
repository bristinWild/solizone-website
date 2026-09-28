"use client";

import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { cn } from "@/lib/utils";

const LABELS: Record<string, string> = {
    text: "Diagram",
    bash: "Terminal",
    sh: "Terminal",
    shell: "Terminal",
};

/**
 * Fenced code in the docs. ```text blocks are the ASCII diagrams from the talk,
 * shown as quiet "Diagram" panels; ```bash blocks get a Terminal label and a copy button.
 */
export const CodeBlock = ({ lang, code }: { lang?: string; code: string }) => {
    const [copied, setCopied] = useState(false);
    const isDiagram = !lang || lang === "text";
    const isCommand = lang ? ["bash", "sh", "shell"].includes(lang) : false;
    const label = LABELS[lang ?? "text"] ?? lang;

    const copy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        } catch {
            /* clipboard can be blocked; nothing else to do */
        }
    };

    return (
        <figure
            className={cn(
                "not-prose group my-6 overflow-hidden rounded-2xl border",
                isDiagram ? "border-white/10 bg-white/[0.03]" : "border-white/15 bg-black/40"
            )}
        >
            <figcaption className="flex items-center justify-between border-b border-white/10 px-4 py-2 text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/45">
                <span className="flex items-center gap-2">
                    <span
                        aria-hidden
                        className={cn("size-1.5 rounded-full", isCommand ? "bg-success/80" : "bg-foreground/30")}
                    />
                    {label}
                </span>
                {isCommand && (
                    <button
                        type="button"
                        onClick={copy}
                        className="flex items-center gap-1.5 rounded-full px-2 py-1 normal-case tracking-normal text-foreground/60 transition-colors hover:bg-white/10 hover:text-foreground"
                        aria-label="Copy command"
                    >
                        {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
                        {copied ? "Copied" : "Copy"}
                    </button>
                )}
            </figcaption>
            <pre
                className={cn(
                    "overflow-x-auto px-5 py-4 font-[family-name:var(--font-geist-mono)] text-[13px] leading-6",
                    isDiagram ? "text-foreground/80" : "text-foreground"
                )}
            >
                <code>
                    {isCommand && <span className="select-none text-foreground/35">$ </span>}
                    {code}
                </code>
            </pre>
        </figure>
    );
};