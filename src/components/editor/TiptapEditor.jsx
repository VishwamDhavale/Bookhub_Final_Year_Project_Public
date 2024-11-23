"use client";

import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import TipTapManuBar from "./TipTapManuBar";
import { Image } from "@tiptap/extension-image";

import { useMutation } from "@tanstack/react-query";
import axios from "axios";

import { useCompletion } from "ai/react";

import Text from "@tiptap/extension-text";
import { Button } from "../ui/button";
import { useDebounce } from "@/lib/useDebounce";

const TiptapEditor = ({ note }) => {
  const [editorState, setEditorState] = React.useState(note.editorState || "");
  const [isLoading, setIsLoading] = React.useState(false);
  const { complete, completion } = useCompletion({
    api: "/api/completion",
  });

  const { complete: summarize } = useCompletion({
    api: "/api/notebook/summarize",
  });

  const saveNote = useMutation({
    mutationFn: async () => {
      setIsLoading(true);
      const response = await axios.post("/api/saveNotes", {
        noteId: note.id,
        editorState,
      });
      return response.data;
    },
  });

  const customText = Text.extend({
    addKeyboardShortcuts() {
      return {
        "Alt-a": () => {
          const prompt = this.editor.getText().split(" ").slice(-30).join(" ");
          complete(prompt);
          return true;
        },
      };
    },
  });

  const customText2 = Text.extend({
    addKeyboardShortcuts() {
      return {
        "Alt-s": () => {
          const text = this.editor.getText();
          summarize(text).then((summary) => {
            this.editor.commands.insertContent(summary);
          });
          return true;
        },
      };
    },
  });

  const editor = useEditor({
    autofocus: true,
    extensions: [StarterKit, customText, customText2, Image],
    content: editorState,
    onUpdate: ({ editor }) => {
      setEditorState(editor.getHTML());
    },
  });

  const lastCompletion = React.useRef("");

  React.useEffect(() => {
    if (!editor || !completion) {
      return;
    }
    const diff = completion.slice(lastCompletion.current.length);
    lastCompletion.current = completion;
    editor.commands.insertContent(diff);
  }, [completion, editor]);

  const debounceEditorState = useDebounce(editorState, 1000);
  React.useEffect(() => {
    if (debounceEditorState === "") {
      return;
    }
    saveNote.mutate(undefined, {
      onSuccess: (data) => {
        setIsLoading(false);
      },
      onError: (error) => {
        setIsLoading(false);
        console.log("note save error", error);
      },
    });
  }, [debounceEditorState]);

  return (
    <>
      <div className="flex flex-col h-screen ">
        <div className="flex-shrink-0">
          <div className="flex justify-between items-center p-4 bg-white z-10 border-b">
            {editor && <TipTapManuBar editor={editor} />}
            <Button disabled variant={"outline"}>
              {isLoading ? "Saving" : "Save"}
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar">
          <div className="prose prose-sm max-w-3xl md:min-w-screen mx-auto p-4">
            <EditorContent editor={editor} />
          </div>
        </div>
      </div>
    </>
  );
};

export default TiptapEditor;
