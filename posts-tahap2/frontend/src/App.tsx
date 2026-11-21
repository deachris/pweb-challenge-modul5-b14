import { PostList } from "./components/PostList";

export default function App() {
  return (
    <div className="page">
      <header className="page-header">
        <h1>Daftar Post</h1>
      </header>
      <PostList />
    </div>
  );
}