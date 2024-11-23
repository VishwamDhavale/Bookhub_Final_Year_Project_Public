import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import CreateNoteDialog from '@/components/editor/CreateNoteDialog'
// import { UserButton, auth } from '@clerk/nextjs'
import { ArrowLeft } from 'lucide-react'

import React from 'react'
// import { db } from '@/lib/db'
// import { $notes } from '@/lib/db/schema'
// import { eq } from 'drizzle-orm'
import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import Link from 'next/link'



const EditorPage = async () => {

    // const { userId } = auth()
    // const notes = await db.select().from($notes).where(eq($notes.userId, userId!))
    const session = await getServerSession(authOptions)
    const userId = session?.user.id
    const notes = await db.Note.findMany({
        where: {
            userId: userId
        }
    })



    return (
        <div className='grainy min-h-screen'>
            <div className='max-w-7xl mx-aoto p-10'>
                <div className='h-14'></div>
                <div className='flex justify-between md:flex-row flex-col'>
                    <div className='flex items-center'>
                        <Link href={"/dashboard"} >
                            <Button className='bg-green-600' size={"sm"}>
                                <ArrowLeft className='mr-1 w-4 h-4' />
                                Back
                            </Button>
                        </Link>
                        <div className="w-4"></div>
                        <h1 className='text-3xl font-bold text-gray-900'>My Notes</h1>
                        <div className="w-4"></div>


                    </div>
                </div>
                <div className="h-8"></div>
                <Separator />
                <div className="h-8"></div>
                {!notes && (
                    <div className="text-center">
                        <h2 className="text-xl text-gray-500">You have no notes yet.</h2>
                    </div>
                )}



                <div className='grid sm:grid-cols-3 md:grid-cols-5 grid-cols-1 gap-3'>
                    <CreateNoteDialog />
                    {notes.map((note) => (
                        <a href={`/notebooks/${note.id}`} key={note.id} className="flex flex-col bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition duration-300 ease-in-out">
                            <div className='border border-stone-300 rounded-lg overflow-hidden flex flex-col hover:shadow-xl transition hover:-translate-y-1'>
                                <Image
                                    src='/image.jpg'
                                    alt="Picture of the author"
                                    width={400}
                                    height={300}
                                />
                                <div className="p-4">
                                    <h3 className="text-xl font-semibold text-gray-900">
                                        {note.name}
                                    </h3>
                                    <div className="h-1"></div>
                                    <p className="text-sm text-gray-500">
                                        {new Date(note.createdAt).toLocaleDateString()}
                                    </p>
                                </div>

                            </div>
                        </a>
                    ))}

                </div>



            </div>

        </div>
    )
}

export default EditorPage