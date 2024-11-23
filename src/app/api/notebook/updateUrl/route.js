

import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth'

export async function POST(req) {

    const body = await req.json();
    const { note_id, url, file_name } = body;

    const updateNotebook = await db.note.update({
        where: {
            id: note_id,
        },
        data: {
            fileUrl: url,
            fileName: file_name

        },
    });


    if (updateNotebook) {
        return Response.json({ note_id: updateNotebook.id }, { status: 200 })
    }
    return Response.json(err, { status: 400 })
}