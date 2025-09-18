import { deepClone } from "./common";

/**
 * Defines the strategy for merging values at a specific configuration path.
 * * - `"merge"`: Performs a deep merge of nested objects.
 * - `"replace"`: Replaces the existing value with the new value, regardless of type.
 * - `"safe"`: Ignores the new value if it is `undefined`, preserving the existing value.
 */
export type MergeStrategy = "merge" | "replace" | "safe";

/**
 * A map of dot-separated paths to their corresponding merge strategies.
 * For example, `{ "theme.colors.primary": "replace" }`.
 */
export type MergeOptions = Record<string, MergeStrategy>;

/**
 * A utility type to make all properties of an object and its nested objects optional.
 * This is useful for providing partial configurations.
 */
export type DeepPartial<T> = {
    [P in keyof T]?: T[P] extends object
        ? T[P] extends Function
            ? T[P]
            : DeepPartial<T[P]>
        : T[P];
};

/**
 * Deeply merges a new partial configuration into a base configuration object.
 * * This function is **immutable**, meaning it does not modify the original `config` object.
 * Instead, it returns a new, merged object.
 * * @template T The type of the configuration object.
 * @param config The base configuration object to be merged into. It is deep-cloned to ensure immutability.
 * @param newConfig The partial configuration object to apply.
 * @param options A map of paths and their specific merge strategies. Defaults to a "safe" strategy where `undefined` values are ignored, and nested objects are deep-merged unless specified otherwise. Arrays are always replaced.
 * @returns A new configuration object with the `newConfig` values merged in.
 */
export function mergeConfig<T extends Record<string, any>>(
    config: T,
    newConfig: DeepPartial<T>,
    options?: MergeOptions
): T {
    const strategies = options || {};

    /**
     * Internal recursive function to perform a deep merge.
     * This function mutates the `target` object directly.
     */
    function merge(target: any, source: any, path = ""): void {
        if (
            typeof source !== "object" ||
            source === null ||
            Array.isArray(source)
        ) {
            return;
        }

        for (const key of Object.keys(source)) {
            const currentPath = path ? `${path}.${key}` : key;
            const strategy = strategies[currentPath];
            const sourceValue = source[key];
            const targetValue = target[key];

            // Safe strategy: ignore undefined values
            if (strategy === "safe" && sourceValue === undefined) {
                continue;
            }

            // Default behavior for undefined values on non-object paths
            if (
                strategy === undefined &&
                typeof sourceValue !== "object" &&
                sourceValue === undefined
            ) {
                continue;
            }

            // Replace strategy or replacing arrays
            if (strategy === "replace" || Array.isArray(sourceValue)) {
                target[key] = deepClone(sourceValue);
                continue;
            }

            // Deep merge for nested objects
            if (
                typeof sourceValue === "object" &&
                sourceValue !== null &&
                typeof targetValue === "object" &&
                targetValue !== null
            ) {
                merge(targetValue, sourceValue, currentPath);
            } else {
                // Default: replace primitives or non-matching types
                target[key] = deepClone(sourceValue);
            }
        }
    }

    const result = deepClone(config);
    merge(result, newConfig);
    return result;
}
