import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
    try {
        const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET, secureCookie: process.env.NODE_ENV === "production", });


        if (!token || !token.accessToken) {
            const { origin } = new URL(req.url, `http://${req.headers.host}`);
            return NextResponse.redirect(`${origin}/auth/login`);
        }

        // Token is valid, continue to next middleware or handler
        return NextResponse.next();
    } catch (error) {
        console.error("Middleware error:", error);
        // Handle unexpected errors gracefully
        return NextResponse.error(new Error("Authentication error"));
    }
}

export const config = {
    api: {
        bodyParser: false // Disable body parsing to ensure the raw request body can be read
    },

    matcher: ["/dashboard", "/notebooks"],
};
