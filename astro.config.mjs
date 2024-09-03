import { defineConfig } from "astro/config";

import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],
  site: "https://dodycode.com",

  headers: {
    "Content-Security-Policy": `script-src 'self' 'unsafe-inline' https://giscus.app;`,
  },

  output: "server",
  adapter: vercel(),
});
