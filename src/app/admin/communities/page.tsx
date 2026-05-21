'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

interface Community {
  id: string
  name: string
  district: string
  status: string
  spotlightLabel: string
  order: number
  visible: boolean
}

const STATUS_LABEL: Record<string, string> = {
  operating: '已运营',
  preparing: '筹备中',
}

export default function AdminCommunitiesPage() {
  const [communities, setCommunities] = useState<Community[]>([])
  const [loading, setLoading] = useState(true)

  const fetchData = useCallback(async () => {
    setLoading(true)
    const res = await fetch('/api/admin/communities')
    const data = await res.json()
    setCommunities(data.communities || [])
    setLoading(false)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  async function handleDelete(id: string, name: string) {
    if (!confirm(`确定要删除社区「${name}」吗？`)) return
    await fetch(`/api/admin/communities/${id}`, { method: 'DELETE' })
    fetchData()
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-bold text-gray-900">社区图谱管理</h1>
        <Link
          href="/admin/communities/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
        >
          新增社区
        </Link>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        管理「专委会图谱」页面展示的 OPC 社区。「排序」数字越小越靠前，前台按此顺序排列。
      </p>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left px-4 py-3 font-medium text-gray-600 w-16">排序</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">社区名称</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">区域</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">特色标签</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">状态</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">可见</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">操作</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">加载中...</td>
                </tr>
              ) : communities.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-gray-500">暂无社区</td>
                </tr>
              ) : (
                communities.map((c, i) => (
                  <tr key={c.id} className={i % 2 === 1 ? 'bg-gray-50' : ''}>
                    <td className="px-4 py-3 text-gray-500 font-mono">{c.order}</td>
                    <td className="px-4 py-3 text-gray-900 font-medium">{c.name}</td>
                    <td className="px-4 py-3 text-gray-700">{c.district}</td>
                    <td className="px-4 py-3 text-gray-700">{c.spotlightLabel}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs ${
                          c.status === 'operating'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-amber-100 text-amber-700'
                        }`}
                      >
                        {STATUS_LABEL[c.status] || c.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-block px-2 py-0.5 rounded text-xs ${
                          c.visible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {c.visible ? '是' : '否'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <Link
                          href={`/admin/communities/${c.id}/edit`}
                          className="text-gray-600 hover:text-blue-600"
                        >
                          编辑
                        </Link>
                        <button
                          onClick={() => handleDelete(c.id, c.name)}
                          className="text-red-500 hover:text-red-700"
                        >
                          删除
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t text-sm text-gray-500">共 {communities.length} 个社区</div>
      </div>
    </div>
  )
}
