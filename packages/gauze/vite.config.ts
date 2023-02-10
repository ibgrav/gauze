import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts({ outputDir: "dist/types" })],
  build: {
    minify: true,
    sourcemap: false,
    rollupOptions: {
      input: ["src/index.ts", "src/jsx-runtime.ts"],
      preserveEntrySignatures: "strict",
      output: [
        {
          format: "esm",
          dir: "dist/esm",
          preserveModules: true,
          preserveModulesRoot: "src",
          entryFileNames: "[name].mjs",
          chunkFileNames: "[name].mjs",
        },
        {
          format: "cjs",
          dir: "dist/cjs",
          preserveModules: true,
          preserveModulesRoot: "src",
          entryFileNames: "[name].js",
          chunkFileNames: "[name].js",
        },
      ],
    },
  },
});
