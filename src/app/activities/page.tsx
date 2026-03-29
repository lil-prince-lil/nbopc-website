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

const GRADIENTS = [
  'from-blue-400 to-indigo-500',
  'from-violet-400 to-purple-500',
  'from-cyan-400 to-blue-500',
  'from-emerald-400 to-teal-500',
  'from-pink-400 to-rose-500',
  'from-amber-400 to-orange-500',
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
    filter === '全部'
      ? activities
      : activities.filter((a) => a.status === filter)

  const filters: FilterType[] = ['全部', 'upcoming', 'ended']

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-dark via-slate-900 to-primary/80 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white">
            活动
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            探索AI领域的前沿思想与实践
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-10">
        <div className="flex gap-2">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-colors ${
                filter === f
                  ? 'bg-primary text-white shadow-sm'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
              }`}
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
              <div key={i} className="bg-[#132238] rounded-2xl border border-white/10 overflow-hidden animate-pulse">
                <div className="h-48 bg-white/5" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-white/5 rounded w-3/4" />
                  <div className="h-4 bg-white/5 rounded w-1/2" />
                  <div className="h-3 bg-white/5 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((activity, i) => (
                <div
                  key={activity.id}
                  className="group bg-[#132238] rounded-2xl shadow-sm border border-white/10 overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {/* Cover */}
                  <div className="relative h-48 overflow-hidden">
                    {activity.coverImage ? (
                      <img src={activity.coverImage} alt={activity.title} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <div className={`absolute inset-0 bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]}`} />
                    )}
                    {/* Date label */}
                    <span className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm text-xs font-semibold text-white px-3 py-1.5 rounded-lg">
                      {formatDate(activity.date)}
                    </span>
                    {/* Status label */}
                    <span
                      className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1.5 rounded-lg ${
                        activity.status === 'upcoming'
                          ? 'bg-emerald-500/90 text-white'
                          : 'bg-gray-500/80 text-white'
                      }`}
                    >
                      {activity.status === 'upcoming' ? '即将举办' : '已结束'}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                      {activity.title}
                    </h3>
                    <div className="mt-2 flex items-center gap-3 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
                          />
                        </svg>
                        {activity.location}
                      </span>
                    </div>
                    {activity.summary && (
                      <p className="mt-3 text-sm text-gray-400 line-clamp-2">
                        {activity.summary}
                      </p>
                    )}
                    <Link
                      href={`/activities/${activity.id}`}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-secondary transition-colors"
                    >
                      了解详情
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
                          d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                        />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                暂无相关活动
              </div>
            )}
          </>
        )}
      </section>
    </div>
  )
}
