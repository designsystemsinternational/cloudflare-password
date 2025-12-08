import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  return {
    base: "/auth",
    plugins: [react()],
    css: {
      modules: {
        localsConvention: "camelCase",
      },
    },
    build: {
      outDir: "dist/auth",
    },
  };
});
