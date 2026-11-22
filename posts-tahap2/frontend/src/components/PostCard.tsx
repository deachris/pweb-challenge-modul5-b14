interface PostCardProps {
  title: string;
  author: string;
  content?: string | null;
  onDelete: () => void;
  disabled: boolean;
  isDeleting: boolean;
}

export function PostCard({
  title,
  author,
  content,
  onDelete,
  disabled,
  isDeleting,
}: PostCardProps) {
  return (
    <article className="post-card">
      <h3>{title}</h3>

      {content && <p>{content}</p>}

      <small>Dibuat oleh {author}</small>

      <button
        type="button"
        className="delete-button"
        onClick={onDelete}
        disabled={disabled}
      >
        {isDeleting ? "Menghapus..." : "Hapus"}
      </button>
    </article>
  );
}