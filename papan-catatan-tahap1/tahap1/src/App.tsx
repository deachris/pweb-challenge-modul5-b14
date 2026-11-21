import { useEffect, useState } from 'react'
import type { Note } from "./types/note";
import NoteForm from "./components/NoteForm";
import NoteCard from "./components/NoteCard";

export default function App() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem("notes");
    return saved ? (JSON.parse(saved) as Note[]) : [];
  });
  const [search, setSearch] = useState("");

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const addNote = (note: Note) => setNotes([...notes, note]);
  const deleteNote = (id: string) => setNotes(notes.filter((note) => note.id !== id));

  const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(search.trim().toLowerCase()),
);

  return (
    <div className="container">
      <div className="top-bar">
        <h2>Papan Catatan</h2>
      </div>
      <div className="main-bar">
        <NoteForm onAddNote={addNote} />
        <input className="search-input" type="text" placeholder="Cari catatan berdasarkan judul..." value={search} onChange={(e) => setSearch(e.target.value)}
      />
      <div className="note-list">
        {filteredNotes.length === 0 ? (
          <p className="status">Belum ada catatan.</p>  
        ) : ( filteredNotes.map((note) => (
          <NoteCard key={note.id} note={note} onDelete={deleteNote}
          />
        ))
        )}
      </div>
      </div>
    </div>
  );
}
