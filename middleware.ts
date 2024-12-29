// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
 

// const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)'])

// export default clerkMiddleware(async (auth, request) => {
//     if (!isPublicRoute(request)) {
//       await auth.protect()
//     }
//   })

// export const config = {
//   matcher: [
//     // Skip Next.js internals and all static files, unless found in search params
//     '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
//     // Always run for API routes
//     '/(api|trpc)(.*)',
//   ],
// };   



import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define public and ignored routes
const publicRoutes = [
  '/',
  '/events/:id',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhook/clerk',
  '/api/webhook/stripe',
  '/api/uploadthing'
];

const ignoredRoutes = [
  '/api/webhook/clerk',
  '/api/webhook/stripe',
  '/api/uploadthing'
];

// Create route matchers
const isPublicRoute = createRouteMatcher(publicRoutes);
const isIgnoredRoute = createRouteMatcher(ignoredRoutes);

export default clerkMiddleware(async (auth, request) => {
  // If the route matches an ignored route, skip authentication entirely
  if (isIgnoredRoute(request)) {
    return; // Middleware bypassed
  }

  // If the route matches a public route, allow access without authentication
  if (!isPublicRoute(request)) {
    // Protect the route if it's not public
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
