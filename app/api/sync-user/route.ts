
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

