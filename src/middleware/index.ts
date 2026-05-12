import { defineMiddleware } from "astro:middleware"
import { auth as betterAuth } from "@/auth/auth"

export const onRequest = defineMiddleware(async (context, next) => {
  let isAuthed = null
  try {
    isAuthed = await betterAuth.api.getSession({
      headers: context.request.headers
    })
  } catch {
    // getSession() may fail in certain runtime contexts (e.g. Starlight on Cloudflare Workers)
  }

  context.locals.user = isAuthed?.user ?? null
  context.locals.session = isAuthed?.session ?? null
  return next()
})