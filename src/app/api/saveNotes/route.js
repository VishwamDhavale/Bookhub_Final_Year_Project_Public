import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        let { noteId, editorState } = body;


        if (!noteId || !editorState) {
            return new NextResponse("missing noteId or editorState", { status: 400 })

        }

        const notes = await db.Note.findUnique({
            where: {
                id: noteId
            }
        })

        if (!notes) {
            return new NextResponse("failed to upload", { status: 404 })
        }
        if (notes.editorState !== editorState) {
            await db.Note.update({
                where: {
                    id: noteId
                },
                data: {
                    editorState: editorState
                }
            });
        }
        return new NextResponse("Notes uploaded", { status: 200 });


    } catch (error) {
        console.log("error", error)
        return NextResponse.json({
            success: false,
        }, { status: 500 });

    }
    return
}