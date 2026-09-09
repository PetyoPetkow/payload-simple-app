import { slugField, type CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: 'posts',
  hooks: {
    beforeChange: [
      async ({ data, originalDoc, operation }) => {
        if (operation === 'create') {
          data.createdAt = new Date()
        }

        if (operation === 'update') {
          data.createdAt = originalDoc.createdAt
        }

        return data
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'excerpt', type: 'text' },
    { name: 'content', type: 'richText' },
    { name: 'coverImage', type: 'upload', relationTo: 'media', required: true },
    { name: 'author', type: 'relationship', relationTo: 'users' },
    { name: 'publishedAt', type: 'date', admin: { readOnly: true, condition: () => false } },
    { name: 'status', type: 'select', options: ['draft', 'published'] },
    { name: 'category', type: 'relationship', relationTo: 'categories' },
    slugField(),
  ],
}
