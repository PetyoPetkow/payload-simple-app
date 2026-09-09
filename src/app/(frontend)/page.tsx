import { headers as getHeaders } from 'next/headers.js'
import Image from 'next/image'
import { getPayload } from 'payload'
import React from 'react'
import { fileURLToPath } from 'url'

import config from '@/payload.config'
import './styles.css'
import { Card } from '@/components/Card'
import { randomBytes } from 'crypto'
import Link from 'next/link'

export default async function HomePage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  const fileURL = `vscode://file/${fileURLToPath(import.meta.url)}`

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 3,
    where: {
      status: { equals: 'published' },
    },
  })

  return (
    <div className="items-center justify-evenly w-full flex flex-col h-[90vh]">
      <div className="text-center items-center flex flex-col">
        <h1 className="max-w-lg">Getting used to payload</h1>
        <div className="text-gray-300 max-w-xl">
          This application was made to get familiar with some of the core concepts of Payload, such
          as fetching data from Local API, routing and pagination.
        </div>
        <Link href="/blog">
          <button className="mt-5 bg-gray-200 px-3 py-1.5 text-sm rounded-md border-2 border-gray-50 text-gray-800 cursor-pointer font-semibold">
            All posts
          </button>
        </Link>
      </div>

      <div className="flex flex-col gap-6 w-2/3 mx-auto">
        <div className="font-semibold text-white text-xl">Recent posts:</div>
        <div className="flex gap-10">
          {posts.docs.map((post, i) => {
            return <Card key={i} post={post} />
          })}
        </div>
      </div>
      <Image fill className="-z-10 object-cover" priority src="/assets/image-hero1.webp" alt="" />
    </div>
  )
}
