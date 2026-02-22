// type Post = {
//   _id: string;
//   title: string;
//   imageUrl?: string;
// };

// export default async function TrendingPage() {
//   const res = await fetch("http://localhost:3000/api/trending", {
//     cache: "no-store",
//   });

//   const posts: Post[] = await res.json();

//   if (posts.length === 0) {
//     return <p className="text-neutral-400">No trending posts</p>;
//   }

//   return (
//     <div className="p-4 space-y-6">
//       {posts.map((post) => (
//         <div
//           key={post._id}
//           className="border border-neutral-800 rounded-lg p-4"
//         >
//           <h2 className="text-lg font-semibold">{post.title}</h2>

//           {post.imageUrl && (
//             <img
//               src={post.imageUrl}
//               alt={post.title}
//               className="mt-3 rounded-md max-h-[400px] w-full object-cover"
//             />
//           )}
//         </div>
//       ))}
//     </div>
//   );
// }
// type Post = {
//   _id: string;
//   title: string;
//   imageUrl?: string;
// };

// export default async function TrendingPage() {
//   const res = await fetch("http://localhost:3000/api/trending", {
//     cache: "no-store",
//   });

//   const posts: Post[] = await res.json();

//   return (
//     <div className="p-6 max-w-3xl mx-auto space-y-6">
//       {posts.map((post) => (
//         <div
//           key={post._id}
//           className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden transition hover:shadow-lg"
//         >
//           {/* IMAGE */}
//           {post.imageUrl && (
//             <div className="bg-black flex items-center justify-center max-h-[420px]">
//               <img
//                 src={post.imageUrl}
//                 alt={post.title}
//                 className="w-full max-h-[420px] object-contain"
//               />
//             </div>
//           )}

//           {/* TEXT */}
//           <div className="p-4">
//             <h2 className="text-lg font-semibold text-white">
//               {post.title}
//             </h2>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

"use client";

import { useEffect, useState } from "react";

type Post = {
  _id: string;
  title: string;
  imageUrl: string;
  likes: number;
};

export default function TrendingPage() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch("/api/trending")
      .then((res) => res.json())
      .then(setPosts);
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        🔥 Trending Posts
      </h1>

      {posts.map((post, index) => (
        <div
          key={post._id}
          className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden"
        >
          {/* IMAGE */}
          <div className="bg-black flex items-center justify-center max-h-[420px]">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-[420px] object-contain"
            />
          </div>

          {/* CONTENT */}
          <div className="p-4 space-y-2">
            <div className="flex justify-between text-sm text-neutral-400">
              <span className="text-orange-400 font-semibold">
                #{index + 1} Trending
              </span>
              <span>❤️ {post.likes} likes · last 7 days</span>
            </div>

            <h2 className="text-lg font-semibold">
              {post.title}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
}
