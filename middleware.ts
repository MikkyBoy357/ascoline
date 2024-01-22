import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";



export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(req) {
        console.log("ok", req.nextUrl.pathname);

        if (
            req.nextUrl.pathname === "/" &&
            req.nextauth.token !== null
        ) {
            return NextResponse.redirect(new URL("/dashboard", req.url));
        }

        if (
            req.nextUrl.pathname === "/" &&
            req.nextauth.token === null
        ) {
            return NextResponse.redirect(new URL("/auth/login", req.url));
        }
    },
    {
        pages: {
            signIn: "/auth/login",
            error: "/auth/login",
        },
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);



