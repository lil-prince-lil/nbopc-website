'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

interface OpcMember {
  id: string
  name: string
  title: string
  company: string
  category: string
  order: number
  visible: boolean
}

export default function OpcMembersPage() {
  const [members, setMembers] = useState<OpcMember[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    setLoading(true)
    const res = await fetch(`/api/admin/opc-members?page=${page}&pageSize=20`)
    const data = await res.json()
    setMembers(data.members)
    setTotal(data.total)
    setLoading(false)
  }, [page])

  useEffect(() => { fetchData() }, [fetchData])

  async function handleDelete(id: string) {
    if (!confirm('确定要删除这个成员吗？')) return
    await fetch(`/api/admin/opc-members/${id}`, { method: 'DELETE' })
    fetchData()
  }

  const totalPages = Math.ceil(total / 20)

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">OPC成员管理</h1>
        <Link href="/admin/opc-members/new" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm">新增成员</Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left px-4 py-3 font-medium text-gray-600">姓名</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">职位</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">公司</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">分类</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">排序</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">可见</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">操作</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-500">加载中...</td></tr>
              ) : members.length === 0 ? (
                <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-500">暂无成员</td></tr>
              ) : (
                members.map((m, i) => (
                  <tr key={m.id} className={i % 2 === 1 ? 'bg-gray-50' : ''}>
                    <td className="px-4 py-3 text-gray-900 font-medium">{m.name}</td>
                    <td className="px-4 py-3 text-gray-900">{m.title}</td>
                    <td className="px-4 py-3 text-gray-900">{m.company}</td>
                    <td className="px-4 py-3 text-gray-900">{m.category}</td>
                    <td className="px-4 py-3 text-gray-500">{m.order}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs ${m.visible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {m.visible ? '是' : '否'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link href={`/admin/opc-members/${m.id}/edit`} className="text-gray-600 hover:text-blue-600">编辑</Link>
                        <button onClick={() => handleDelete(m.id)} className="text-red-500 hover:text-red-700">删除</button>
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
