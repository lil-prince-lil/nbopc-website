'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Article {
  id: string
  title: string
  summary: string
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

type CategoryFilter = '全部' | '资讯' | '行业动态' | '社区公告'

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

export default function NewsPage() {
  const [filter, setFilter] = useState<CategoryFilter>('全部')
  const [articles, setArticles] = useState<Article[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/public/articles')
      .then((res) => res.json())
      .then((json) => setArticles(json.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered =
    filter === '全部'
      ? articles
      : articles.filter((a) => a.category === filter)

  const categories: CategoryFilter[] = [
    '全部',
    '资讯',
    '行业动态',
    '社区公告',
  ]

  const [featured, ...rest] = filtered

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-dark via-slate-900 to-primary/80 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            资讯
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            了解社区最新动态与行业洞察
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-colors ${
                filter === c
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Articles */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 pb-20">
        {loading ? (
          <div className="space-y-8">
            <div className="bg-[#132238] rounded-2xl border border-white/10 overflow-hidden animate-pulse">
              <div className="md:grid md:grid-cols-2">
                <div className="h-56 bg-white/5" />
                <div className="p-8 space-y-4">
                  <div className="h-4 bg-white/5 rounded w-20" />
                  <div className="h-6 bg-white/5 rounded w-3/4" />
                  <div className="h-4 bg-white/5 rounded w-full" />
                  <div className="h-3 bg-white/5 rounded w-1/3" />
                </div>
              </div>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">暂无相关资讯</div>
        ) : (
          <div className="space-y-8">
            {/* Featured Card */}
            {featured && (
              <Link
                href={`/news/${featured.id}`}
                className="group block bg-[#132238] rounded-2xl shadow-sm border border-white/10 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="md:grid md:grid-cols-2">
                  <div className="h-56 md:h-full overflow-hidden">
                    {featured.coverImage ? (
                      <img src={featured.coverImage} alt={featured.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${GRADIENTS[0]}`} />
                    )}
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col justify-center">
                    <span
                      className={`inline-block w-fit text-xs font-semibold px-3 py-1 rounded-full ${getCategoryColor(featured.category)}`}
                    >
                      {featured.category}
                    </span>
                    <h2 className="mt-3 text-xl sm:text-2xl font-bold text-white group-hover:text-primary transition-colors">
                      {featured.title}
                    </h2>
                    <p className="mt-3 text-gray-400 line-clamp-3">
                      {featured.summary}
                    </p>
                    <div className="mt-4 flex items-center gap-3 text-sm text-gray-400">
                      <span>{featured.author}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <span>{formatDate(featured.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </Link>
            )}

            {/* Smaller Cards */}
            <div className="space-y-4">
              {rest.map((article, i) => (
                <Link
                  key={article.id}
                  href={`/news/${article.id}`}
                  className="group flex flex-col sm:flex-row bg-[#132238] rounded-2xl shadow-sm border border-white/10 overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                >
                  <div className="h-40 sm:h-auto sm:w-56 lg:w-72 shrink-0 overflow-hidden">
                    {article.coverImage ? (
                      <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${GRADIENTS[(i + 1) % GRADIENTS.length]}`} />
                    )}
                  </div>
                  <div className="p-5 sm:p-6 flex flex-col justify-center">
                    <span
                      className={`inline-block w-fit text-xs font-semibold px-3 py-1 rounded-full ${getCategoryColor(article.category)}`}
                    >
                      {article.category}
                    </span>
                    <h3 className="mt-2 text-lg font-bold text-white group-hover:text-primary transition-colors">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-400 line-clamp-2">
                      {article.summary}
                    </p>
                    <div className="mt-3 flex items-center gap-3 text-sm text-gray-400">
                      <span>{article.author}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <span>{formatDate(article.createdAt)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
