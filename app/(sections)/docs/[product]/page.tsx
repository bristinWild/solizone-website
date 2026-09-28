import { notFound, redirect } from "next/navigation";
import { getProduct, PRODUCTS } from "@/lib/docs";

export const generateStaticParams = () =>
    PRODUCTS.filter((p) => p.status === "live").map((p) => ({ product: p.slug }));

/** /docs/<product> starts at chapter one. */
export default async function ProductIndex({ params }: { params: Promise<{ product: string }> }) {
    const { product: slug } = await params;
    const product = getProduct(slug);
    if (!product || !product.chapters.length) notFound();
    redirect(`/docs/${product.slug}/${product.chapters[0].slug}`);
}