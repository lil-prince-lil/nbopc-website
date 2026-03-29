'use client'

import { useState, useEffect } from 'react'

interface Stats {
  articles: number
  activities: number
  opcMembers: number
  users: number
  applications: number
}

const STAT_CARDS = [
  { key: 'articles' as const, label: '文章数', color: 'bg-blue-500' },
  { key: 'activities' as const, label: '活动数', color: 'bg-green-500' },
  { key: 'opcMembers' as const, label: 'OPC成员数', color: 'bg-purple-500' },
  { key: 'users' as const, label: '注册用户数', color: 'bg-amber-500' },
  { key: 'applications' as const, label: '入驻申请数', color: 'bg-rose-500' },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)

  useEffect(() => {
    fetch('/api/admin/stats')
      .then((r) => r.json())
      .then(setStats)
  }, [])

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">仪表盘</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        {STAT_CARDS.map((card) => (
          <div key={card.key} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 ${card.color} rounded-lg flex items-center justify-center`}>
                <span className="text-white text-xl font-bold">
                  {stats ? stats[card.key] : '-'}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500">{card.label}</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats ? stats[card.key] : '...'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
