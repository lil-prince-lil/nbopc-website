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

const GRADIENT_BGS = [
  'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)',
  'linear-gradient(135deg, #FED7AA 0%, #FDBA74 100%)',
  'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)',
  'linear-gradient(135deg, #FCE7F3 0%, #FBCFE8 100%)',
  'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)',
]

type CategoryFilter = '全部' | '资讯' | '行业动态' | '社区公告'

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

  const filtered = filter === '全部' ? articles : articles.filter((a) => a.category === filter)
  const categories: CategoryFilter[] = ['全部', '资讯', '行业动态', '社区公告']
  const [featured, ...rest] = filtered

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-white border-b border-gray-100 py-16 sm:py-20">
        <div
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(40, 87, 164, 0.06), transparent 70%)',
          }}
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="eyebrow mb-4">NEWS</div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">专委会动态</h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            发布官方通知、会议纪要、行业动态
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setFilter(c)}
              className={`chip ${filter === c ? 'chip-active' : ''}`}
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
            <div className="card-soft overflow-hidden animate-pulse">
              <div className="md:grid md:grid-cols-2">
                <div className="h-56 bg-gray-100" />
                <div className="p-8 space-y-4">
                  <div className="h-4 bg-gray-100 rounded w-20" />
                  <div className="h-6 bg-gray-100 rounded w-3/4" />
                  <div className="h-4 bg-gray-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-1/3" />
                </div>
              </div>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500">暂无相关资讯</div>
        ) : (
          <div className="space-y-8">
            {/* Featured */}
            {featured && (
              <Link
                href={`/news/${featured.id}`}
                className="group block card-soft overflow-hidden hover:-translate-y-0.5"
              >
                <div className="md:grid md:grid-cols-2">
                  <div className="h-56 md:h-full overflow-hidden">
                    {featured.coverImage ? (
                      <img src={featured.coverImage} alt={featured.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full" style={{ background: GRADIENT_BGS[0] }} />
                    )}
                  </div>
                  <div className="p-6 sm:p-8 flex flex-col justify-center">
                    <span
                      className={`inline-block w-fit text-xs font-semibold px-3 py-1 rounded-full ${getCategoryColor(featured.category)}`}
                    >
                      {featured.category}
                    </span>
                    <h2 className="mt-3 text-xl sm:text-2xl font-bold text-gray-900 group-hover:text-[#2857A4] transition-colors">
                      {featured.title}
                    </h2>
                    <p className="mt-3 text-gray-600 line-clamp-3 leading-relaxed">{featured.summary}</p>
                    <div className="mt-4 flex items-center gap-3 text-sm text-gray-500">
                      <span>{featured.author}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-400" />
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
                  className="group flex flex-col sm:flex-row card-soft overflow-hidden hover:-translate-y-0.5"
                >
                  <div className="h-40 sm:h-auto sm:w-56 lg:w-72 shrink-0 overflow-hidden">
                    {article.coverImage ? (
                      <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full" style={{ background: GRADIENT_BGS[(i + 1) % GRADIENT_BGS.length] }} />
                    )}
                  </div>
                  <div className="p-5 sm:p-6 flex flex-col justify-center">
                    <span
                      className={`inline-block w-fit text-xs font-semibold px-3 py-1 rounded-full ${getCategoryColor(article.category)}`}
                    >
                      {article.category}
                    </span>
                    <h3 className="mt-2 text-lg font-semibold text-gray-900 group-hover:text-[#2857A4] transition-colors">
                      {article.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600 line-clamp-2 leading-relaxed">{article.summary}</p>
                    <div className="mt-3 flex items-center gap-3 text-sm text-gray-500">
                      <span>{article.author}</span>
                      <span className="w-1 h-1 rounded-full bg-gray-400" />
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
