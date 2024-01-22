import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";


export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;
  const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard");
  const isHome = req.nextUrl.pathname === "/";

  if (req.nextUrl.pathname.startsWith("/auth/login") && isAuthenticated) {

    return Response.redirect(new URL("/dashboard", req.nextUrl));
  } else if (req.nextUrl.pathname === "/") {
    if (isAuthenticated)
      return Response.redirect(new URL("/dashboard", req.nextUrl));
    else return Response.redirect(new URL("/auth/login", req.nextUrl));
  }

/*  if (isOnDashboard) {
    if (isAuthenticated) return null;
    else return Response.redirect(new URL("/auth/login", req.nextUrl));
    // Redirect unauthenticated users to login page
  } else if (isAuthenticated) {
    return Response.redirect(new URL("/dashboard", req.nextUrl));
  } else if (isHome) {
    if (isAuthenticated) Response.redirect(new URL("/dashboard", req.nextUrl));
    else  return Response.redirect(new URL("/auth/login", req.nextUrl));
  }
  return null;*/


  const authMiddleware = withAuth({
    pages: {
      signIn: "/auth/login",
      error: "/auth/login",
      signOut: "/auth/login",
    },
    secret: process.env.NEXTAUTH_SECRET,
  });

  // @ts-expect-error
  return authMiddleware(req, event);
}
