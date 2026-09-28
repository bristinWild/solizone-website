import { notFound } from "next/navigation";
import { getProduct, getProductNav, PRODUCTS } from "@/lib/docs";
import { DocsMobileNav, DocsSidebar, type DocsSidebarProps } from "@/components/docs/docs-sidebar";

/** Two-column docs frame: chapter/topic sidebar on the left, the chapter on the right. */
export default async function ProductDocsLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ product: string }>;
}) {
    const { product: slug } = await params;
    const product = getProduct(slug);
    if (!product) notFound();

    const nav: DocsSidebarProps = {
        productSlug: product.slug,
        productName: product.name,
        products: PRODUCTS.map(({ slug, name, status }) => ({ slug, name, status })),
        chapters: getProductNav(product).map(({ slug, title, topics }) => ({ slug, title, topics })),
    };

    return (
        <div className="mx-auto flex w-full max-w-7xl gap-12 xl:gap-20">
            <DocsSidebar {...nav} />
            <div className="min-w-0 flex-1">
                <DocsMobileNav {...nav} />
                {children}
            </div>
        </div>
    );
}