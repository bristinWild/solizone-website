import type { ReactNode } from "react";

/**
 * Basic wrapper for a section page: big title, optional intro, then content.
 * Each page can drop this and use its own design instead.
 */
export const SectionShell = ({
    title,
    intro,
    children,
}: {
    title: string;
    intro?: string;
    children: ReactNode;
}) => (
    <section className="mx-auto flex max-w-3xl flex-col gap-8 md:gap-12">
        <header className="flex flex-col gap-3">
            <h1 className="font-serif text-6xl italic leading-none sm:text-8xl">{title}</h1>
            {intro && (
                <p className="text-base font-medium text-foreground/70 text-pretty sm:text-lg">{intro}</p>
            )}
        </header>
        {children}
    </section>
);