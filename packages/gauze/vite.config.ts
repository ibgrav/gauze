import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts({ outputDir: "dist", exclude: ["src/env.d.ts"] })],
  build: {
    emptyOutDir: false,
    outDir: "dist",
    lib: {
      formats: ["es", "umd"],
      fileName: "index",
      name: "Gauze",
      entry: ["src/index.ts"],
    },
  },
});
