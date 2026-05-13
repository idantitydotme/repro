import { defineMiddleware } from "astro:middleware"
import { auth as betterAuth } from "@/auth/auth"

export const onRequest = defineMiddleware(async (context, next) => {
  if (context.url.pathname.includes("/docs/")) {
    try {
      await betterAuth.api.getSession({
        headers: context.request.headers,
      })
      return new Response("OK - no error", { status: 200 })
    } catch (e) {
      return new Response(
        JSON.stringify(
          {
            name: (e as Error).name,
            message: (e as Error).message,
            stack: (e as Error).stack,
          },
          null,
          2,
        ),
        {
          status: 500,
          headers: { "content-type": "application/json" },
        },
      )
    }
  }

  let isAuthed = null
  try {
    isAuthed = await betterAuth.api.getSession({
      headers: context.request.headers,
    })
  } catch {
    // getSession() may fail in certain runtime contexts (e.g. Starlight on Cloudflare Workers)
  }

  context.locals.user = isAuthed?.user ?? null
  context.locals.session = isAuthed?.session ?? null
  return next()
})
