import { describe, it, expect } from "vitest";
import { nullish, alter, toArray, cloneDeep } from "../src/common";

describe("nullish", () => {
    it("returns value if not nullish", () => {
        expect(nullish(5, 10)).toBe(5);
        expect(nullish("a", "b")).toBe("a");
    });
    it("returns alt if value is null or undefined", () => {
        expect(nullish(null, 10)).toBe(10);
        expect(nullish(undefined, "b")).toBe("b");
    });
});

describe("alter", () => {
    it("returns value if truthy", () => {
        expect(alter(5, 10)).toBe(5);
        expect(alter("a", "b")).toBe("a");
    });
    it("returns alt if value is falsy", () => {
        expect(alter(0, 10)).toBe(10);
        expect(alter("", "b")).toBe("b");
        expect(alter(false, true)).toBe(true);
    });
});

describe("toArray", () => {
    it("returns array if input is array", () => {
        expect(toArray([1, 2, 3])).toEqual([1, 2, 3]);
    });
    it("returns empty array if input is not array", () => {
        expect(toArray("abc")).toEqual([]);
        expect(toArray(null)).toEqual([]);
        expect(toArray(undefined)).toEqual([]);
    });
});

describe("cloneDeep", () => {
    it("clones primitives", () => {
        expect(cloneDeep(5)).toBe(5);
        expect(cloneDeep("a")).toBe("a");
        expect(cloneDeep(null)).toBe(null);
    });
    it("clones arrays", () => {
        const arr = [1, { a: 2 }];
        const cloned = cloneDeep(arr);
        expect(cloned).toEqual(arr);
        expect(cloned).not.toBe(arr);
        expect(cloned[1]).not.toBe(arr[1]);
    });
    it("clones objects", () => {
        const obj = { a: 1, b: { c: 2 } };
        const cloned = cloneDeep(obj);
        expect(cloned).toEqual(obj);
        expect(cloned).not.toBe(obj);
        expect(cloned.b).not.toBe(obj.b);
    });
    it("clones Date", () => {
        const date = new Date();
        const cloned = cloneDeep(date);
        expect(cloned).toEqual(date);
        expect(cloned).not.toBe(date);
    });
    it("clones Map", () => {
        const map = new Map([[1, "a"]]);
        const cloned = cloneDeep(map);
        expect(cloned).not.toBe(map);
        expect(Array.from(cloned.entries())).toEqual(Array.from(map.entries()));
    });
    it("clones Set", () => {
        const set = new Set([1, 2]);
        const cloned = cloneDeep(set);
        expect(cloned).not.toBe(set);
        expect(Array.from(cloned.values())).toEqual(Array.from(set.values()));
    });
});
