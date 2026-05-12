import { betterAuth } from "better-auth"

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    useSecureCookies: true,
    cookiePrefix: "auth",
  },
})
