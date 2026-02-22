// import { currentUser } from "@clerk/nextjs/server"
// import { NextResponse } from "next/server"
// import { writeClient } from "@/lib/sanity.write"

// export async function POST() {
//   const clerkUser = await currentUser()
//   if (!clerkUser) {
//     return NextResponse.json({ ok: false }, { status: 401 })
//   }

//   const clerkId = clerkUser.id
//   const email = clerkUser.emailAddresses[0]?.emailAddress || ""
//   const name =
//     clerkUser.fullName ||
//     clerkUser.firstName ||
//     email.split("@")[0]

//   // ✅ ID = clerkId (THIS IS THE MAGIC)
//   await writeClient.createIfNotExists({
//     _id: clerkId,
//     _type: "user",
//     clerkId,
//     email,
//     name,
//   })

//   return NextResponse.json({ ok: true })
// }

// import { auth } from '@clerk/nextjs/server'
// import { client } from '@/lib/sanity'
// import { NextResponse } from 'next/server'

// export async function POST() {
//   const { userId } = auth()
//   if (!userId) {
//     return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
//   }

//   // 🔒 check if user already exists
//   const exists = await client.fetch(
//     `*[_type=="user" && _id==$id][0]`,
//     { id: userId }
//   )

//   if (exists) {
//     return NextResponse.json({ message: 'User already exists' })
//   }

//   // ✅ create only once
//   await client.create({
//     _id: userId,          // ⭐ UNIQUE
//     _type: 'user',
//     clerkId: userId,
//     createdAt: new Date().toISOString(),
//   })

//   return NextResponse.json({ success: true })
// }
// import { NextResponse } from "next/server";
// import { getAuth } from "@clerk/nextjs/server";
// import { writeClient } from "@/lib/sanity.write";

// export async function POST(req: Request) {
//   const { userId } = getAuth(req); // ✅ fix

//   if (!userId) {
//     console.log("Sync failed: No userId");
//     return NextResponse.json(
//       { error: "Unauthorized" },
//       { status: 401 }
//     );
//   }

//   await writeClient.createIfNotExists({
//     _id: userId,
//     _type: "user",
//   });

//   console.log("User synced:", userId);
//   return NextResponse.json({ success: true });
// }
// import { NextResponse } from "next/server";
// import { currentUser } from "@clerk/nextjs/server";
// import { writeClient } from "@/lib/sanity.write";

// export async function POST() {
//   const user = await currentUser();

//   if (!user) {
//     console.log("Sync failed: No user");
//     return NextResponse.json(
//       { error: "Unauthorized" },
//       { status: 401 }
//     );
//   }

//   await writeClient.createOrReplace({
//     _id: user.id,
//     _type: "user",
//     username:
//       user.username ||
//       user.firstName ||
//       user.emailAddresses?.[0]?.emailAddress ||
//       "user",
//   });

//   console.log("User synced:", user.id);

//   return NextResponse.json({ success: true });
// }
// import { NextResponse } from "next/server";
// import { currentUser } from "@clerk/nextjs/server";
// import { writeClient } from "@/lib/sanity.write";

// export async function POST() {
//   const user = await currentUser();

//   if (!user) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   await writeClient.createOrReplace({
//     _id: user.id, // IMPORTANT
//     _type: "user",
//     clerkId: user.id,
//     name:
//       user.firstName ||
//       user.username ||
//       "User",
//     email: user.emailAddresses?.[0]?.emailAddress || "",
//   });

//   return NextResponse.json({ success: true });
// }
import { NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { writeClient } from "@/lib/sanity.write";

export async function POST() {
  try {
    const user = await currentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ✅ Only create if not exists (NO DUPLICATE)
    await writeClient.createIfNotExists({
      _id: user.id, // 🔥 MUST be clerk id
      _type: "user",
      clerkId: user.id,
      name: user.firstName || user.username || "User",
      email: user.emailAddresses?.[0]?.emailAddress || "",
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("SYNC USER ERROR:", error);
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

