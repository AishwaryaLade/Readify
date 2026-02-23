
type Post = {
  _id: string;
  title: string;
  imageUrl?: string;
  likes: number;
};

export default async function PopularPage() {
  const res = await fetch("http://localhost:3000/api/popular", {
    cache: "no-store",
  });

  const posts: Post[] = await res.json();

  return (
    <div className="p-6 space-y-8 max-w-3xl mx-auto">

      {/* 🔥 PAGE HEADLINE */}
      <h1 className="text-2xl font-bold text-white flex items-center gap-2">
        🔥 Popular Posts
      </h1>

      {posts.map((post, index) => (
        <div
          key={post._id}
          className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition"
        >
          {/* IMAGE */}
          {post.imageUrl && (
            <div className="bg-black flex items-center justify-center max-h-[420px]">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full max-h-[420px] object-contain"
              />
            </div>
          )}

          {/* CONTENT */}
          <div className="p-4 space-y-2">
            {/* 🏷️ RANK + TITLE */}
            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="text-orange-400 font-bold">
                #{index + 1}
              </span>
              {post.title}
            </h2>

            <p className="text-sm text-neutral-400">
              ❤️ {post.likes} likes
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
