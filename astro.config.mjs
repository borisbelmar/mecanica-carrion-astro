// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    // Continue build even with warnings
    build: {
      rollupOptions: {
        onwarn: () => {} // Suppress warnings
      }
    }
  },
  integrations: [react()]
});