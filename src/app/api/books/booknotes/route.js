import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Ensure this import is correct

export async function POST(req) {
    try {
        const body = await req.json();
        const { title } = body;

        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.redirect(new URL("/auth/signin", req.url));
        }

        const userId = session.user.id;

        if (!title) {
            return NextResponse.json({ error: 'Title is required' }, { status: 400 });
        }

        const createNote = await db.note.create({
            data: {
                userId,
                name: title,
                fileUrl: 'https://utfs.io/f/bc67ae7d-b5dd-4ba0-8f3b-1c002799f192-z4izli.pdf',
                fileName: 'dummy.pdf'
            }
        });

        if (createNote) {
            return NextResponse.json({ note_id: createNote.id }, { status: 201 });
        } else {
            return NextResponse.json({ error: 'Failed to create note' }, { status: 500 });
        }

    } catch (error) {
        console.error("Error creating note:", error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}