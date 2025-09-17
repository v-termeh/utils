/**
 * Inliner is a simple chainable builder for generating inline HTML.
 * Provides helper methods for common inline tags and safely escapes text content.
 */
export class Inliner {
    /**
     * Creates a new Inliner instance.
     */
    static create() {
        return new Inliner();
    }

    private pieces: string[] = [];

    /**
     * Appends raw HTML without escaping.
     * Use only with trusted content.
     */
    raw(content: string): Inliner {
        this.pieces.push(content);
        return this;
    }

    /** Appends a text content. */
    text(content: string): Inliner {
        this.pieces.push(escape(content));
        return this;
    }

    /** Appends a <strong> element (semantic strong emphasis). */
    strong(content: string): Inliner {
        this.pieces.push(`<strong>${escape(content)}</strong>`);
        return this;
    }

    /** Appends an <em> element (semantic emphasis). */
    em(content: string): Inliner {
        this.pieces.push(`<em>${escape(content)}</em>`);
        return this;
    }

    /** Appends a <u> element (stylistic underline). */
    u(content: string): Inliner {
        this.pieces.push(`<u>${escape(content)}</u>`);
        return this;
    }

    /** Appends an <ins> element (semantic insertion). */
    ins(content: string): Inliner {
        this.pieces.push(`<ins>${escape(content)}</ins>`);
        return this;
    }

    /** Appends an <s> element (stylistic strikethrough). */
    s(content: string): Inliner {
        this.pieces.push(`<s>${escape(content)}</s>`);
        return this;
    }

    /** Appends a <del> element (semantic deletion). */
    del(content: string): Inliner {
        this.pieces.push(`<del>${escape(content)}</del>`);
        return this;
    }

    /** Appends a <sub> element (subscript). */
    sub(content: string): Inliner {
        this.pieces.push(`<sub>${escape(content)}</sub>`);
        return this;
    }

    /** Appends a <sup> element (superscript). */
    sup(content: string): Inliner {
        this.pieces.push(`<sup>${escape(content)}</sup>`);
        return this;
    }

    /** Appends a <span> element. */
    span(content: string): Inliner {
        this.pieces.push(`<span>${escape(content)}</span>`);
        return this;
    }

    /** Appends a <small> element (side comments, fine print). */
    small(content: string): Inliner {
        this.pieces.push(`<small>${escape(content)}</small>`);
        return this;
    }

    /** Appends a non-breaking space (&nbsp;). */
    space(): Inliner {
        this.pieces.push("&nbsp;");
        return this;
    }

    /** Returns the generated HTML string. */
    render() {
        return this.pieces.join("");
    }

    /** Alias for render(). */
    toString() {
        return this.render();
    }
}

/**
 * Escapes special characters in text content for safe HTML output.
 */
function escape(s: string): string {
    return s.replace(/[&<>"'`=\/]/g, (ch) => {
        switch (ch) {
            case "&":
                return "&amp;";
            case "<":
                return "&lt;";
            case ">":
                return "&gt;";
            case '"':
                return "&quot;";
            case "'":
                return "&#39;";
            case "`":
                return "&#96;";
            case "=":
                return "&#61;";
            case "/":
                return "&#47;";
            default:
                return ch;
        }
    });
}
