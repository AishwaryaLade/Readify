// proxy.ts
import { clerkMiddleware } from "@clerk/nextjs/server"

export default clerkMiddleware({
  debug: false,
})

export const config = {
  matcher: ["/api/:path*"],
}