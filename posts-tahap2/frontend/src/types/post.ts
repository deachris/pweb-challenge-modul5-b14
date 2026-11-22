export interface Post {
  id: number;
  title: string;
  content: string | null;
  author: {
    id: number;
    name: string | null;
  };
}

export interface CreatePostInput {
  title: string;
  content: string;
  authorId: number;
}