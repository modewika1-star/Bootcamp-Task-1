import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // Relative asset paths work both at / on custom hosts and /<repo>/ on GitHub Pages.
  base: "./",
  plugins: [react(), tailwindcss()],
});
