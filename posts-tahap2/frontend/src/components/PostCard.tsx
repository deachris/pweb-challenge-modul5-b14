interface PostCardProps {
  title: string;
  author: string;
  content?: string | null; // opsional
}

export function PostCard({ title, author, content = 0 }: PostCardProps) {
  return (
    <article className="post-card">
      <h3>{title}</h3>
      {content && 
      <p>{content}</p>}
      <small>Dibuat oleh {author}</small>
    </article>
  );
}