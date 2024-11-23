import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UploadButton } from "@uploadthing/react";
import { ImagePlus } from "lucide-react";

const InsertImage = ({ editor }) => {
  const OurUploadButton = () => (
    <UploadButton
      endpoint="imageUploader"
      onClientUploadComplete={(res) => {
        // Do something with the response
        console.log("Files: ", res);
        alert("Upload Completed");
      }}
      onUploadError={(error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
      onBeforeUploadBegin={(files) => {
        // Preprocess files before uploading (e.g. rename them)
        return files.map(
          (f) => new File([f], "renamed-" + f.name, { type: f.type })
        );
      }}
      onUploadBegin={(name) => {
        // Do something once upload begins
        console.log("Uploading: ", name);
      }}
    />
  );

  return (
    <div>
      <Dialog>
        <DialogTrigger>
          <ImagePlus className="w-6 h-6" />
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Insert Image</DialogTitle>
            <DialogDescription>
              <OurUploadButton /> {/* Render the OurUploadButton component */}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InsertImage;
