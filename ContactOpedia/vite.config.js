import babel from "@rolldown/plugin-babel";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  // React Compiler memoizes components automatically, so no manual
  // useMemo/useCallback is needed
  plugins: [react(), babel({ presets: [reactCompilerPreset()] })],
  css: {
    preprocessorOptions: {
      scss: {
        // Bootstrap 5.3's Sass still uses @import and older Sass functions;
        // hide those deprecation warnings until Bootstrap 6 moves to @use
        quietDeps: true,
        silenceDeprecations: ["import"],
      },
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
  },
});
