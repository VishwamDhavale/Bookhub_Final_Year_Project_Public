

import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db';
import { getServerSession } from 'next-auth'

export async function POST(req) {
    const session = await getServerSession(authOptions)
    console.log("session api", session)
    // if (!session) {
    //     return Response.json({ message: 'You must be logged in.' }, { status: 401 })
    // }

    // try {
    //     const result = session?.user.id // ...

    //     return Response.json(result)
    // } catch (err) {
    //     return Response.json(err, { status: 500 })
    // }
    const userId = session?.user.id;
    const body = await req.json();
    const { name } = body;

    const note_id = await db.Note.create({
        data: {
            name,
            userId

        }
    })

    if (note_id) {
        return Response.json({ note_id: note_id.id }, { status: 200 })
    }
    return Response.json(err, { status: 400 })
}