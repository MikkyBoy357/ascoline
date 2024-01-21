import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";


export default async function middleware(
  req: NextRequest,
  event: NextFetchEvent
) {
  const token = await getToken({ req });
  const isAuthenticated = !!token;

  if (req.nextUrl.pathname.startsWith("/auth/login") && isAuthenticated) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  } else if (req.nextUrl.pathname === "/") {
    if (isAuthenticated)
      return NextResponse.redirect(new URL("/dashboard", req.url));
    else return NextResponse.redirect(new URL("/auth/login", req.url));
  }


  const authMiddleware = await withAuth({
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
