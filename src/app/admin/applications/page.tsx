'use client'

import { useState, useEffect, useCallback } from 'react'

interface Application {
  id: string
  name: string
  phone: string
  email: string
  company: string
  position: string
  reason: string
  type: string
  status: string
  createdAt: string
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [detail, setDetail] = useState<Application | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    const res = await fetch(`/api/admin/applications?page=${page}&pageSize=20`)
    const data = await res.json()
    setApplications(data.applications)
    setTotal(data.total)
    setLoading(false)
  }, [page])

  useEffect(() => { fetchData() }, [fetchData])

  async function handleStatus(id: string, status: string) {
    const label = status === 'approved' ? '通过' : '拒绝'
    if (!confirm(`确定要${label}这个申请吗？`)) return
    await fetch(`/api/admin/applications/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status }),
    })
    fetchData()
    if (detail?.id === id) setDetail({ ...detail, status })
  }

  async function viewDetail(id: string) {
    const res = await fetch(`/api/admin/applications/${id}`)
    const data = await res.json()
    setDetail(data.application)
  }

  const statusMap: Record<string, { label: string; cls: string }> = {
    pending: { label: '待审核', cls: 'bg-yellow-100 text-yellow-700' },
    approved: { label: '已通过', cls: 'bg-green-100 text-green-700' },
    rejected: { label: '已拒绝', cls: 'bg-red-100 text-red-700' },
  }

  const totalPages = Math.ceil(total / 20)

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">入驻申请</h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="text-left px-4 py-3 font-medium text-gray-600">申请人</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">手机</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">类型</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">状态</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">时间</th>
                <th className="text-left px-4 py-3 font-medium text-gray-600">操作</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500">加载中...</td></tr>
              ) : applications.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-gray-500">暂无申请</td></tr>
              ) : (
                applications.map((a, i) => (
                  <tr key={a.id} className={i % 2 === 1 ? 'bg-gray-50' : ''}>
                    <td className="px-4 py-3 text-gray-900 font-medium">{a.name}</td>
                    <td className="px-4 py-3 text-gray-900">{a.phone}</td>
                    <td className="px-4 py-3 text-gray-900">{a.type}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs ${statusMap[a.status]?.cls || ''}`}>
                        {statusMap[a.status]?.label || a.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-500">{new Date(a.createdAt).toLocaleDateString('zh-CN')}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button onClick={() => viewDetail(a.id)} className="text-blue-600 hover:text-blue-800">查看</button>
                        {a.status === 'pending' && (
                          <>
                            <button onClick={() => handleStatus(a.id, 'approved')} className="text-green-600 hover:text-green-800">通过</button>
                            <button onClick={() => handleStatus(a.id, 'rejected')} className="text-red-500 hover:text-red-700">拒绝</button>
                          </>
                        )}
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

      {/* Detail modal */}
      {detail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setDetail(null)}>
          <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold">申请详情</h2>
              <button onClick={() => setDetail(null)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex"><span className="w-20 text-gray-500 shrink-0">姓名：</span><span>{detail.name}</span></div>
              <div className="flex"><span className="w-20 text-gray-500 shrink-0">手机：</span><span>{detail.phone}</span></div>
              <div className="flex"><span className="w-20 text-gray-500 shrink-0">邮箱：</span><span>{detail.email || '-'}</span></div>
              <div className="flex"><span className="w-20 text-gray-500 shrink-0">公司：</span><span>{detail.company || '-'}</span></div>
              <div className="flex"><span className="w-20 text-gray-500 shrink-0">职位：</span><span>{detail.position || '-'}</span></div>
              <div className="flex"><span className="w-20 text-gray-500 shrink-0">类型：</span><span>{detail.type}</span></div>
              <div className="flex"><span className="w-20 text-gray-500 shrink-0">申请理由：</span><span>{detail.reason || '-'}</span></div>
              <div className="flex">
                <span className="w-20 text-gray-500 shrink-0">状态：</span>
                <span className={`inline-block px-2 py-0.5 rounded text-xs ${statusMap[detail.status]?.cls || ''}`}>
                  {statusMap[detail.status]?.label || detail.status}
                </span>
              </div>
              <div className="flex"><span className="w-20 text-gray-500 shrink-0">提交时间：</span><span>{new Date(detail.createdAt).toLocaleString('zh-CN')}</span></div>
            </div>
            {detail.status === 'pending' && (
              <div className="flex gap-3 mt-6">
                <button onClick={() => handleStatus(detail.id, 'approved')} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm">通过</button>
                <button onClick={() => handleStatus(detail.id, 'rejected')} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm">拒绝</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
