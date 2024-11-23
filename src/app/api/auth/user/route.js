import { db } from "@/lib/db";
import { genSalt, hash } from "bcryptjs";

import { NextResponse } from "next/server";
// import * as z from 'zod'

// const userSchema = z
//     .object({
//         username: z.string().min(1, 'username is requred').max(100),
//         email: z.string().min(1, 'Email is requred').email('Invalid email'),
//         password: z
//             .string()
//             .min(1, 'Password is requred')
//             .min(8, 'Passwaord msut have 8 characters'),
//     })



export async function POST(req) {
    try {
        const body = await req.json();
        const { email, username, password } = body;

        const exitingUserByEmail = await db.user.findUnique({
            where: {
                email: email
            }
        });

        if (exitingUserByEmail) {
            return NextResponse.json({ user: null, messgae: "User with this email already exits" }, { status: 409 })
        }

        const exitingUserByUsername = await db.user.findUnique({
            where: {
                username: username
            }
        });
        if (exitingUserByUsername) {
            return NextResponse.json({ user: null, message: "User with this username already exists" }, { status: 409 })
        }

        // const hashPasswaord = await hash(password, 10)
        const salt = await genSalt(10)

        const hashPassword = await hash(password, salt)
        // console.log("harshPassword", hashPassword)

        const newUser = await db.User.create({
            data: {
                username,
                email,
                password: hashPassword
            }
        })

        const { password: newUserPassword, ...rest } = newUser

        return NextResponse.json({ user: rest, message: "New user created successfuly" }, { status: 201 });

    } catch (error) {
        return NextResponse.json({ message: "Something went wrong" }, { status: 401 });

    }


}