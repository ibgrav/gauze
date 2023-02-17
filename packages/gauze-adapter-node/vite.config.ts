import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts({ outputDir: "dist" })],
  build: {
    minify: false,
    emptyOutDir: false,
    reportCompressedSize: false,
    outDir: "dist",
    lib: {
      formats: ["es", "cjs"],
      fileName: "index",
      entry: "src/index.ts",
    },
  },
});
