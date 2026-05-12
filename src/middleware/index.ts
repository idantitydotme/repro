import { defineMiddleware } from "astro:middleware"
import { auth as betterAuth } from "@/auth/auth"

export const onRequest = defineMiddleware(async (context, next) => {
  const isAuthed = await betterAuth.api.getSession({
    headers: context.request.headers,
  })
  // context.locals.user = isAuthed?.user ?? null
  // context.locals.session = isAuthed?.session ?? null
  return next()
})
