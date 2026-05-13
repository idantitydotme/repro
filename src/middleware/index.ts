import { defineMiddleware } from "astro:middleware"

export const onRequest = defineMiddleware(async (context, next) => {
  // Skip auth entirely for Starlight docs pages
  if (context.url.pathname.includes("/docs/")) {
    return next()
  }

  let isAuthed = null
  try {
    const { auth } = await import("@/auth/auth")
    isAuthed = await auth.api.getSession({
      headers: context.request.headers,
    })
  } catch {}

  context.locals.user = isAuthed?.user ?? null
  context.locals.session = isAuthed?.session ?? null
  return next()
})