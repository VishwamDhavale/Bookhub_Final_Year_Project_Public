import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Ensure your db module is imported

export async function POST(req) {
    const body = await req.json();
    const { ratings, book_id } = body;

    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.redirect("/api/auth/signin");
    }

    console.log("Ratings:", ratings, book_id);

    try {
        const response = await db.UserHistory.upsert({
            where: {
                userId_book_Id: {
                    userId: session?.user?.id,
                    book_Id: BigInt(book_id)
                }
            },
            update: {
                rating: ratings
            },
            create: {
                userId: session?.user?.id,
                book_Id: BigInt(book_id),
                rating: ratings
            }
        });



        if (!response) {
            return NextResponse.json({ message: "Error saving ratings" }, { status: 500 });
        }

        return NextResponse.json({ message: "Ratings saved successfully" }, { status: 200 });


    } catch (error) {
        console.error("Error at saveRatings route details page", error);
        return NextResponse.json({ message: "Error saving ratings", error: error.message }, { status: 500 });
    }
}
