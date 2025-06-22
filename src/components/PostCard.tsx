"use client";

import Image from "next/image";
import { Heart, MessageSquare, Image as ImageIcon, Smile } from "lucide-react";
import { IComment } from "@/interfaces/posts";
import { Comments } from "@/components/Comments";
import { usePosts } from "@/hooks/usePosts";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

interface PostCardProps {
  authorName: string;
  authorTime: string;
  authorAvatar: string;
  postText: string;
  likes: number;
  commentsCount: number;
  userAvatar: string;
  comments: IComment[];
  id: string;
}

export default function PostCard({
  authorName,
  authorTime,
  authorAvatar,
  postText,
  likes,
  commentsCount,
  userAvatar,
  comments,
  id,
}: PostCardProps) {
  const [comment, setComment] = useState<string | null>(null);
  const { createComment, likePost, posts, unlikePost } = usePosts();
  const { user } = useAuth();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!comment?.length) return;
    if (e.key === "Enter") {
      handleCreateComment(comment);
    }
  };

  const handleCreateComment = async (comment: string) => {
    await createComment({ comment, id });
    setComment(null);
  };

  const likesByUsers = posts
    .filter((post) => post.id === id)
    .map((post) => post.likedBy);

  const isLikedByUser = JSON.stringify(likesByUsers).includes(
    user?.id as string,
  );

  return (
    <div className="bg-background mx-auto w-full max-w-lg rounded-2xl border border-[#2A3B4C] p-4 text-white">
      <div className="mb-4 flex items-center">
        <Image
          src={authorAvatar}
          alt={authorName}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="ml-4">
          <p className="text-left text-base font-bold">{authorName}</p>
          <p className="text-left text-sm text-gray-400">{authorTime}</p>
        </div>
      </div>
      <p className="mb-4 text-left text-gray-300">{postText}</p>
      <div className="mb-4 flex items-center gap-6 text-gray-400">
        <div className="flex items-center gap-2">
          <button
            onClick={() => (isLikedByUser ? unlikePost(id) : likePost(id))}
          >
            <Heart
              className={`h-5 w-5 ${isLikedByUser ? "text-red-500" : ""}`}
            />
          </button>
          <span>{likes}</span>
        </div>
        <div className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          <span>{commentsCount}</span>
        </div>
      </div>

      <div className="mb-6 flex w-full flex-col gap-4 text-left">
        {comments?.map((comment) => (
          <Comments key={comment.id} comment={comment} />
        ))}
      </div>

      <div className="flex items-center gap-3">
        <Image
          src={userAvatar}
          alt="Your avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="bg-background-secondary border-border flex flex-1 items-center rounded-lg border p-3">
          <input
            type="text"
            placeholder="Deixe um comentário"
            className="w-full bg-transparent px-2 text-white placeholder-gray-500 focus:outline-none"
            onChange={(e) => setComment(e.target.value)}
            onKeyDown={handleKeyDown}
            value={comment || ""}
          />
          <div className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5 cursor-pointer text-gray-400" />
            <Smile className="h-5 w-5 cursor-pointer text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
}
