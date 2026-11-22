import { useState } from "react";
import type { FormEvent } from "react";
import type { CreatePostInput } from "../types/post";

interface PostFormProps {
  onAdd: (input: CreatePostInput) => Promise<boolean>;
  disabled: boolean;
  isSaving: boolean;
}

export function PostForm({
  onAdd,
  disabled,
  isSaving,
}: PostFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [authorId, setAuthorId] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const success = await onAdd({
      title: title.trim(),
      content: content.trim(),
      authorId: Number(authorId),
    });

    if (success) {
      setTitle("");
      setContent("");
    }
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h2>Tambah Post</h2>

      <fieldset disabled={disabled}>
        <label htmlFor="post-title">Judul</label>
        <input
          id="post-title"
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Masukkan judul Post"
          required
        />

        <label htmlFor="post-content">Isi Post</label>
        <textarea
          id="post-content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Tuliskan isi Post"
          rows={4}
        />

        <label htmlFor="post-author">Author ID</label>
        <input
          id="post-author"
          type="number"
          min="1"
          step="1"
          value={authorId}
          onChange={(event) => setAuthorId(event.target.value)}
          placeholder="ID user yang sudah terdaftar"
          required
        />

        <button type="submit">
          {isSaving ? "Menyimpan..." : "Tambah Post"}
        </button>
      </fieldset>
    </form>
  );
}