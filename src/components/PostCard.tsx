"use client";

import Image from "next/image";
import {
  Heart,
  MessageSquare,
  Image as ImageIcon,
  Smile,
  Loader2,
} from "lucide-react";
import { IComment } from "@/interfaces/posts";
import { Comments } from "@/components/Comments";
import { usePosts } from "@/hooks/usePosts";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Picker from "@emoji-mart/react";

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
  postImage?: string;
  postName?: string;
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
  postImage,
  postName,
}: PostCardProps) {
  const [comment, setComment] = useState<string | null>(null);
  const { createComment, likePost, posts, unlikePost } = usePosts();
  const { user } = useAuth();
  const [file, setFile] = useState<File | undefined>(undefined);
  const [filePreview, setFilePreview] = useState<string | undefined>(undefined);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const commentInputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!comment?.length) return;
    if (e.key === "Enter") {
      handleCreateComment(comment);
    }
  };

  useEffect(() => {
    if (file) {
      setFilePreview(URL.createObjectURL(file));
    }
  }, [file]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      setFilePreview(URL.createObjectURL(file));
    }
  };

  const handleImageButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleCreateComment = async (comment: string) => {
    setIsLoading(true);
    await createComment({ comment, id, file });
    setComment(null);
    setFile(undefined);
    setFilePreview(undefined);
    setIsLoading(false);
  };

  const likesByUsers = posts
    .filter((post) => post.id === id)
    .map((post) => post.likedBy);

  const isLikedByUser = JSON.stringify(likesByUsers).includes(
    user?.id as string,
  );

  const handleEmojiSelect = (emoji: unknown) => {
    setComment(
      (prev) => (prev || "") + ((emoji as { native: string }).native || ""),
    );
    setShowEmojiPicker(false);
    commentInputRef.current?.focus();
  };

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
      {postImage && (
        <div className="mb-4">
          <Image
            src={postImage}
            alt={postName || "Post image"}
            width={500}
            height={500}
          />
        </div>
      )}
      <p className="mb-4 text-left text-gray-300 break-all">{postText}</p>
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
        {comments?.map((comment, index) => (
          <Comments
            key={comment.id}
            comment={comment}
            commentImage={comments[index]?.image}
            commentName={comments[index]?.name}
          />
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

        {isLoading ? (
          <div className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
          </div>
        ) : (
          <div className="bg-background-secondary border-border flex flex-1 items-center rounded-lg border p-3">
            {filePreview && (
              <Image
                src={filePreview}
                alt="file"
                width={30}
                height={30}
                className="rounded-full"
              />
            )}
            <input
              type="text"
              placeholder="Deixe um comentário"
              className="w-full bg-transparent px-2 text-white placeholder-gray-500 focus:outline-none"
              onChange={(e) => setComment(e.target.value)}
              onKeyDown={handleKeyDown}
              value={comment || ""}
              ref={commentInputRef}
            />

            <div className="flex items-center gap-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                name="image"
                className="hidden"
              />
              <button onClick={handleImageButtonClick}>
                <ImageIcon className="h-5 w-5 text-gray-400" />
              </button>

              <Smile
                className="h-5 w-5 cursor-pointer text-gray-400"
                onClick={() => setShowEmojiPicker((v) => !v)}
              />
              {showEmojiPicker && (
                <div className="absolute top-full right-0 z-10 mt-2">
                  <Picker onEmojiSelect={handleEmojiSelect} />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
