import { db } from "@/lib/db";
import { storage } from "@/lib/firebase";
import { deleteObject, ref } from "firebase/storage";


import { NextResponse } from "next/server";

export async function POST(req) {
    const { noteId } = await req.json();
    console.log("noteID at delete", noteId);
    //   await db.delete($notes).where(eq($notes.id, parseInt(noteId)));
    try {
        const note = await db.Note.findUnique({ where: { id: noteId } });
        const filename = note.fileName;

        const desertRef = ref(storage, `notebooks/${noteId}/${filename}`);
        deleteObject(desertRef).then(() => {
            // File deleted successfully
            console.log("File deleted successfully");
        }).catch((error) => {
            console.error("Error removing file: ", error);
        });

        const deleteNote = await db.Note.delete({ where: { id: noteId } })
        if (!deleteNote) {
            return new NextResponse("Not found", { status: 404 });
        }
        console.log("noteID at delete", noteId);
        return new NextResponse("ok", { status: 200 });
    } catch (error) {
        console.error("error", error);

    }
}