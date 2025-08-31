import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

/// <reference types="vitest" />
// Configure Vitest (https://vitest.dev/config/)
// https://vitejs.dev/config/
export default defineConfig({
    build: {
        sourcemap: true,
        lib: {
            name: "utils",
            entry: resolve(__dirname, "src", "index.ts"),
            fileName: (format) => `utils.${format}.js`,
            formats: ["es", "cjs", "umd"],
        },
        rollupOptions: {
            external: [],
            output: {
                globals: {},
            },
        },
    },
    plugins: [dts({ insertTypesEntry: true })],
});
