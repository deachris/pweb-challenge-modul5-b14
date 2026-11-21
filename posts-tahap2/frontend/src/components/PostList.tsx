import { useEffect, useState } from "react";
import { PostCard } from "./PostCard";

interface Post {
  id: number;
  title: string;
  content: string | null;
  author: { id: number; name: string | null };
}

export function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/posts");
        if (!res.ok) throw new Error("Gagal mengambil data");
        const json = await res.json();
        setPosts(json.data); // Sesuai format sendSuccess() di Modul 4
      } catch (err) {
        setError(err instanceof Error ? err.message : "Terjadi kesalahan");
      } finally {
        setIsLoading(false);
      }
    };
    loadPosts();
  }, []);

  if (isLoading) return <p className="status">Memuat posts...</p>;
  if (error) return <p className="status-error">Error: {error}</p>;
  if (posts.length === 0) return <p className="status">Belum ada post.</p>;

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          title={post.title}
          content={post.content}
          author={post.author?.name ?? "Anonim"}
        />
      ))}
    </div>
  );
}