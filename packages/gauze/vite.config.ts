import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import { version } from "./package.json";

const IS_RUNTIME = Boolean(process.env.RUNTIME);

export default defineConfig({
  plugins: [dts({ outputDir: IS_RUNTIME ? "jsx-runtime/dist" : "dist", exclude: ["src/env.d.ts"] })],
  define: {
    "process.env.GAUZE_JSX_KEY": `"__g_${version}"`,
  },
  build: {
    emptyOutDir: false,
    outDir: IS_RUNTIME ? "jsx-runtime/dist" : "dist",
    lib: {
      formats: ["es", "umd"],
      fileName: IS_RUNTIME ? "jsx-runtime" : "index",
      name: IS_RUNTIME ? "jsxRuntime" : "Gauze",
      entry: IS_RUNTIME ? "src/jsx-runtime.ts" : "src/index.ts",
    },
  },
});
