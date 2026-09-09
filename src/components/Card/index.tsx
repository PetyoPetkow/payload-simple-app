import { Post } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { FC } from 'react'

export const Card: FC<CardProps> = ({ post }) => {
  const category = typeof post.category !== 'number' && post.category ? post.category.name : null
  const publishDate = post.publishedAt
    ? new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(new Date(post.publishedAt))
    : null

  return (
    <Link
      className="w-full overflow-hidden rounded-lg border border-gray-500 flex flex-col cursor-pointer bg-[#0f0f0f]"
      href={`blog/${post.slug}`}
    >
      {post.coverImage && typeof post.coverImage !== 'number' ? (
        <div className="relative h-72 w-full">
          <Image
            src={post.coverImage.url ?? ''}
            alt={post.coverImage.alt || post.title}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="h-72 w-full" />
      )}

      <div className="flex flex-col gap-2 p-4">
        <div className="text-gray-400 text-sm">
          {category} {category && publishDate && `• ${publishDate}`}
        </div>

        <h2 className="text-lg font-semibold">{post.title}</h2>

        {post.excerpt && <div className="line-clamp-2">{post.excerpt}</div>}
      </div>
    </Link>
  )
}

interface CardProps {
  post: Post
}
