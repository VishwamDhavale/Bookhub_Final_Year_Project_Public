import { Button } from '@/components/ui/button';
import { db } from '@/lib/db';
import TiptapEditor from "@/components/editor/TiptapEditor";

import { redirect } from 'next/navigation';
import React from 'react';
import DeleteButton from '@/components/editor/DeleteButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import PdfViewer from '@/components/editor/PdfViewer';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import Link from 'next/link';

const Notebook = async ({ params: { noteId } }) => {
    const session = await getServerSession(authOptions);
    const userId = session?.user.id;

    if (!userId) {
        return redirect('/sign-in');
    }

    const note = await db.note.findFirst({
        where: {
            id: noteId,
            userId: userId
        }
    });

    if (!note) {
        return redirect('/notebooks');
    }

    return (
        <div className="h-screen flex flex-col">
            <main className="flex-grow flex h-screen">
                <ResizablePanelGroup direction="horizontal" className="flex-grow flex ">
                    <ResizablePanel defaultSize={44} minSize={38} className="flex-shrink-0">
                        <div className=" h-screen ">
                            {/* Left Side (PDF Viewer) */}
                            {note.fileUrl ? <PdfViewer noteURL={note.fileUrl} /> : <div>No PDF</div>}
                        </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel minSize={38} className="flex-shrink-0">
                        <div className="pl-4  h-screen flex flex-col ">
                            {/* Right Side (TiptapEditor) */}
                            <div className="border shadow-xl border-gray-300 rounded-lg p-4 flex items-center">
                                <Link href="/notebooks">
                                    <Button className="bg-green-600" size="sm">
                                        Back
                                    </Button>
                                </Link>
                                <div className="w-3"></div>
                                <span className="font-semibold">
                                    {session?.user.username ? session?.user.username : session?.user.email}
                                </span>
                                <span className="inline-block mx-1">/</span>
                                <span className="text-gray-600 font-semibold">{note.name}</span>
                                <div className="ml-auto">
                                    <DeleteButton noteId={note.id} />
                                </div>
                            </div>
                            <div className="h-4"></div>
                            <div className="border-gray-300 shadow-xl border rounded-lg px-4 py-4 overflow-y-auto no-scrollbar">
                                {/* Right Side Content (TiptapEditor) */}
                                <TiptapEditor note={note} />
                            </div>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </main>
            <div className=" bg-white border-t shadow-md py-2">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between items-center">
                        <div className="text-sm flex items-center">
                            Tip: Press{" "}
                            <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg mx-1">
                                Alt + A
                            </kbd>{" "}
                            for AI autocomplete
                        </div>

                        <div className="text-sm flex items-center">
                            Tip: Press{" "}
                            <kbd className="px-2 py-1.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-lg mx-1">
                                Alt + S
                            </kbd>{" "}
                            for AI Summarization
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notebook;
