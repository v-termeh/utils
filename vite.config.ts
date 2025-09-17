import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import pkg from "./package.json";

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
            formats: ["es", "cjs"],
        },
        rollupOptions: {
            external: [...Object.keys(pkg.peerDependencies || {})],
        },
    },
    plugins: [
        dts({
            insertTypesEntry: true,
            copyDtsFiles: true,
        }),
    ],
});
