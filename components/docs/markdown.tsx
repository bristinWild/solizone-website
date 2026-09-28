import Markdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { isValidElement, type ReactElement, type ReactNode } from "react";
import { CodeBlock } from "./code-block";
import { createSlugger } from "@/lib/slug";

const textOf = (node: ReactNode): string => {
    if (typeof node === "string" || typeof node === "number") return String(node);
    if (Array.isArray(node)) return node.map(textOf).join("");
    if (isValidElement(node)) return textOf((node as ReactElement<{ children?: ReactNode }>).props.children);
    return "";
};

const makeComponents = (slug: (text: string) => string): Components => ({
    h1: ({ children }) => {
        slug(textOf(children));
        return <h2 className="font-serif text-4xl italic">{children}</h2>;
    },
    h2: ({ children }) => {
        const id = slug(textOf(children));
        return (
            <h2
                id={id}
                className="group mt-20 scroll-mt-32 border-t border-white/10 pt-12 font-serif text-4xl italic leading-tight text-foreground first:mt-0 first:border-t-0 first:pt-0 md:text-5xl"
            >
                <a href={`#${id}`} className="no-underline">
                    {children}
                    <span
                        aria-hidden
                        className="ml-3 align-middle font-sans text-xl not-italic text-foreground/0 transition-colors group-hover:text-foreground/30"
                    >
                        #
                    </span>
                </a>
            </h2>
        );
    },
    h3: ({ children }) => (
        <h3 id={slug(textOf(children))} className="mt-10 scroll-mt-32 text-xl font-semibold tracking-tight text-foreground md:text-2xl">
            {children}
        </h3>
    ),
    p: ({ children }) => (
        <p className="my-5 text-[17px] leading-[1.75] text-foreground/75 text-pretty">{children}</p>
    ),
    strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
    a: ({ href, children }) => (
        <a href={href} className="font-medium text-foreground underline decoration-white/30 underline-offset-4 hover:decoration-white">
            {children}
        </a>
    ),
    ul: ({ children }) => (
        <ul className="my-5 flex flex-col gap-2 text-[17px] leading-relaxed text-foreground/75">{children}</ul>
    ),
    ol: ({ children }) => (
        <ol className="my-5 flex list-decimal flex-col gap-2 pl-6 text-[17px] leading-relaxed text-foreground/75 marker:text-foreground/40">
            {children}
        </ol>
    ),
    // Bullets for unordered lists; ordered lists keep their numbers (the dot is hidden inside <ol>).
    li: ({ children }) => (
        <li className="relative pl-5 [ol>&]:pl-1 before:absolute before:left-0 before:top-[0.7em] before:size-1.5 before:rounded-full before:bg-foreground/35 [ol>&]:before:hidden">
            {children}
        </li>
    ),
    blockquote: ({ children }) => (
        <blockquote className="my-8 rounded-2xl border border-white/10 border-l-foreground/60 border-l-2 bg-white/[0.04] px-6 py-1 [&_p]:text-lg [&_p]:text-foreground/90 [&_p]:font-medium">
            {children}
        </blockquote>
    ),
    hr: () => null,
    pre: ({ children }) => {
        const child = Array.isArray(children) ? children[0] : children;
        const props = isValidElement(child)
            ? (child as ReactElement<{ className?: string; children?: ReactNode }>).props
            : { className: undefined, children };
        const lang = /language-(\w+)/.exec(props.className ?? "")?.[1];
        return <CodeBlock lang={lang} code={textOf(props.children).replace(/\n$/, "")} />;
    },
    code: ({ children }) => (
        <code className="rounded-md border border-white/10 bg-white/[0.06] px-1.5 py-0.5 font-[family-name:var(--font-geist-mono)] text-[0.85em] text-foreground">
            {children}
        </code>
    ),
    table: ({ children }) => (
        <div className="my-6 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full text-left text-sm">{children}</table>
        </div>
    ),
    th: ({ children }) => <th className="border-b border-white/10 px-4 py-3 font-semibold">{children}</th>,
    td: ({ children }) => <td className="border-b border-white/5 px-4 py-3 text-foreground/75">{children}</td>,
});

export const DocMarkdown = ({ source }: { source: string }) => (
    <Markdown remarkPlugins={[remarkGfm]} components={makeComponents(createSlugger())}>
        {source}
    </Markdown>
);