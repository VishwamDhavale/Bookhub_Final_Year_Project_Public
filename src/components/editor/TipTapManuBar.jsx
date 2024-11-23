import { Editor } from "@tiptap/react";
import {
  Bold,
  Code,
  Braces,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Undo,
  ImagePlus,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UploadDropzone } from "@uploadthing/react";
import { UploadButton } from "@uploadthing/react";

const TipTapMenuBar = ({ editor }) => {
  return (
    <>
      <div className="flex flex-wrap w-4/5 gap-5 justify-items-start">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          disabled={!editor.can().chain().focus().toggleBold().run()}
          className={editor.isActive("bold") ? "is-active" : ""}
        >
          <Bold className="w-6 h-6 " />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          disabled={!editor.can().chain().focus().toggleItalic().run()}
          className={editor.isActive("italic") ? "is-active" : ""}
        >
          <Italic className="w-6 h-6" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          disabled={!editor.can().chain().focus().toggleStrike().run()}
          className={editor.isActive("strike") ? "is-active" : ""}
        >
          <Strikethrough className="w-6 h-6" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          disabled={!editor.can().chain().focus().toggleCode().run()}
          className={editor.isActive("code") ? "is-active" : ""}
        >
          <Code className="w-6 h-6" />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive("heading", { level: 1 }) ? "is-active" : ""
          }
        >
          <Heading1 className="w-6 h-6" />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive("heading", { level: 2 }) ? "is-active" : ""
          }
        >
          <Heading2 className="w-6 h-6" />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive("heading", { level: 3 }) ? "is-active" : ""
          }
        >
          <Heading3 className="w-6 h-6" />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 4 }).run()
          }
          className={
            editor.isActive("heading", { level: 4 }) ? "is-active" : ""
          }
        >
          <Heading4 className="w-6 h-6" />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 5 }).run()
          }
          className={
            editor.isActive("heading", { level: 5 }) ? "is-active" : ""
          }
        >
          <Heading5 className="w-6 h-6" />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 6 }).run()
          }
          className={
            editor.isActive("heading", { level: 6 }) ? "is-active" : ""
          }
        >
          <Heading6 className="w-6 h-6" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive("bulletList") ? "is-active" : ""}
        >
          <List className="w-6 h-6" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive("orderedList") ? "is-active" : ""}
        >
          <ListOrdered className="w-6 h-6" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          className={editor.isActive("codeBlock") ? "is-active" : ""}
        >
          <Braces className="w-6 h-6" />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className={editor.isActive("blockquote") ? "is-active" : ""}
        >
          <Quote className="w-6 h-6" />
        </button>
        <button
          onClick={() => editor.chain().focus().undo().run()}
          disabled={!editor.can().chain().focus().undo().run()}
        >
          <Undo className="w-6 h-6" />
        </button>
        <button
          onClick={() => editor.chain().focus().redo().run()}
          disabled={!editor.can().chain().focus().redo().run()}
        >
          <Redo className="w-6 h-6" />
        </button>
        {/* <button
          onClick={() =>
            editor
              .chain()
              .setImage({
                src: "https://res.cloudinary.com/dbd9p5ic3/image/upload/v1717420823/bpyjm0g37bk8lxoxqile.jpg",
              })
              .run()
          }
          className={editor.isActive("image") ? "is-active" : ""}
        >
          <InsertImage editor={editor} />
        </button> */}

        <div>
          <Dialog>
            <DialogTrigger>
              <ImagePlus className="w-6 h-6" />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Insert Image</DialogTitle>
                <DialogDescription>
                  Images to be uplaoded
                  {/* Render the OurUploadButton component */}
                  <div>
                    {" "}
                    {/* Add a parent element */}
                    <UploadDropzone
                      className="mt-4 ut-button:bg-red-500 ut-button:ut-readying:bg-red-500/50"
                      endpoint="imageUploader"
                      onClientUploadComplete={(res) => {
                        // Do something with the response
                        editor
                          .chain()
                          .focus()
                          .setImage({ src: res[0].url })
                          .run();
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
                          (f) =>
                            new File([f], "renamed-" + f.name, { type: f.type })
                        );
                      }}
                      onUploadBegin={(name) => {
                        // Do something once upload begins
                        console.log("Uploading: ", name);
                      }}
                    />
                  </div>{" "}
                  {/* Close the parent element */}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </>
  );
};

export default TipTapMenuBar;
