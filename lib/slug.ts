/**
 * Tiny heading slugger (same rules as GitHub): lowercase, drop punctuation,
 * spaces become dashes, repeats get -1, -2... Used by both the sidebar and the
 * rendered headings, so their ids always match.
 */
export const createSlugger = () => {
    const seen = new Map<string, number>();
    return (text: string) => {
        const base = text
            .toLowerCase()
            .trim()
            .replace(/[^\p{L}\p{N}\s_-]/gu, "")
            .replace(/\s/g, "-");
        const count = seen.get(base) ?? 0;
        seen.set(base, count + 1);
        return count === 0 ? base : `${base}-${count}`;
    };
};