import starlight from "@astrojs/starlight"
import cloudflare from "@astrojs/cloudflare"
import { ui } from "@rimelight/ui/integrations"
import { sri } from "@rimelight/ui/integrations"
import { defineConfig, memoryCache, svgoOptimizer } from "astro/config"

export default defineConfig({
  output: "server",
  adapter: cloudflare(),
  site: "https://repro.local",

  experimental: {
    contentIntellisense: true,
    queuedRendering: {
      enabled: true,
      contentCache: true,
    },
    cache: {
      provider: memoryCache(),
    },
    routeRules: {
      "/api/[...path]": {
        swr: 600,
      },
      "/[...path]": {
        maxAge: 300,
      },
    },
    clientPrerender: true,
    svgOptimizer: svgoOptimizer({
      plugins: [
        "preset-default",
        "removeXMLNS",
        { name: "removeXlink", params: { includeLegacy: true } },
      ],
    }),
  },

  prefetch: {
    prefetchAll: true,
  },

  i18n: {
    locales: ["en"],
    defaultLocale: "en",
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: true,
    },
  },

  security: {
    checkOrigin: true,
    allowedDomains: [
      {
        hostname: "**.repro.local",
        protocol: "https",
      },
    ],
    csp: {
      algorithm: "SHA-384",
      directives: [
        "default-src 'none'",
        "img-src 'self'",
        "font-src 'self'",
        "connect-src 'self'",
        "frame-ancestors 'none'",
        "upgrade-insecure-requests",
        "base-uri 'self'",
        "form-action 'self'",
      ],
      scriptDirective: {
        resources: ["'self'"],
      },
      styleDirective: {
        resources: ["'self'"],
      },
    },
  },

  markdown: {
    syntaxHighlight: "prism",
  },

  integrations: [
    starlight({
      title: {
        en: "Repro Docs",
      },
      description: "Repro documentation",
      lastUpdated: true,
      // prerender: false,
      disable404Route: true,
      sidebar: [
        { label: "Hello", link: "/docs/hello/" },
      ],
    }),

    ui(),

    sri()
  ],
})
