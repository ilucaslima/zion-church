import { usePosts } from "@/hooks/usePosts";
import { useState } from "react";
import { toast } from "react-toastify";

const CreatePost = () => {
  const { createPost } = usePosts();
  const [content, setContent] = useState<string>("");

  const handleCreatePost = async () => {
    if (!content.trim()) return;

    await createPost(content);

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
      <button
        onClick={handleCreatePost}
        className="bg-background-quaternary ml-auto rounded-full px-8 py-2 text-sm font-bold text-white"
      >
        Publicar
      </button>
    </div>
  );
};

export default CreatePost;
