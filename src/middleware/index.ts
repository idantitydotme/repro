import { defineMiddleware } from "astro:middleware"
import { auth as betterAuth } from "@/auth/auth"

const DOCS_PATTERN = /^\/[^/]+\/docs\//

export const onRequest = defineMiddleware(async (context, next) => {
  if (DOCS_PATTERN.test(context.url.pathname)) {
    return next()
  }

  const isAuthed = await betterAuth.api.getSession({
    headers: context.request.headers,
  })
  context.locals.user = isAuthed?.user ?? null
  context.locals.session = isAuthed?.session ?? null
  return next()
})
