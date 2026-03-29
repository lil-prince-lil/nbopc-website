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
        // upcoming first, then by date desc, take 3
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
    <section id="activities" className="py-20 bg-[#0D1A2D]">
      <div ref={sectionRef} className="max-w-6xl mx-auto px-6">
        <div className="reveal flex items-center justify-between mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            近期活动预告
          </h2>
          <Link
            href="/activities"
            className="text-sm text-[#1EAF8E] hover:underline font-medium hidden sm:flex items-center gap-1"
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
              <div key={i} className="rounded-2xl bg-[#132238] border border-white/10 overflow-hidden animate-pulse">
                <div className="aspect-[3/4] bg-white/5" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-white/5 rounded w-3/4" />
                  <div className="h-3 bg-white/5 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : activities.length === 0 ? (
          <div className="text-center py-16 text-gray-400">暂无活动</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {activities.map((a, i) => (
              <Link
                key={a.id}
                href={`/activities/${a.id}`}
                className="reveal group rounded-2xl bg-[#132238] border border-white/10 overflow-hidden hover:border-[#1EAF8E]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#1EAF8E]/5"
              >
                {/* Illustration */}
                <div className="aspect-[4/3] relative overflow-hidden">
                  {a.coverImage ? (
                    <img
                      src={a.coverImage}
                      alt={a.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-[#2857A4]/30 to-[#1EAF8E]/20 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white/20" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#1EAF8E] transition-colors line-clamp-2">
                    {a.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4">
                    {formatDate(a.date)}，{a.location}
                  </p>
                  {a.status === 'upcoming' ? (
                    <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[#1EAF8E] text-white">
                      立即报名
                    </span>
                  ) : (
                    <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-white/5 text-gray-500">
                      已结束
                    </span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="text-center mt-8 sm:hidden">
          <Link href="/activities" className="text-sm text-[#1EAF8E] hover:underline font-medium">
            查看全部活动 →
          </Link>
        </div>
      </div>
    </section>
  )
}
