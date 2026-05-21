'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Activity {
  id: string
  title: string
  date: string
  location: string
  summary: string
  status: string
  coverImage: string
}

const GRADIENT_BGS = [
  'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)',
  'linear-gradient(135deg, #FED7AA 0%, #FDBA74 100%)',
  'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)',
  'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)',
  'linear-gradient(135deg, #FCE7F3 0%, #FBCFE8 100%)',
  'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
]

type FilterType = '全部' | 'upcoming' | 'ended'

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  return `${d.getMonth() + 1}月${d.getDate()}日`
}

const filterLabels: Record<FilterType, string> = {
  '全部': '全部',
  upcoming: '即将举办',
  ended: '已结束',
}

export default function ActivitiesPage() {
  const [filter, setFilter] = useState<FilterType>('全部')
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/public/activities')
      .then((res) => res.json())
      .then((json) => setActivities(json.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered =
    filter === '全部' ? activities : activities.filter((a) => a.status === filter)
  const filters: FilterType[] = ['全部', 'upcoming', 'ended']

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
          <div className="eyebrow mb-4">EVENTS</div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">活动</h1>
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            探索 AI 领域的前沿思想与实践
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex gap-2 flex-wrap">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              className={`chip ${filter === f ? 'chip-active' : ''}`}
            >
              {filterLabels[f]}
            </button>
          ))}
        </div>
      </section>

      {/* Cards Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 pb-20">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-soft overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-100" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-100 rounded w-3/4" />
                  <div className="h-4 bg-gray-100 rounded w-1/2" />
                  <div className="h-3 bg-gray-100 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((activity, i) => (
                <Link
                  key={activity.id}
                  href={`/activities/${activity.id}`}
                  className="group card-soft overflow-hidden hover:-translate-y-1 block"
                >
                  <div className="relative h-48 overflow-hidden bg-gray-50">
                    {activity.coverImage ? (
                      <img
                        src={activity.coverImage}
                        alt={activity.title}
                        className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div
                        className="absolute inset-0"
                        style={{ background: GRADIENT_BGS[i % GRADIENT_BGS.length] }}
                      />
                    )}
                    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-900 px-3 py-1.5 rounded-lg shadow-sm">
                      {formatDate(activity.date)}
                    </span>
                    <span
                      className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1.5 rounded-lg backdrop-blur-sm ${
                        activity.status === 'upcoming'
                          ? 'bg-[#FF8C00] text-white shadow-sm'
                          : 'bg-white/90 text-gray-500 shadow-sm'
                      }`}
                    >
                      {activity.status === 'upcoming' ? '即将举办' : '已结束'}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#2857A4] transition-colors line-clamp-2">
                      {activity.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                      {activity.location}
                    </div>
                    {activity.summary && (
                      <p className="mt-3 text-sm text-gray-500 line-clamp-2 leading-relaxed">{activity.summary}</p>
                    )}
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-[#2857A4] group-hover:text-[#1E4580] transition-colors">
                      了解详情
                      <svg className="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20 text-gray-500">暂无相关活动</div>
            )}
          </>
        )}
      </section>
    </div>
  )
}
