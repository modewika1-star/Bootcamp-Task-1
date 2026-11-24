import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// GitHub Pages hosts this project under /Bootcamp-Task-1/.
// Other hosts (including local dev and Vercel) serve it from the domain root.
const base = process.env.GITHUB_ACTIONS === "true" ? "/Bootcamp-Task-1/" : "/";

export default defineConfig({
  base,
  plugins: [react(), tailwindcss()],
});
