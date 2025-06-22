import { usePosts } from "@/hooks/usePosts";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "./Button";

const CreatePost = () => {
  const { createPost } = usePosts();
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreatePost = async () => {
    setIsLoading(true);
    if (!content.trim()) return;

    await createPost(content).finally(() => {
      setIsLoading(false);
    });

    setContent("");
    toast.success("Publicado!");
  };

  return (
    <div className="bg-background border-border flex w-full flex-col gap-4 rounded-lg border p-4">
      <textarea
        placeholder="Compartilhe o que está pensando..."
        className="w-full rounded-2xl border-gray-400 bg-transparent p-3.5 text-white focus:outline-1 focus:outline-white"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
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
  );
};

export default CreatePost;
