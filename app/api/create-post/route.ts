
import { NextRequest, NextResponse } from 'next/server'
import { currentUser } from '@clerk/nextjs/server'
import { writeClient } from '@/lib/sanity.write'

export async function POST(req: NextRequest) {
  try {
    const user = await currentUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const formData = await req.formData()
    const title = formData.get('title')?.toString() || ''
    const content = formData.get('content')?.toString() || ''
    const communityId = formData.get('communityId')?.toString() || ''
    const media = formData.get('media') as File | null

    // Check if user joined community
    const joined = await writeClient.fetch(
      `count(*[_type=="communityMember" && userId==$userId && community._ref==$communityId])>0`,
      { userId: user.id, communityId }
    )
    if (!joined) return NextResponse.json({ error: 'Join community first' }, { status: 403 })

    let mediaRef
    if (media && media.size > 0 && media.type.startsWith('image/')) {
      const uploaded = await writeClient.assets.upload('image', media, { filename: media.name })
      mediaRef = { _type: 'image', asset: { _type: 'reference', _ref: uploaded._id } }
    }

    // Create post
    await writeClient.create({
      _type: 'post',
      title,
      content,
      author: { _type: 'reference', _ref: user.id }, // Make sure user doc exists in Sanity
      community: { _type: 'reference', _ref: communityId },
      score: 0,
      media: mediaRef,
    })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('CREATE POST ERROR:', err)
    return NextResponse.json({ error: 'Failed', status: 500 })
  }
}