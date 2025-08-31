/**
 * Parses a value into a number, handling strings with commas and spaces.
 * @param v - The value to parse.
 * @returns The parsed number, or NaN if invalid.
 */
export function parseNumber(v: unknown): number {
    if (v == null) return NaN;
    const str = String(v).trim();
    if (!str) return NaN;

    const cleaned = str.replace(/[, ]+/g, "");

    const match = cleaned.match(/-?\d+(\.\d+)?/);
    if (!match) return NaN;

    return Number(match[0]);
}

/**
 * Extract all numeric digits (0-9) from the input.
 * @param v - The input value of any type
 * @returns A string containing only digits
 */
export function extractNumeric(v: unknown): string {
    if (v == null) return "";

    const str = String(v);

    // Match all digits
    const digits = str.match(/\d/g);

    // Join digits into a single string or return empty string
    return digits ? digits.join("") : "";
}

/**
 * Replaces all non-numeric characters in a string with the given separator.
 * @param v - The value to process.
 * @param separator - The separator to use.
 * @returns The string with unified separators.
 */
export function unifySeparator(v: unknown, separator: string): string {
    if (v == null) return "";
    const str = String(v);
    return str.replace(/[^0-9.-]+/g, separator);
}

/**
 * Formats a number with thousands separators, optionally customizing the separator.
 * @param v - The value to format.
 * @param separator - The separator to use (default is comma).
 * @returns The formatted number string, or empty string if invalid.
 */
export function formatNumber(v: unknown, separator = ","): string {
    const n = parseNumber(v);
    if (isNaN(n)) return "";

    let str = n.toLocaleString("en-US");

    if (separator !== ",") {
        str = str.replace(/,/g, separator);
    }

    return str;
}
