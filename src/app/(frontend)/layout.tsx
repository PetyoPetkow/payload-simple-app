import React from 'react'
import './styles.css'
import './globals.css'
import Link from 'next/link'

export const metadata = {
  description: 'A blank template using Payload in a Next.js app.',
  title: 'Payload Blank Template',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en">
      <body>
        <div className="h-screen flex flex-col">
          <div className="flex justify-end w-full py-4 px-10 font-bold gap-10 h-16 shrink-0">
            <Link href="/">Home</Link>
            <Link href="/blog">Blog</Link>
          </div>
          <main className="flex-1 min-h-0 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  )
}
