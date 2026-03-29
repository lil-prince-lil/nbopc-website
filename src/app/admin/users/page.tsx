'use client'

import { useState, useEffect, useCallback } from 'react'

interface User {
  id: string
  name: string
  phone: string
  company: string
  createdAt: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    setLoading(true)
    const res = await fetch(`/api/admin/users?page=${page}&pageSize=20`)
    const data = await res.json()
    setUsers(data.users)
    setTotal(data.total)
    setLoading(false)
  }, [page])

  useEffect(() => { fetchData() }, [fetchData])

  const totalPages = Math.ceil(total / 20)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">用户管理</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left px-4 py-3 font-medium text-gray-600">姓名</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">手机</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">公司</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">注册时间</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-500">加载中...</td></tr>
              ) : users.length === 0 ? (
                <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-500">暂无用户</td></tr>
              ) : (
                users.map((u, i) => (
                  <tr key={u.id} className={i % 2 === 1 ? 'bg-gray-50' : ''}>
                    <td className="px-4 py-3 text-gray-900 font-medium">{u.name || '-'}</td>
                    <td className="px-4 py-3 text-gray-900">{u.phone}</td>
                    <td className="px-4 py-3 text-gray-900">{u.company || '-'}</td>
                    <td className="px-4 py-3 text-gray-500">{new Date(u.createdAt).toLocaleDateString('zh-CN')}</td>
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
