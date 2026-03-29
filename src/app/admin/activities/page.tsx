'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

interface Activity {
  id: string
  title: string
  date: string
  location: string
  status: string
  visible: boolean
  createdAt: string
}

export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    setLoading(true)
    const res = await fetch(`/api/admin/activities?page=${page}&pageSize=20`)
    const data = await res.json()
    setActivities(data.activities)
    setTotal(data.total)
    setLoading(false)
  }, [page])

  useEffect(() => { fetchData() }, [fetchData])

  async function handleDelete(id: string) {
    if (!confirm('确定要删除这个活动吗？')) return
    await fetch(`/api/admin/activities/${id}`, { method: 'DELETE' })
    fetchData()
  }

  const statusLabel: Record<string, string> = { upcoming: '即将开始', ongoing: '进行中', ended: '已结束' }
  const totalPages = Math.ceil(total / 20)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">活动管理</h1>
        <Link href="/admin/activities/new" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">
          新建活动
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left px-4 py-3 font-medium text-gray-600">标题</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">日期</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">地点</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">状态</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">可见</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">操作</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500">加载中...</td></tr>
              ) : activities.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500">暂无活动</td></tr>
              ) : (
                activities.map((a, i) => (
                  <tr key={a.id} className={i % 2 === 1 ? 'bg-gray-50' : ''}>
                    <td className="px-4 py-3 max-w-xs truncate text-gray-900 font-medium">{a.title}</td>
                    <td className="px-4 py-3 text-gray-500">{a.date}</td>
                    <td className="px-4 py-3 text-gray-500">{a.location}</td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-2 py-0.5 rounded text-xs bg-blue-100 text-blue-700">
                        {statusLabel[a.status] || a.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs ${a.visible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {a.visible ? '是' : '否'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link href={`/admin/activities/${a.id}/edit`} className="text-gray-600 hover:text-blue-600">编辑</Link>
                        <button onClick={() => handleDelete(a.id)} className="text-red-500 hover:text-red-700">删除</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t">
            <span className="text-sm text-gray-500">共 {total} 条</span>
            <div className="flex gap-2">
              <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1} className="px-3 py-1 border rounded text-sm disabled:opacity-50">上一页</button>
              <span className="px-3 py-1 text-sm">{page} / {totalPages}</span>
              <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages} className="px-3 py-1 border rounded text-sm disabled:opacity-50">下一页</button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
