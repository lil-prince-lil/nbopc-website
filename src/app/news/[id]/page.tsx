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

const GRADIENT_BGS = [
  'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)',
  'linear-gradient(135deg, #FED7AA 0%, #FDBA74 100%)',
  'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)',
  'linear-gradient(135deg, #FCE7F3 0%, #FBCFE8 100%)',
  'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)',
]

function getCategoryColor(category: string) {
  switch (category) {
    case '社区公告':
      return 'bg-[#2857A4]/5 text-[#2857A4] border border-[#2857A4]/30'
    case '行业动态':
      return 'bg-emerald-50 text-emerald-700 border border-emerald-200'
    case '资讯':
      return 'bg-[#FF8C00]/5 text-[#FF8C00] border border-[#FF8C00]/30'
    default:
      return 'bg-gray-50 text-gray-500 border border-gray-200'
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
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <div className="w-8 h-8 border-2 border-[#2857A4] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (notFound || !article) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500 bg-gray-50">
        文章未找到
      </div>
    )
  }

  const bg = GRADIENT_BGS[Math.abs(article.title.length) % GRADIENT_BGS.length]

  return (
    <div className="bg-gray-50 min-h-screen">
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-10 sm:pt-16">
        <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${getCategoryColor(article.category)}`}>
          {article.category}
        </span>
        <h1 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
          {article.title}
        </h1>
        <div className="mt-4 flex items-center gap-3 text-sm text-gray-500">
          <span>{article.author}</span>
          <span className="w-1 h-1 rounded-full bg-gray-400" />
          <span>{formatDate(article.createdAt)}</span>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 mt-8">
        {article.coverImage ? (
          <img
            src={article.coverImage}
            alt={article.title}
            className="w-full h-56 sm:h-72 lg:h-80 rounded-2xl object-cover ring-1 ring-gray-100"
          />
        ) : (
          <div className="h-56 sm:h-72 lg:h-80 rounded-2xl ring-1 ring-gray-100" style={{ background: bg }} />
        )}
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-10">
        {article.content ? (
          <div className="prose max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: article.content }} />
        ) : article.summary ? (
          <p className="text-gray-700 leading-relaxed text-base">{article.summary}</p>
        ) : null}
      </section>

      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="border-t border-gray-100 pt-8">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#2857A4] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            返回资讯列表
          </Link>
        </div>
      </section>
    </div>
  )
}
