import payloadConfig from '@/payload.config'
import { RichText } from '@payloadcms/richtext-lexical/react'
import Image from 'next/image'
import { getPayload } from 'payload'
import { FC } from 'react'

const Page: FC<Args> = async ({ params }) => {
  const { slug = '' } = await params
  const payload = await getPayload({ config: payloadConfig })

  const postQuery = await payload.find({
    collection: 'posts',
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const post = postQuery.docs[0]

  const publishDate = post.publishedAt
    ? new Intl.DateTimeFormat('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }).format(new Date(post.publishedAt))
    : null

  const author = typeof post.author !== 'number' && post.author ? post.author.email : null

  return (
    <div>
      <div className="relative h-[800px]">
        {typeof post.coverImage !== 'number' && (
          <Image
            fill
            src={post.coverImage.url ?? ''}
            alt={post.coverImage.alt || post.title}
            className="object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-linear-to-b from-transparent via-black/70 to-black">
          <div className="w-1/3 m-auto flex flex-col gap-3">
            <h2 className="text-5xl max-w-5/6 drop-shadow-lg">{post.title}</h2>
            <div className="flex flex-col">
              {publishDate && <div className="text-sm">Published {publishDate}</div>}
              {author && <div className="text-sm">By {author}</div>}
            </div>
          </div>
        </div>
      </div>
      <div className="w-1/3 m-auto">{post.content && <RichText data={post.content} />}</div>
    </div>
  )
}

interface Args {
  params: Promise<{ slug?: string }>
}

export default Page
