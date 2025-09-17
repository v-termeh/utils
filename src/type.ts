/**
 * @typedef {string | number | boolean | null} PrimitiveType
 * Represents a basic, non-object data type.
 */
export type PrimitiveType = string | number | boolean | null;

/**
 * @typedef {PrimitiveType | PrimitiveType[] | Record<string, PrimitiveType>} CompoundType
 * Represents a complex data type composed of primitives, arrays of primitives, or records of primitives.
 */
export type CompoundType =
    | PrimitiveType
    | PrimitiveType[]
    | Record<string, PrimitiveType>;

/**
 * Checks if a value is of type string.
 * @param v The value to check.
 * @returns True if the value is a string, false otherwise.
 */
export function isString(v: unknown): v is string {
    return typeof v === "string";
}

/**
 * Checks if a value is of type boolean.
 * @param v The value to check.
 * @returns True if the value is a boolean, false otherwise.
 */
export function isBoolean(v: unknown): v is boolean {
    return typeof v === "boolean";
}

/**
 * Checks if a value is of type number.
 * @param v The value to check.
 * @returns True if the value is a number, false otherwise.
 */
export function isNumber(v: unknown): v is number {
    return typeof v === "number";
}

/**
 * Checks if a value is a valid numeric value (can be converted to a finite number).
 * @param v The value to check.
 * @returns True if the value is a number or a numeric string, and is finite, false otherwise.
 */
export function isNumeric(v: unknown): v is number | string {
    if (!["number", "string"].includes(typeof v)) return false;
    return !isNaN(Number(v)) && isFinite(Number(v));
}

/**
 * Converts a numeric value to a number.
 * @param v The value to convert.
 * @returns The converted number if the value is numeric, otherwise undefined.
 */
export function toNumber(v: unknown): number | undefined {
    if (isNumeric(v)) {
        return Number(v);
    }

    return undefined;
}

/**
 * Checks if a value is an array.
 * @template T The type of elements in the array.
 * @param v The value to check.
 * @returns True if the value is an array, false otherwise.
 */
export function isArray<T>(v: unknown): v is T[] {
    return Array.isArray(v);
}

/**
 * Checks if a value is an object (and not null or an array).
 * @template T The expected type of the object.
 * @param v The value to check.
 * @returns True if the value is an object, false otherwise.
 */
export function isObject<T extends object>(v: unknown): v is T {
    return (
        v !== null &&
        v !== undefined &&
        typeof v === "object" &&
        !Array.isArray(v)
    );
}

/**
 * Checks if a value is of a primitive type (string, number, boolean, or null).
 * @param v The value to check.
 * @returns True if the value is a primitive, false otherwise.
 */
export function isPrimitive(v: unknown): v is PrimitiveType {
    return v === null || isString(v) || isNumber(v) || isBoolean(v);
}

/**
 * Checks if a value is an array containing only primitive types.
 * @param v The value to check.
 * @returns True if the value is an array and all its elements are primitives, false otherwise.
 */
export function isPrimitiveArray(v: unknown): v is PrimitiveType[] {
    return Array.isArray(v) && v.every(isPrimitive);
}

/**
 * Checks if a value is a record (object) containing only primitive types.
 * @param v The value to check.
 * @returns True if the value is an object and all its property values are primitives, false otherwise.
 */
export function isPrimitiveRecord(
    v: unknown
): v is Record<string, PrimitiveType> {
    return isObject(v) && Object.values(v).every(isPrimitive);
}

/**
 * Checks if a value is of a compound type (primitive, array of primitives, or record of primitives).
 * @param v The value to check.
 * @returns True if the value is a CompoundType, false otherwise.
 */
export function isCompoundType(v: unknown): v is CompoundType {
    return isPrimitive(v) || isPrimitiveArray(v) || isPrimitiveRecord(v);
}
