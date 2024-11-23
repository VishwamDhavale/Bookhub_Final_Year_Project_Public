import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"

export async function GET(req) {
    try {
        const session = await getServerSession(authOptions);

        if (!session || !session.user) {
            // return res.status(401).json({ status: 401, message: "Signout fail: no session" });
            return NextResponse.json({ status: 401, message: "Signout fail: no session" });
        }


        // Delete the session from the database
        // const deleteResult = await db.Session.deleteMany({
        //     where: {
        //         sessionToken: session.user.accessToken
        //     }
        // });

        const deleteResult = await db.VerificationToken.delete({
            where: {
                token: session.user.accessToken
            }
        });

        if (deleteResult.count >= 0) {
            // return res.status(200).json({ status: 200, message: "Signout success" });
            return NextResponse.json({ status: 200, message: "Signout success" });
        } else {
            // return res.status(500).json({ status: 500, message: "Signout fail: no session found" });
            return NextResponse.json({ status: 500, message: "Signout fail: no session found" });
        }
    } catch (error) {
        console.error("Error occurred during signout:", error);
        // return res.status(500).json({ status: 500, message: "Internal Server Error" });
        return NextResponse.json({ status: 500, message: "Internal Server Error" });
    }
}
