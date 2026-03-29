'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import ImageUpload from '@/components/admin/ImageUpload'

export default function EditActivityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    title: '',
    summary: '',
    content: '',
    coverImage: '',
    date: '',
    location: '',
    status: 'upcoming',
    tags: '',
    visible: true,
  })

  useEffect(() => {
    fetch(`/api/admin/activities/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.activity) {
          const a = data.activity
          setForm({
            title: a.title,
            summary: a.summary,
            content: a.content,
            coverImage: a.coverImage,
            date: a.date,
            location: a.location,
            status: a.status,
            tags: a.tags,
            visible: a.visible,
          })
        }
        setLoading(false)
      })
  }, [id])

  function updateField(field: string, value: string | boolean) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/activities/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) router.push('/admin/activities')
      else alert('保存失败')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="text-gray-500">加载中...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">编辑活动</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-3xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">标题</label>
          <input type="text" required value={form.title} onChange={(e) => updateField('title', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">摘要</label>
          <input type="text" value={form.summary} onChange={(e) => updateField('summary', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">正文</label>
          <textarea rows={12} value={form.content} onChange={(e) => updateField('content', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">活动日期</label>
            <input type="text" value={form.date} onChange={(e) => updateField('date', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">地点</label>
            <input type="text" value={form.location} onChange={(e) => updateField('location', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">状态</label>
            <select value={form.status} onChange={(e) => updateField('status', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="upcoming">即将开始</option>
              <option value="ongoing">进行中</option>
              <option value="ended">已结束</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">标签（逗号分隔）</label>
          <input type="text" value={form.tags} onChange={(e) => updateField('tags', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <ImageUpload value={form.coverImage} onChange={(url) => updateField('coverImage', url)} label="封面图" />
        <div className="flex items-center gap-2">
          <input type="checkbox" id="visible" checked={form.visible} onChange={(e) => updateField('visible', e.target.checked)} className="rounded" />
          <label htmlFor="visible" className="text-sm text-gray-700">发布（可见）</label>
        </div>
        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={saving} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 text-sm">{saving ? '保存中...' : '保存'}</button>
          <button type="button" onClick={() => router.push('/admin/activities')} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm">取消</button>
        </div>
      </form>
    </div>
  )
}
