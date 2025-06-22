"use client";

import React from "react";

import PostCard from "@/components/PostCard";
import { usePosts } from "@/hooks/usePosts";
import { formatDate } from "@/utils/format-date";

const Dashboard = () => {
  const { posts } = usePosts();

  return (
    <div className="flex min-h-screen flex-col items-center gap-4 p-4">
      {posts.map((post) => {
        return (
          <PostCard
            key={post.id}
            id={post.id}
            authorName={"Lucas Lima"}
            authorTime={formatDate(post.createdAt)}
            authorAvatar="https://i.pravatar.cc/"
            postText={post.content}
            likes={post.likes}
            commentsCount={post.comments?.length}
            userAvatar="https://i.pravatar.cc/"
            comments={post.comments}
          />
        );
      })}
    </div>
  );
};

export default Dashboard;
