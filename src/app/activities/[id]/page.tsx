'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import SignupModal from '@/components/activities/SignupModal'

interface Activity {
  id: string
  title: string
  date: string
  location: string
  summary: string
  content: string
  status: string
  coverImage: string
  tags: string
}

const GRADIENT_BGS = [
  'linear-gradient(135deg, #DBEAFE 0%, #BFDBFE 100%)',
  'linear-gradient(135deg, #FED7AA 0%, #FDBA74 100%)',
  'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)',
  'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)',
  'linear-gradient(135deg, #FCE7F3 0%, #FBCFE8 100%)',
  'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)',
]

export default function ActivityDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [activity, setActivity] = useState<Activity | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!id) return
    fetch(`/api/public/activities/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('not found')
        return res.json()
      })
      .then((json) => setActivity(json.data))
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

  if (notFound || !activity) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-500 bg-gray-50">
        活动未找到
      </div>
    )
  }

  const bg = GRADIENT_BGS[Math.abs(activity.title.length) % GRADIENT_BGS.length]
  const isUpcoming = activity.status === 'upcoming'

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Cover */}
      <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
        {activity.coverImage ? (
          <img src={activity.coverImage} alt={activity.title} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: bg }} />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/40 via-gray-900/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-16">
          <div className="mx-auto max-w-7xl">
            <span
              className={`inline-block text-xs font-semibold px-3 py-1.5 rounded-lg mb-3 backdrop-blur-sm ${
                isUpcoming
                  ? 'bg-[#FF8C00] text-white shadow-sm'
                  : 'bg-white/90 text-gray-700 shadow-sm'
              }`}
            >
              {isUpcoming ? '即将举办' : '已结束'}
            </span>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white drop-shadow-md">
              {activity.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="lg:grid lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2">
            {activity.summary && (
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">{activity.summary}</p>
            )}
            {activity.content ? (
              <div className="prose max-w-none text-gray-800" dangerouslySetInnerHTML={{ __html: activity.content }} />
            ) : null}

            {isUpcoming && <SignupModal activityId={activity.id} activityTitle={activity.title} />}
          </div>

          <div className="mt-10 lg:mt-0">
            <div className="card-soft p-6 sticky top-24">
              <h3 className="text-lg font-bold text-gray-900 mb-5">活动信息</h3>
              <dl className="space-y-4">
                <div>
                  <dt className="eyebrow">日期</dt>
                  <dd className="mt-1 text-sm font-medium text-gray-900">{activity.date}</dd>
                </div>
                <div>
                  <dt className="eyebrow">地点</dt>
                  <dd className="mt-1 text-sm font-medium text-gray-900">{activity.location}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-100">
          <Link
            href="/activities"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#2857A4] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            返回活动列表
          </Link>
        </div>
      </div>
    </div>
  )
}
