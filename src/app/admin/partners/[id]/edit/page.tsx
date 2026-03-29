'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import ImageUpload from '@/components/admin/ImageUpload'

export default function EditPartnerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    name: '',
    logo: '',
    website: '',
    category: '合作伙伴',
    order: 0,
    visible: true,
  })

  useEffect(() => {
    fetch(`/api/admin/partners/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.partner) {
          const p = data.partner
          setForm({
            name: p.name,
            logo: p.logo,
            website: p.website,
            category: p.category,
            order: p.order,
            visible: p.visible,
          })
        }
        setLoading(false)
      })
  }, [id])

  function updateField(field: string, value: string | boolean | number) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch(`/api/admin/partners/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) router.push('/admin/partners')
      else alert('保存失败')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="text-gray-500">加载中...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">编辑合作伙伴</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-3xl space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">名称</label>
          <input type="text" required value={form.name} onChange={(e) => updateField('name', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <ImageUpload value={form.logo} onChange={(url) => updateField('logo', url)} label="Logo" />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">网站</label>
          <input type="text" value={form.website} onChange={(e) => updateField('website', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
            <select value={form.category} onChange={(e) => updateField('category', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="合作伙伴">合作伙伴</option>
              <option value="支持单位">支持单位</option>
              <option value="媒体伙伴">媒体伙伴</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">排序</label>
            <input type="number" value={form.order} onChange={(e) => updateField('order', parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input type="checkbox" id="visible" checked={form.visible} onChange={(e) => updateField('visible', e.target.checked)} className="rounded" />
          <label htmlFor="visible" className="text-sm text-gray-700">可见</label>
        </div>
        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={saving} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 text-sm">{saving ? '保存中...' : '保存'}</button>
          <button type="button" onClick={() => router.push('/admin/partners')} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm">取消</button>
        </div>
      </form>
    </div>
  )
}
