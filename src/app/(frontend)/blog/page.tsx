import { Card } from '@/components/Card'
import Pagination from '@/components/Pagination'
import payloadConfig from '@/payload.config'
import { getPayload } from 'payload'
import { FC } from 'react'

const Page: FC<Args> = async ({ searchParams }) => {
  const payload = await getPayload({ config: payloadConfig })
  const { page = 1 } = await searchParams

  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 3,
    page: Number(page),
    where: {
      status: { equals: 'published' },
    },
  })

  return (
    <div className="flex flex-col justify-between h-full py-10">
      <section className="mb-10 w-2/3 mx-auto">
        <h1 className="text-4xl font-bold">Blog</h1>
        <p className="mt-3 max-w-2xl text-gray-400">
          Thoughts, guides, and practical insights about software development, web technologies, and
          building better applications.
        </p>
      </section>

      <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-10 mx-auto w-2/3">
        {posts.docs.map((post, i) => (
          <Card key={i} post={post} />
        ))}
      </div>
      {posts.totalPages > 1 && (
        <Pagination
          className="flex justify-center m-auto"
          current={Number(page)}
          total={posts.totalPages}
          slug="blog"
        />
      )}
    </div>
  )
}

interface Args {
  searchParams: Promise<{
    page?: string | number
  }>
}

export default Page
