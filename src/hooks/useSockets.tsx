"use client";

import { useEffect } from "react";
import { getSocket } from "@/services/socket";
import { usePosts } from "./usePosts";
import { IComment, IPost } from "@/interfaces/posts";
import { useAuth } from "./useAuth";

let listenersAdded = false;

export const useSocketEvents = () => {
  const { setPosts, posts } = usePosts();
  const { user } = useAuth();

  useEffect(() => {
    if (listenersAdded) return;

    const socket = getSocket();

    socket.on("new-post", (post: IPost) => {
      setPosts((prevPosts) => [post, ...prevPosts]);
    });

    socket.on(
      "post-liked",
      ({
        postId,
        likes,
        likedBy,
        userId,
      }: {
        postId: string;
        likes: number;
        likedBy: string;
        userId: string;
      }) => {
        const post = posts.find((post) => post.id === postId);

        if (!post) return;
        if (userId === user?.id) return;

        const newPost = {
          ...post,
          likes,
          likedBy,
        };

        setPosts((prevPosts: IPost[]) => {
          const newPosts = prevPosts.map((currentPost: IPost) =>
            currentPost.id === postId ? newPost : currentPost,
          );
          return newPosts;
        });
      },
    );

    socket.on("post-unliked", ({ postId, likes, likedBy, userId }) => {
      const post = posts.find((post) => post.id === postId);

      if (!post) return;
      if (userId === user?.id) return;

      const newPost = {
        ...post,
        likes,
        likedBy,
      };

      setPosts((prevPosts: IPost[]) => {
        const newPosts = prevPosts.map((currentPost: IPost) =>
          currentPost.id === postId ? newPost : currentPost,
        );
        return newPosts;
      });
    });

    socket.on(
      "new-comment",
      ({
        postId,
        comment,
        userId,
      }: {
        postId: string;
        comment: IComment;
        userId: string;
      }) => {
        if (userId === user?.id) return;

        setPosts((prevPosts: IPost[]) => {
          const newPosts = prevPosts.map((currentPost: IPost) =>
            currentPost.id === postId
              ? { ...currentPost, comments: [...currentPost.comments, comment] }
              : currentPost,
          );
          console.log(newPosts);
          return newPosts;
        });
      },
    );

    listenersAdded = true;

    return () => {
      socket.off("new-post");
      socket.off("post-liked");
      socket.off("post-unliked");
      socket.off("new-comment");
      listenersAdded = false;
    };
  }, [setPosts, posts, user]);
};
