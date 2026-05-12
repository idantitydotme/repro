import { defineMiddleware } from "astro:middleware"
import { auth } from "../auth/auth"

export const onRequest = defineMiddleware(async (context, next) => {
  const session = await auth.api.getSession({ headers: context.request.headers })
  const isSignedIn = session !== null

  context.locals.isSignedIn = isSignedIn

  return next()
})
