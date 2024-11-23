import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import { compare } from "bcryptjs";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
export const authOptions = {
    adapter: PrismaAdapter(db, {
        synchronize: false // Add synchronize: false here
    }),
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/auth/login',
    },
    providers: [

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",

            credentials: {
                email: { label: "Email", type: "email", placeholder: "exmaple@email.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // Add logic here to look up the user from the credentials supplied
                try {
                    if (!credentials.email || !credentials.password) {
                        return null;
                    }





                    const existingUser = await db.user.findUnique({
                        where: { email: credentials.email }
                    });

                    // const isseesion = await db.Session.findFirst({
                    //     where: { userId: existingUser.id }
                    // });

                    // if (isseesion && isseesion.expires < new Date()) {
                    //     return null
                    // }

                    // const istoken = await db.VerificationToken.findFirst({
                    //     where: { identifier: existingUser.id }
                    // });

                    // if (istoken && istoken.token) {
                    //     // create an error response with a 403 status code as user already has a token
                    //     return NextResponse.error(new Error("User already has a token"), { status: 403 });
                    // }
                    if (!existingUser) {
                        return null
                    }

                    if (existingUser.password) {
                        const passwordMatch = await compare(credentials.password, existingUser.password);
                        if (!passwordMatch) {
                            return null
                        }

                    }


                    const generatedtoken = jwt.sign({ id: existingUser.id, username: existingUser.user }, process.env.NEXTAUTH_SECRET, { expiresIn: "30d" });

                    const decode = jwt.decode(generatedtoken);

                    // await db.Session.create({
                    //     data: {
                    //         sessionToken: generatedtoken,
                    //         userId: existingUser.id,
                    //         expires: new Date(decode.exp * 1000)
                    //         // expires: new Date(decode.exp * 1000)

                    //     }
                    // })
                    await db.VerificationToken.create({
                        data: {
                            identifier: existingUser.id,
                            token: generatedtoken,
                            expires: new Date(decode.exp * 1000)
                        }
                    })






                    return {
                        id: `${existingUser.id}`,
                        username: existingUser.username,
                        email: existingUser.email,
                        role: existingUser.role,
                        accessToken: generatedtoken
                    }
                } catch (error) {
                    console.log("user creation failed", error)

                }
            }
        })
    ],
    callbacks: {

        async jwt({ token, user }) {
            // console.log("jwt", user)
            if (user && user.id) {


                return {
                    ...token,
                    username: user.username,
                    id: user.id,
                    role: user.role,
                    accessToken: user.accessToken


                }
            }
            return token
        },
        async session({ session, token }) {
            // console.log("session_back", token)


            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    username: token.username,
                    role: token.role,
                    accessToken: token.accessToken
                }

            }



        }
    }
}