import { auth as betterAuth } from "@/auth/auth"

export const onRequest = defineMiddleware(async (context, next) => {
  let isAuthed = null
  try {
    isAuthed = await betterAuth.api.getSession({
      headers: context.request.headers,
    })
  } catch (e) {
    console.error("[auth middleware error]", {
      message: (e as Error).message,
      name: (e as Error).name,
      stack: (e as Error).stack,
      url: context.url.pathname,
    })
  }

  context.locals.user = isAuthed?.user ?? null
  context.locals.session = isAuthed?.session ?? null
  return next()
})