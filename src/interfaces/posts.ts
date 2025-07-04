export interface IPost {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  authorId: string;
  likes: number;
  likedBy: string[];
  comments: IComment[];
  authorName: string;
  image?: string;
  imageName?: string;
}

export interface IComment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  postId: string;
  authorId: string;
  name: string;
  image?: string;
  imageName?: string;
}
