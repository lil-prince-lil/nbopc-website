'use client'

import { useState, useEffect, useCallback } from 'react'

interface Activity {
  id: string
  title: string
}

interface Signup {
  id: string
  activityId: string
  name: string
  phone: string
  email: string
  company: string
  createdAt: string
}

export default function SignupsPage() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivityId, setSelectedActivityId] = useState('')
  const [signups, setSignups] = useState<Signup[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetch('/api/admin/activities?page=1&pageSize=200')
      .then((r) => r.json())
      .then((data) => {
        setActivities(data.activities || [])
      })
  }, [])

  const fetchSignups = useCallback(async () => {
    if (!selectedActivityId) {
      setSignups([])
      return
    }
    setLoading(true)
    const res = await fetch(`/api/admin/signups?activityId=${selectedActivityId}`)
    const data = await res.json()
    setSignups(data.signups || [])
    setLoading(false)
  }, [selectedActivityId])

  useEffect(() => {
    fetchSignups()
  }, [fetchSignups])

  function handleExportCSV() {
    if (!selectedActivityId) return
    window.open(`/api/admin/signups?activityId=${selectedActivityId}&format=csv`, '_blank')
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">报名管理</h1>
        {selectedActivityId && signups.length > 0 && (
          <button
            onClick={handleExportCSV}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm"
          >
            导出 CSV
          </button>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">选择活动</label>
        <select
          value={selectedActivityId}
          onChange={(e) => setSelectedActivityId(e.target.value)}
          className="w-full max-w-md px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- 请选择活动 --</option>
          {activities.map((a) => (
            <option key={a.id} value={a.id}>{a.title}</option>
          ))}
        </select>
      </div>

      {selectedActivityId && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left px-4 py-3 font-medium text-gray-600">姓名</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">手机</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">邮箱</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">公司</th>
                  <th className="text-left px-4 py-3 font-medium text-gray-600">报名时间</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">加载中...</td></tr>
                ) : signups.length === 0 ? (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">暂无报名记录</td></tr>
                ) : (
                  signups.map((s, i) => (
                    <tr key={s.id} className={i % 2 === 1 ? 'bg-gray-50' : ''}>
                      <td className="px-4 py-3 text-gray-900">{s.name}</td>
                      <td className="px-4 py-3 text-gray-900">{s.phone}</td>
                      <td className="px-4 py-3 text-gray-500">{s.email || '-'}</td>
                      <td className="px-4 py-3 text-gray-500">{s.company || '-'}</td>
                      <td className="px-4 py-3 text-gray-500">{new Date(s.createdAt).toLocaleString('zh-CN')}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          {signups.length > 0 && (
            <div className="px-4 py-3 border-t text-sm text-gray-500">
              共 {signups.length} 条报名记录
            </div>
          )}
        </div>
      )}
    </div>
  )
}
