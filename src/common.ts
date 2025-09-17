/**
 * Returns the value if it is not null or undefined, otherwise returns the alternative.
 * @param v - The value to check.
 * @param alt - The alternative value to return if v is nullish.
 * @returns The value or the alternative.
 */
export function nullish<T>(v: T | null | undefined, alt: T): T {
    return v ?? alt;
}

/**
 * Returns the value if it is truthy, otherwise returns the alternative.
 * @param v - The value to check.
 * @param alt - The alternative value to return if v is falsy.
 * @returns The value or the alternative.
 */
export function alter<T>(v: T, alt: T): T {
    return v || alt;
}

/**
 * Converts the input to an array if it is an array, otherwise returns an empty array.
 * @param v - The value to convert.
 * @returns The array or an empty array.
 */
export function toArray<T>(v: unknown): T[] {
    return Array.isArray(v) ? (v as T[]) : [];
}

/**
 * Deeply clones an object, array, Date, Map, or Set.
 * @param obj - The object to clone.
 * @returns A deep clone of the object.
 */
export function deepClone<T>(obj: T): T {
    if (obj === null || typeof obj !== "object") return obj;

    if (obj instanceof Date) return new Date(obj.getTime()) as any;
    if (obj instanceof Map) return new Map(Array.from(obj.entries())) as any;
    if (obj instanceof Set) return new Set(Array.from(obj.values())) as any;
    if (Array.isArray(obj)) return obj.map(deepClone) as any;

    const cloned: any = {};
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            cloned[key] = deepClone((obj as any)[key]);
        }
    }
    return cloned;
}
