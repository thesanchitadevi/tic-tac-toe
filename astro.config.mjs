import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import tailwindcss from "tailwindcss"; // Add this import
import autoprefixer from "autoprefixer"; // Add this import

export default defineConfig({
  vite: {
    css: {
      postcss: {
        plugins: [
          tailwindcss(), // Use the imported function
          autoprefixer(), // Use the imported function
        ],
      },
    },
  },
  integrations: [react(), tailwind()],
});
