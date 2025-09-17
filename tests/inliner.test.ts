import { describe, it, expect } from "vitest";
import { Inliner } from "../src/inliner";

describe("parseNumber", () => {
    it("simple", () => {
        expect(Inliner.create().text("3 > 7").toString()).toBe("3 &gt; 7");
    });
    it("raw", () => {
        expect(
            Inliner.create()
                .text("click on:")
                .space()
                .raw(`<a href="myapp.com">App Login Page</a>`)
                .toString()
        ).toBe(`click on:&nbsp;<a href="myapp.com">App Login Page</a>`);
    });
    it("custom elements", () => {
        expect(
            Inliner.create()
                .span("Hello")
                .space()
                .strong("John")
                .span(", Have a nice day")
                .toString()
        ).toBe(
            "<span>Hello</span>&nbsp;<strong>John</strong><span>, Have a nice day</span>"
        );
    });
});
