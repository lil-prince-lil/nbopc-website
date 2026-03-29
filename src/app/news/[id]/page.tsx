'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface Article {
  id: string
  title: string
  summary: string
  content: string
  category: string
  coverImage: string
  author: string
  createdAt: string
}

const GRADIENTS = [
  'from-blue-400 to-indigo-500',
  'from-violet-400 to-purple-500',
  'from-cyan-400 to-blue-500',
  'from-pink-400 to-rose-500',
  'from-emerald-400 to-teal-500',
]

function getCategoryColor(category: string) {
  switch (category) {
    case '社区公告':
      return 'bg-primary/10 text-primary'
    case '行业动态':
      return 'bg-secondary/10 text-secondary'
    case '资讯':
      return 'bg-accent/10 text-amber-400'
    default:
      return 'bg-white/10 text-gray-400'
  }
}

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export default function NewsDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [article, setArticle] = useState<Article | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!id) return
    fetch(`/api/public/articles/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('not found')
        return res.json()
      })
      .then((json) => setArticle(json.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#2857A4] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (notFound || !article) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-400">
        文章未找到
      </div>
    )
  }

  const gradient = GRADIENTS[Math.abs(article.title.length) % GRADIENTS.length]

  return (
    <div>
      {/* Article Header */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16">
        <span
          className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${getCategoryColor(article.category)}`}
        >
          {article.category}
        </span>
        <h1 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight">
          {article.title}
        </h1>
        <div className="mt-4 flex items-center gap-3 text-sm text-gray-400">
          <span>{article.author}</span>
          <span className="w-1 h-1 rounded-full bg-gray-300" />
          <span>{formatDate(article.createdAt)}</span>
        </div>
      </section>

      {/* Cover */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-8">
        {article.coverImage ? (
          <img src={article.coverImage} alt={article.title} className="w-full h-56 sm:h-72 lg:h-80 rounded-2xl object-cover" />
        ) : (
          <div className={`h-56 sm:h-72 lg:h-80 rounded-2xl bg-gradient-to-br ${gradient}`} />
        )}
      </section>

      {/* Article Body */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        {article.content ? (
          <div
            className="prose prose-invert max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        ) : article.summary ? (
          <p className="text-gray-400 leading-relaxed text-base">{article.summary}</p>
        ) : null}
      </section>

      {/* Back link */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="border-t border-white/10 pt-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary transition-colors"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            返回资讯列表
          </Link>
        </div>
      </section>
    </div>
  )
}
