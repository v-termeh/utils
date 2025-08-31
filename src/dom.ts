/**
 * Retrieves the content attribute of a meta tag by name.
 * @param name - The name attribute of the meta tag to search for.
 * @param fallback - The value to return if the meta tag is not found. Defaults to an empty string.
 * @returns The content of the meta tag, or the fallback value if not found.
 */
export function getMetaContent(name: string, fallback: string = ""): string {
    const metaEl = document.querySelector(`meta[name="${name}"]`);
    return metaEl?.getAttribute("content") ?? fallback;
}

/**
 * Copies the provided string data to the clipboard using the Clipboard API.
 * @param data - The string to copy to the clipboard.
 * @throws If the Clipboard API is not supported.
 * @returns A promise that resolves when the data is copied.
 */
export async function copyToClipboard(data: string): Promise<void> {
    if (!navigator?.clipboard?.writeText) {
        throw new Error("Clipboard API not supported");
    }
    await navigator.clipboard.writeText(data);
}
