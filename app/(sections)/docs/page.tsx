import { redirect } from "next/navigation";
import { DEFAULT_PRODUCT } from "@/lib/docs";

/** /docs opens the first live product's talk. */
export default function DocsIndex() {
    redirect(`/docs/${DEFAULT_PRODUCT.slug}`);
}