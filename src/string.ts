/**
 * Concatenates items into a single string, filtering out nullish and empty values.
 * @param items - Items to concatenate.
 * @returns A space-separated string of non-empty items.
 */
export function concat(...items: unknown[]): string {
    return items
        .map((item) => {
            if (item == null || (typeof item === "number" && isNaN(item)))
                return "";
            const str = String(item).trim();
            return str.length > 0 ? str : "";
        })
        .filter(Boolean)
        .join(" ");
}

/**
 * Truncates a string to the specified length, appending ellipsis if needed.
 * @param v - The string to truncate.
 * @param length - The maximum length.
 * @returns The truncated string with ellipsis if longer than length.
 */
export function truncate(v: string, length: number): string {
    if (length <= 0) return "";
    return v.length <= length ? v : v.slice(0, length) + "...";
}

/**
 * Converts strings to a slug, joining with the specified joiner and normalizing characters.
 * Removes non-ASCII characters and repeated joiners.
 * @param joiner - The string to join items with.
 * @param items - The strings to slugify.
 * @returns The slugified string.
 */
export function slugify(joiner: string, ...items: string[]): string {
    return items
        .filter((item) => item != null && item.trim().length > 0)
        .map((item) => item.trim().toLowerCase())
        .join(joiner)
        .replace(/\s+/g, joiner)
        .replace(new RegExp(`[^a-z0-9${joiner}]+`, "g"), "")
        .replace(new RegExp(`${joiner}+`, "g"), joiner)
        .replace(new RegExp(`^${joiner}+|${joiner}+$`, "g"), "");
}

/**
 * Converts strings to a Unicode slug, joining with the specified joiner and normalizing spaces and joiners.
 * @param joiner - The string to join items with.
 * @param items - The strings to slugify.
 * @returns The slugified Unicode string.
 */
export function slugifyUnicode(joiner: string, ...items: string[]): string {
    return items
        .filter((item) => item != null && item.trim().length > 0)
        .map((item) => item.trim())
        .join(joiner)
        .replace(/\s+/g, joiner) // normalize spaces
        .replace(new RegExp(`${joiner}+`, "g"), joiner) // normalize repeated joiner
        .replace(new RegExp(`^${joiner}+|${joiner}+$`, "g"), ""); // trim leading/trailing joiner
}

/**
 * Maps a string value to a replacement value if present in the replacements object.
 * Returns the original value if no match, or the wildcard replacement if present.
 * @param v - The value to map.
 * @param replacements - An object mapping values to replacements.
 * @returns The mapped value or the original value.
 */
export function mapValue(
    v: string,
    replacements: Record<string, string>
): string {
    if (v in replacements) return replacements[v];
    if ("*" in replacements) return replacements["*"];
    return v;
}
