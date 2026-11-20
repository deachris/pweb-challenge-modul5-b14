import { useState } from "react";
import type { Note } from "../types/note";

interface NoteFormProps {
  onAddNote: (note: Note) => void;
}

export default function NoteForm({ onAddNote }: NoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Kuliah");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Judul tidak boleh kosong!");
      return;
    }

    onAddNote({
      id: crypto.randomUUID(),
      title: title.trim(),
      content: content.trim(),
      category,
    });

    setTitle("");
    setContent("");
    setCategory("Kuliah");
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <input
          type="text"
          placeholder="Judul catatan..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Kuliah">Kuliah</option>
          <option value="Organisasi">Organisasi</option>
          <option value="Pribadi">Pribadi</option>
        </select>
      </div>
      <textarea
        rows={3}
        placeholder="Tulis isi catatanmu di sini..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button type="submit">Tambah Catatan</button>
    </form>
  );
}