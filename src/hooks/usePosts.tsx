"use client";

import { IPost } from "@/interfaces/posts";
import { api } from "@/services/api";
import { createContext, useContext, useEffect, useState } from "react";

import { AppError } from "./AppError";
import { useAuth } from "./useAuth";

interface IPostsContextType {
  posts: IPost[];
  createPost: (content: string, file?: File) => Promise<void>;
  createComment: ({
    comment,
    id,
  }: {
    comment: string;
    id: string;
    file?: File;
  }) => Promise<void>;
  likePost: (id: string) => Promise<void>;
  unlikePost: (id: string) => Promise<void>;
  setPosts: (posts: IPost[] | ((prevPosts: IPost[]) => IPost[])) => void;
}

const PostsContext = createContext<IPostsContextType>({} as IPostsContextType);

export const PostsProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    api
      .get("/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        if (AppError.isAxiosError(error)) {
          throw error;
        }

        throw AppError.internalServerError("Erro ao buscar posts");
      });
  }, [user]);

  const createPost = async (content: string, file?: File) => {
    try {
      const formData = new FormData();
      formData.append("content", content);
      if (file) {
        formData.append("image", file);
      }
      const response = await api.post("/posts", formData);
      setPosts([response.data, ...posts]);
    } catch (error) {
      if (AppError.isAxiosError(error)) {
        throw error;
      }

      throw AppError.internalServerError("Erro ao criar post");
    }
  };

  const createComment = async ({
    comment,
    id,
    file,
  }: {
    comment: string;
    id: string;
    file?: File;
  }) => {
    try {
      const formData = new FormData();
      formData.append("content", comment);

      if (file) {
        formData.append("image", file);
      }
      const response = await api.post(`/posts/comment/${id}`, formData);

      const newComment = response.data;

      setPosts((currentPosts) =>
        currentPosts.map((post) => {
          if (post.id === id) {
            return {
              ...post,
              comments: [...(post.comments || []), newComment],
            };
          }
          return post;
        }),
      );
    } catch (error) {
      if (AppError.isAxiosError(error)) {
        throw error;
      }
      throw AppError.internalServerError("Erro ao criar comentário");
    }
  };

  const likePost = async (id: string) => {
    try {
      await api.get(`/posts/like/${id}`);
      setPosts((currentPosts) =>
        currentPosts.map((post) => {
          if (post.id === id) {
            return {
              ...post,
              likedBy: [...(post.likedBy || []), user?.id as string],
              likes: post.likes + 1,
            };
          }
          return post;
        }),
      );
    } catch (error) {
      if (AppError.isAxiosError(error)) {
        throw error;
      }
      throw AppError.internalServerError("Erro ao curtir post");
    }
  };

  const unlikePost = async (id: string) => {
    try {
      await api.get(`/posts/unlike/${id}`);
      setPosts((currentPosts) =>
        currentPosts.map((post) => {
          if (post.id === id) {
            return {
              ...post,
              likedBy: post.likedBy.filter((id) => id !== user?.id),
              likes: post.likes - 1,
            };
          }
          return post;
        }),
      );
    } catch (error) {
      if (AppError.isAxiosError(error)) {
        throw error;
      }
      throw AppError.internalServerError("Erro ao descurtir post");
    }
  };

  return (
    <PostsContext.Provider
      value={{
        posts,
        createPost,
        createComment,
        likePost,
        unlikePost,
        setPosts,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
};

export const usePosts = () => {
  return useContext(PostsContext);
};
