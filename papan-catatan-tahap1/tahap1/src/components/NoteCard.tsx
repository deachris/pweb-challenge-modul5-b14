import type { Note } from "../types/note";

interface NoteCardProps {
  note: Note;
  onDelete: (id: string) => void;
}

export default function NoteCard({ note, onDelete }: NoteCardProps) {
  return (
    <div className="note-card">
      <div className="note-info">
        <div className="note-header">
          <strong>{note.title}</strong>
          <span className="badge">{note.category}</span>
        </div>
        {note.content && <p>{note.content}</p>}
      </div>
      <button className="delete-btn" onClick={() => onDelete(note.id)}>
        Hapus
      </button>
    </div>
  );
}