import { withAuth } from "next-auth/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";



export default withAuth(
    // `withAuth` augments your `Request` with the user's token.
    function middleware(req) {


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
        secret: process.env.NEXTAUTH_SECRET,
        pages: {
            signIn: "/auth/login",
            error: "/auth/login",
        },
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    }
);



