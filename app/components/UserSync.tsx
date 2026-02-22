// "use client"

// import { useEffect, useRef } from "react"
// import { useUser } from "@clerk/nextjs"

// export default function UserSync() {
//   const { isSignedIn } = useUser()
//   const synced = useRef(false)

//   useEffect(() => {
//     if (isSignedIn && !synced.current) {
//       synced.current = true
//       fetch("/api/sync-user", { method: "POST" })
//     }
//   }, [isSignedIn])

//   return null
// }
"use client";

import { useEffect, useRef } from "react";
import { useUser } from "@clerk/nextjs";

export default function UserSync() {
  const { isSignedIn } = useUser();
  const synced = useRef(false);

  useEffect(() => {
    if (isSignedIn && !synced.current) {
      synced.current = true;
      fetch("/api/sync-user", {
        method: "POST",
        credentials: "include",
      });
    }
  }, [isSignedIn]);

  return null;
}
