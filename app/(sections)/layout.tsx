import Link from "next/link";
import { Manrope } from "next/font/google";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { Footer } from "@/components/footer";
import { HeroNav } from "@/components/hero-nav";

/**
 * Paragraph / body font for the tab pages. Headings keep the italic serif
 * because they use the `font-serif` class. To try another font, swap
 * `Manrope` for any Google font here (e.g. DM_Sans, Inter_Tight, IBM_Plex_Sans).
 */
const bodyFont = Manrope({
    subsets: ["latin"],
    weight: ["400", "500", "600"],
    variable: "--font-body",
});

/**
 * Shared frame for /docs, /about and /roadmap. These are ordinary pages with
 * their own background (no hero video), so each one can get its own design.
 * The right-side tabs stay, so visitors can hop between sections.
 */
export default function SectionsLayout({ children }: { children: React.ReactNode }) {
    return (
        <div
            className={`${bodyFont.variable} ${bodyFont.className} min-h-[100dvh] w-full bg-[hsl(240_3%_8%)] text-foreground antialiased`}
        >
            <header className="sticky top-0 z-30 flex items-center bg-[hsl(240_3%_8%)]/80 backdrop-blur-md px-sides py-5 md:px-12 md:py-8">
                <Link href="/" className="group flex items-center gap-2">
                    <ArrowLeftIcon className="size-4 transition-transform duration-200 group-hover:-translate-x-1" />
                    <span className="font-serif text-2xl italic leading-none md:text-3xl">Solizone</span>
                </Link>
            </header>

            {/* Zero-width fixed rail on the right edge; the tabs position themselves inside it. */}
            <div className="fixed right-0 top-0 z-40 h-[100dvh] w-0">
                <HeroNav />
            </div>

            <main className="px-sides pb-32 pt-6 md:pl-12 md:pr-28 md:pt-10">{children}</main>

            <div className="relative h-24">
                <Footer />
            </div>
        </div>
    );
}