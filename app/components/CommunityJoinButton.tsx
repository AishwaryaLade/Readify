// "use client";

// import { useEffect, useState } from "react";

// interface JoinButtonProps {
//   communityId: string;
// }

// export default function JoinButton({ communityId }: JoinButtonProps) {
//   const [joined, setJoined] = useState(false);
//   const [loading, setLoading] = useState(true);

//   // Check if user joined
//   useEffect(() => {
//     async function checkMembership() {
//       try {
//         const res = await fetch(`/api/community/joined?communityId=${communityId}`, {
//           credentials: "include", // ✅ Send Clerk cookie
//         });
//         const data = await res.json();
//         setJoined(data.joined || false);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     checkMembership();
//   }, [communityId]);

//   async function handleJoin() {
//     setLoading(true);
//     try {
//       const res = await fetch("/api/community/join", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include", // ✅ Send Clerk cookie
//         body: JSON.stringify({ communityId }),
//       });
//       const data = await res.json();
//       if (data.success) setJoined(true);
//       else console.log(data.message);
//     } catch (err) {
//       console.error("Join error:", err);
//     } finally {
//       setLoading(false);
//     }
//   }

//   if (loading)
//     return <button disabled className="bg-gray-400 px-3 py-1 rounded">Loading...</button>;

//   return joined ? (
//     <button className="bg-red-600 px-3 py-1 rounded text-white">Joined</button>
//   ) : (
//     <button onClick={handleJoin} className="bg-blue-600 px-3 py-1 rounded text-white">
//       Join
//     </button>
//   );
// }
"use client";

import { useEffect, useState } from "react";

interface JoinButtonProps {
  communityId: string;
}

export default function JoinButton({ communityId }: JoinButtonProps) {
  const [joined, setJoined] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check membership on load
  useEffect(() => {
    async function checkMembership() {
      try {
        const res = await fetch(`/api/community/joined?communityId=${communityId}`, {
          credentials: "include",
        });
        const data = await res.json();
        setJoined(data.joined || false);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    checkMembership();
  }, [communityId]);

  // Join
  async function handleJoin() {
    setLoading(true);
    try {
      const res = await fetch("/api/community/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ communityId }),
      });
      const data = await res.json();
      if (data.success) setJoined(true);
      else console.log(data.message);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // Leave
  async function handleLeave() {
    setLoading(true);
    try {
      const res = await fetch("/api/community/leave", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ communityId }),
      });
      const data = await res.json();
      if (data.success) setJoined(false);
      else console.log(data.message);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (loading)
    return <button disabled className="bg-gray-400 px-3 py-1 rounded">Loading...</button>;

  return joined ? (
    <button onClick={handleLeave} className="bg-red-600 px-3 py-1 rounded text-white">
      Leave
    </button>
  ) : (
    <button onClick={handleJoin} className="bg-blue-600 px-3 py-1 rounded text-white">
      Join
    </button>
  );
}
