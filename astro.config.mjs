import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react(), sitemap()],
  site: "https://dodycode.com",
  headers: {
    "Content-Security-Policy": `script-src 'self' 'unsafe-inline' https://giscus.app;`,
  },
});
