import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import babel from "vite-plugin-babel";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  build: {
    lib: {
      entry: 'src/embed.tsx',
      name: 'CodeEditor',
      fileName: (format) => `code-editor.${format}.js`,
      formats: ['umd'],
    },
    rollupOptions: {
      output: {},
      external: [],
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
  plugins: [react(), babel(), cssInjectedByJsPlugin()],
  worker: {
    format: "es",
  },
  define: {
    'process.env': {},
    'process': { env: {} },
  },
  resolve: {
    alias: {
      process: 'process/browser',
    },
  },
});
