import { usePosts } from "@/hooks/usePosts";
import { useRef, useState } from "react";
import { toast } from "react-toastify";
import Button from "./Button";
import Image from "next/image";

import ImageIcon from "@/assets/image.svg";

const CreatePost = () => {
  const { createPost } = usePosts();
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState<File | undefined>(undefined);
  const [filePreview, setFilePreview] = useState<string | undefined>(undefined);

  const handleCreatePost = async () => {
    setIsLoading(true);
    if (!content.trim()) return;

    await createPost(content, file).finally(() => {
      setIsLoading(false);
    });

    setContent("");
    setFile(undefined);
    setFilePreview(undefined);
    toast.success("Publicado!");
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="bg-background border-border flex w-full flex-col gap-4 rounded-lg border p-4">
      <textarea
        placeholder="Compartilhe o que está pensando..."
        className="w-full rounded-2xl border-gray-400 bg-transparent p-3.5 text-white focus:outline-1 focus:outline-white"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="flex items-center gap-2">
        {filePreview && (
          <Image
            src={filePreview}
            alt="file"
            width={100}
            height={100}
            className="rounded-md"
          />
        )}
      </div>
      <div className="flex w-full items-center justify-between">
        <input
          type="file"
          accept="image/*,video/*"
          ref={fileInputRef}
          name="image"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <Button
          size="sm"
          isLoading={isLoading}
          disabled={isLoading}
          variant="tertiary"
          className="flex items-center gap-2"
          onClick={handleImageButtonClick}
        >
          <Image src={ImageIcon} alt="image" width={24} height={24} />
          <p className="font-bold">Image/Video</p>
        </Button>
        <Button
          onClick={handleCreatePost}
          className="ml-auto"
          isLoading={isLoading}
          disabled={isLoading}
          size="sm"
        >
          Publicar
        </Button>
      </div>
    </div>
  );
};

export default CreatePost;
