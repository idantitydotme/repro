import starlight from "@astrojs/starlight"
import cloudflare from "@astrojs/cloudflare"
import { defineConfig } from "astro/config"

export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  site: "https://repro.local",
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },
  integrations: [
    starlight({
      title: {
        en: "Repro Docs",
      },
      description: "Repro documentation",
      lastUpdated: true,
      disable404Route: true,
      sidebar: [
        { label: "Hello", link: "/docs/hello/" },
      ],
    }),
  ],
})
