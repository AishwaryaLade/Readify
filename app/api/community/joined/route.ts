// import { NextResponse } from "next/server";
// import { getAuth } from "@clerk/nextjs/server";
// import { writeClient } from "@/lib/sanity.write";

// export async function GET(req: Request) {
//   try {
//     const { userId } = getAuth(req);
//     if (!userId) return NextResponse.json({ joined: false });

//     const communityId = req.nextUrl.searchParams.get("communityId");
//     if (!communityId) return NextResponse.json({ joined: false });

//     const existing = await writeClient.fetch(
//       `*[_type=="communityMember" && userId==$userId && community._ref==$communityId][0]{_id}`,
//       { userId, communityId }
//     );

//     return NextResponse.json({ joined: !!existing });
//   } catch (err) {
//     console.error("Joined API error:", err);
//     return NextResponse.json({ joined: false });
//   }
// }
import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { writeClient } from "@/lib/sanity.write";

export async function GET(req: Request) {
  try {
    const { userId } = getAuth(req);
    if (!userId) return NextResponse.json({ joined: false });

    const communityId = req.nextUrl.searchParams.get("communityId");
    if (!communityId) return NextResponse.json({ joined: false });

    const existing = await writeClient.fetch(
      `*[_type=="communityMember" && userId==$userId && community._ref==$communityId][0]{_id}`,
      { userId, communityId }
    );

    return NextResponse.json({ joined: !!existing });
  } catch (err) {
    console.error("Joined API error:", err);
    return NextResponse.json({ joined: false });
  }
}
