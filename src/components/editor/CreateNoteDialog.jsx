"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Loader2, Plus } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import Tus from "@uppy/tus";
import {
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import { storage } from "@/lib/firebase";
import { useSession } from "next-auth/react";
import { ColorRing } from "react-loader-spinner";

const CreateNoteDialog = () => {
  const router = useRouter();
  const [input, setInput] = React.useState("");
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const { data: session } = useSession();
  console.log("token", session);
  const token = session?.user?.accessToken;

  const [uppy] = useState(
    () =>
      new Uppy({
        restrictions: {
          maxNumberOfFiles: 1,
          allowedFileTypes: [".pdf"],
          maxFileSize: 20 * 1000 * 1000, // 10 MB
        },
      })
  );

  const createNotebook = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/notebook/createNoteBook", {
        name: input,
      });
      return response.data;
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input === "") {
      window.alert("Please enter a name for your notebook");
      return;
    }
    setLoading(true);
    createNotebook.mutate(undefined, {
      onSuccess: async ({ note_id }) => {
        console.log("created new note:", { note_id });
        // hit another endpoint to uplod the temp dalle url to permanent firebase url
        // uploadToFirebase.mutate(note_id);

        if (uppy.getFiles().length !== 0) {
          const file = uppy.getFiles()[0];
          // const storageRef = storage.ref(`notebooks/${note_id}/${file.name}`);
          // await storageRef.put(file.data);
          // const downloadURL = await storageRef.getDownloadURL();
          // console.log("File uploaded successfully:", downloadURL);

          const metadata = {
            contentType: "application/pdf",
            customMetadata: {
              noteId: note_id,
            },
          };
          const storageRef = ref(storage, `notebooks/${note_id}/${file.name}`);
          // uploadBytes(storageref, file.data).then((snapshot) => {
          //   console.log("Uploaded a blob or file!", snapshot);
          // });
          // const uploadTask = uploadBytesResumable(
          //   storageref,
          //   file.data,
          //   metadata
          // ).then((snapshot) => {
          //   console.log("Uploaded a blob or file!", snapshot);
          // });
          const uploadTask = await uploadBytesResumable(
            storageRef,
            file.data,
            metadata
          );
          const downloadURL = await getDownloadURL(uploadTask.ref);
          console.log("File uploaded successfully:", downloadURL);
          const responseurl = await axios.post("/api/notebook/updateUrl", {
            note_id: note_id,
            url: downloadURL,
            file_name: file.name,
          });
          // router.push(`pdfviewer/${downloadURL}`);
        }

        router.push(`/notebooks/${note_id}`);
      },
      onError: (error) => {
        console.error(error);
        window.alert("Failed to create new notebook");
      },
    });
  };

  return (
    <Dialog>
      <DialogTrigger>
        <div id="upload-trigger"></div>
        <div className="border-dashed border-2 flex border-green-600 h-full rounded-lg items-center justify-center sm:flex-col hover:shadow-xl transition hover:-translate-y-1 flex-row p-4">
          <Plus className="w-6 h-6 text-green-600" strokeWidth={3} />
          <h2 className="font-semibold text-green-600 sm:mt-2">
            New Note Book
          </h2>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Note Book</DialogTitle>
          <DialogDescription>
            You can create a new note by clicking the button below.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <Dashboard uppy={uppy} className="w-auto" hideUploadButton />
          <div className=" h-8"></div>

          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Name..."
          />
          <div className="h-4"></div>
          <div className="flex items-center gap-2">
            <Button type="reset" variant={"secondary"}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-green-600"
              disabled={createNotebook.isLoading}
            >
              {createNotebook.isLoading && (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              )}
              Create
            </Button>
            {loading ? (
              <ColorRing
                visible={true}
                height="60"
                width="60"
                colors={["back"]}
              />
            ) : null}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNoteDialog;
