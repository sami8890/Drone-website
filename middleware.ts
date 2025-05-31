import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server"

// Create a route matcher for public routes that don't require authentication
const isPublicRoute = createRouteMatcher(["/", "/Product", "/Product/(.*)", "/service", "/api/webhook"])

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) {
    return
  }
})

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}
