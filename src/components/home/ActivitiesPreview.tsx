'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface Activity {
  id: string
  title: string
  date: string
  location: string
  status: string
  coverImage: string
}

export default function ActivitiesPreview() {
  const sectionRef = useScrollReveal()
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/public/activities')
      .then((res) => res.json())
      .then((json) => {
        const all: Activity[] = json.data || []
        const upcoming = all.filter((a) => a.status === 'upcoming')
        const ended = all.filter((a) => a.status !== 'upcoming')
        setActivities([...upcoming, ...ended].slice(0, 3))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  function formatDate(dateStr: string) {
    const d = new Date(dateStr)
    return `${d.getMonth() + 1}月${d.getDate()}日`
  }

  return (
    <section id="activities" className="py-20 bg-gray-50">
      <div ref={sectionRef} className="max-w-6xl mx-auto px-6">
        <div className="reveal flex items-end justify-between mb-10">
          <div>
            <div className="eyebrow mb-3">EVENTS</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">专委会近期活动</h2>
          </div>
          <Link
            href="/activities"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-[#2857A4] hover:text-[#1E4580] transition-colors"
          >
            查看全部
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-soft overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-gray-100" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-gray-100 rounded w-3/4" />
                  <div className="h-3 bg-gray-100 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-16 text-gray-500">暂无活动</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activities.map((a) => (
              <Link
                key={a.id}
                href={`/activities/${a.id}`}
                className="reveal group card-soft overflow-hidden hover:-translate-y-1"
              >
                <div className="aspect-[4/3] relative overflow-hidden bg-gray-50">
                  {a.coverImage ? (
                    <img
                      src={a.coverImage}
                      alt={a.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div
                      className="absolute inset-0 flex items-center justify-center"
                      style={{
                        background:
                          'linear-gradient(135deg, rgba(40,87,164,0.08) 0%, rgba(255,140,0,0.06) 100%)',
                      }}
                    >
                      <svg className="w-12 h-12 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="text-base font-semibold text-gray-900 mb-2 group-hover:text-[#2857A4] transition-colors line-clamp-2">
                    {a.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {formatDate(a.date)} · {a.location}
                  </p>
                  {a.status === 'upcoming' ? (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold text-[#FF8C00] bg-[#FF8C00]/5 border border-[#FF8C00]/30">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C00]" />
                      立即报名
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-gray-500 bg-gray-100">
                      已结束
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-8 sm:hidden">
          <Link href="/activities" className="text-sm text-[#2857A4] hover:text-[#1E4580] font-medium">
            查看全部活动 →
          </Link>
        </div>
      </div>
    </section>
  )
}
