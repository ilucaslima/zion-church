"use client";

import React from "react";

import PostCard from "@/components/PostCard";
import { usePosts } from "@/hooks/usePosts";
import { formatDate } from "@/utils/format-date";
import CreatePost from "@/components/CreatePost";
import Image from "next/image";

const Dashboard = () => {
  const { posts } = usePosts();

  return (
    <div className="m-auto flex min-h-screen max-w-[524px] flex-col items-center gap-4 p-4">
      <Image
        src="/logo.png"
        alt="logo"
        width={250}
        height={250}
        className="py-24"
      />
      <CreatePost />
      {posts.map((post) => {
        return (
          <PostCard
            key={post.id}
            id={post.id}
            authorName={post.authorName}
            authorTime={formatDate(post.createdAt)}
            authorAvatar="https://i.pravatar.cc/"
            postText={post.content}
            likes={post.likes}
            commentsCount={post.comments?.length}
            userAvatar="https://i.pravatar.cc/"
            comments={post.comments}
            postImage={post?.image}
            postName={post?.imageName}
          />
        );
      })}
    </div>
  );
};

export default Dashboard;
