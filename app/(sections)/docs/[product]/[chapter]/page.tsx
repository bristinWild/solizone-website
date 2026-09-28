import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";
import { getProduct, PRODUCTS, readChapter } from "@/lib/docs";
import { DocMarkdown } from "@/components/docs/markdown";

type Params = Promise<{ product: string; chapter: string }>;

const pad = (n: number) => String(n).padStart(2, "0");

export const dynamicParams = false;

export const generateStaticParams = () =>
    PRODUCTS.filter((p) => p.status === "live").flatMap((p) =>
        p.chapters.map((c) => ({ product: p.slug, chapter: c.slug }))
    );

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
    const { product: p, chapter: c } = await params;
    const product = getProduct(p);
    const chapter = product?.chapters.find((x) => x.slug === c);
    if (!product || !chapter) return {};
    return { title: `${chapter.title} · ${product.name} docs`, description: chapter.summary };
}

export default async function ChapterPage({ params }: { params: Params }) {
    const { product: p, chapter: c } = await params;
    const product = getProduct(p);
    const index = product?.chapters.findIndex((x) => x.slug === c) ?? -1;
    if (!product || index < 0) notFound();

    const chapter = product.chapters[index];
    const prev = product.chapters[index - 1];
    const next = product.chapters[index + 1];
    const total = product.chapters.length;

    return (
        <article className="max-w-3xl pb-16">
            <header className="mb-14 flex flex-col gap-5">
                <p className="flex items-center gap-3 font-[family-name:var(--font-geist-mono)] text-xs uppercase tracking-[0.16em] text-foreground/45">
                    <span>{product.name}</span>
                    <span aria-hidden className="h-px w-6 bg-foreground/25" />
                    <span>
                        Chapter {pad(index + 1)} / {pad(total)}
                    </span>
                </p>
                <h1 className="font-serif text-6xl italic leading-[0.95] text-foreground sm:text-7xl">
                    {chapter.title}
                </h1>
                <p className="max-w-2xl text-lg font-medium leading-relaxed text-foreground/65 text-pretty md:text-xl">
                    {chapter.summary}
                </p>
                {/* reading progress through the talk */}
                <div className="mt-2 flex gap-1" aria-hidden>
                    {product.chapters.map((x, i) => (
                        <span
                            key={x.slug}
                            className={`h-1 flex-1 rounded-full ${i <= index ? "bg-foreground/70" : "bg-white/10"}`}
                        />
                    ))}
                </div>
            </header>

            <div>
                <DocMarkdown source={readChapter(product.slug, chapter.slug)} />
            </div>

            <nav aria-label="Chapter navigation" className="mt-24 grid gap-4 border-t border-white/10 pt-10 sm:grid-cols-2">
                {prev ? (
                    <Link
                        href={`/docs/${product.slug}/${prev.slug}`}
                        className="group flex flex-col gap-2 rounded-2xl border border-white/10 p-5 transition-colors hover:border-white/25 hover:bg-white/[0.04]"
                    >
                        <span className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-foreground/45">
                            <ArrowLeftIcon className="size-3.5 transition-transform group-hover:-translate-x-1" />
                            Previous
                        </span>
                        <span className="font-serif text-2xl italic">
                            {pad(index)} · {prev.title}
                        </span>
                    </Link>
                ) : (
                    <span className="hidden sm:block" />
                )}
                {next ? (
                    <Link
                        href={`/docs/${product.slug}/${next.slug}`}
                        className="group flex flex-col gap-2 rounded-2xl border border-white/15 bg-white/[0.04] p-5 text-right transition-colors hover:border-white/30 hover:bg-white/[0.07]"
                    >
                        <span className="flex items-center justify-end gap-2 text-xs font-medium uppercase tracking-[0.14em] text-foreground/45">
                            Up next
                            <ArrowRightIcon className="size-3.5 transition-transform group-hover:translate-x-1" />
                        </span>
                        <span className="font-serif text-2xl italic">
                            {pad(index + 2)} · {next.title}
                        </span>
                        <span className="text-sm text-foreground/55 text-pretty">{next.summary}</span>
                    </Link>
                ) : (
                    <Link
                        href="/"
                        className="group flex flex-col gap-2 rounded-2xl border border-white/15 bg-white/[0.04] p-5 text-right transition-colors hover:border-white/30"
                    >
                        <span className="text-xs font-medium uppercase tracking-[0.14em] text-foreground/45">
                            End of the talk
                        </span>
                        <span className="font-serif text-2xl italic">Back to Solizone →</span>
                    </Link>
                )}
            </nav>
        </article>
    );
}