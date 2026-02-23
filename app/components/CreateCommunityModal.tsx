
'use client'

import { useState } from 'react'

export default function CreateCommunityForm() {
  const [name, setName] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')
  const [image, setImage] = useState<File | null>(null)

  function generateSlug(value: string) {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    const formData = new FormData()
    formData.append('name', name)
    formData.append('slug', slug)
    formData.append('description', description)
    if (image) formData.append('image', image)

    await fetch('/api/community', {
      method: 'POST',
      body: formData,
    })
  }

  return (
    <div className=" shadow-lg relative w-full max-w-2xl rounded-2xl bg-neutral-900 p-8 text-white min-h-[520px]">

      <h2 className="text-xl font-semibold mb-4">Create Community</h2>

      <form onSubmit={handleSubmit} className="space-y-9">
        <input
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            setSlug(generateSlug(e.target.value))
          }}
          className="w-full rounded bg-zinc-800 px-3 py-3"
          placeholder="Community name"
          required
        />

        <input
          value={slug}
          onChange={(e) => setSlug(generateSlug(e.target.value))}
          className="w-full rounded bg-zinc-800 px-3 py-2"
          placeholder="community-slug"
          required
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full rounded bg-zinc-800 px-3 py-2"
          placeholder="Description"
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
        />

        <button className="w-full rounded bg-teal-600 py-3">
          Create Community
        </button>
      </form>
    </div>
  )
}

