import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req, res) {
    try {
        const allGenres = await db.genre.findMany();
        if (!allGenres) return NextResponse.error({ message: "No genres found" })

        return NextResponse.json(allGenres);
    } catch (error) {
        console.log("error at allgenres route: ", error)
    }
}