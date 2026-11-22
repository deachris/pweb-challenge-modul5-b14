import { useEffect, useState } from "react";
import { PostCard } from "./PostCard";
import { PostForm } from "./PostForm";
import type { CreatePostInput, Post } from "../types/post";

const API_URL = "http://localhost:3000/api/posts";

export function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const isBusy = isSaving || deletingId !== null;

  // GET: mengambil daftar Post dan melakukan pencarian.
  useEffect(() => {
    const controller = new AbortController();

    async function loadPosts() {
      setIsLoading(true);
      setError(null);

      try {
        const keyword = encodeURIComponent(search.trim());

        const response = await fetch(
          `${API_URL}?search=${keyword}`,
          { signal: controller.signal },
        );

        if (!response.ok) {
          throw new Error("Gagal mengambil daftar Post dari server.");
        }

        const json = await response.json();
        setPosts(json.data);
      } catch (err) {
        if (controller.signal.aborted) return;

        setPosts([]);
        setError(
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan saat mengambil Post.",
        );
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadPosts();

    return () => controller.abort();
  }, [search]);

  // POST: menambahkan Post baru.
  async function handleAdd(input: CreatePostInput): Promise<boolean> {
    setError(null);
    setIsSaving(true);

    try {
      if (!input.title) {
        throw new Error("Judul tidak boleh kosong atau hanya spasi.");
      }

      if (!Number.isInteger(input.authorId) || input.authorId < 1) {
        throw new Error("Author ID harus berupa bilangan bulat positif.");
      }

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message || "Gagal menambahkan Post.");
      }

      setPosts((previous) => [json.data, ...previous]);

      // Kosongkan pencarian agar Post baru terlihat.
      setSearch("");

      return true;
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat menambahkan Post.",
      );

      return false;
    } finally {
      setIsSaving(false);
    }
  }

  // DELETE: menghapus Post berdasarkan ID.
  async function handleDelete(id: number) {
    if (!window.confirm("Hapus Post ini?")) return;

    setError(null);
    setDeletingId(id);

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const json = await response.json();
        throw new Error(json.message || "Gagal menghapus Post.");
      }

      setPosts((previous) =>
        previous.filter((post) => post.id !== id),
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Terjadi kesalahan saat menghapus Post.",
      );
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <>
      <PostForm
        onAdd={handleAdd}
        disabled={isBusy || isLoading}
        isSaving={isSaving}
      />

      <div className="search-box">
        <label htmlFor="post-search">
          Cari Post berdasarkan judul
        </label>

        <input
          id="post-search"
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Contoh: React"
          disabled={isBusy}
        />
      </div>

      {error && (
        <p className="status-error" role="alert">
          {error}
        </p>
      )}

      {isLoading ? (
        <p className="status">Memuat Post...</p>
      ) : (
        <div className="post-list">
          {!error && posts.length === 0 && (
            <p className="status">
              {search.trim()
                ? "Tidak ada Post yang cocok."
                : "Belum ada Post."}
            </p>
          )}

          {posts.map((post) => (
            <PostCard
              key={post.id}
              title={post.title}
              content={post.content}
              author={post.author?.name ?? "Anonim"}
              onDelete={() => handleDelete(post.id)}
              disabled={isBusy || isLoading}
              isDeleting={deletingId === post.id}
            />
          ))}
        </div>
      )}
    </>
  );
}