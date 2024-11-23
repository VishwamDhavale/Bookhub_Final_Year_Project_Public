import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function POST(req) {
    const selectedGenres = await req.json();
    console.log("selectedGenres: ", selectedGenres)

    if (!selectedGenres) {
        return NextResponse.json({ error: "No genres selected" }, { status: 400 });
    }

    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
        return NextResponse.json({ error: "User not authenticated" }, { status: 401 });
    }

    try {
        // const user = await db.user.update({
        //     where: { id: userId },
        //     data: {
        //         genres: {
        //             set: selectedGenres.map((genre) => ({ id: genre.id })),
        //         },
        //     },
        // });
        const newGenres = selectedGenres.map((genre) => ({
            name: genre.name,
            userId: userId,
        }));

        const userGenres = await db.userGenre.createMany({
            data: newGenres,
        });

        return NextResponse.json(userGenres, { status: 200 });
    } catch (error) {
        console.log("selectedgenres route error: ", error);
        return NextResponse.json({ error: "Error updating user's genres" }, { status: 500 });
    }
}