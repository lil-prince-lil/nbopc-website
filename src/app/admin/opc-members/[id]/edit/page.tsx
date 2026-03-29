'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import ImageUpload from '@/components/admin/ImageUpload'

export default function EditOpcMemberPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({
    name: '',
    avatar: '',
    title: '',
    quote: '',
    bio: '',
    photo: '',
    skills: '',
    currentWork: '',
    category: 'AI工具',
    productName: '',
    productLogo: '',
    productDesc: '',
    productDetail: '',
    productImg: '',
    productStage: '',
    productLink: '',
    order: 0,
    visible: true,
  })

  useEffect(() => {
    fetch(`/api/admin/opc-members/${id}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.member) {
          const m = data.member
          setForm({
            name: m.name || '',
            avatar: m.avatar || '',
            title: m.title || '',
            quote: m.quote || '',
            bio: m.bio || '',
            photo: m.photo || '',
            skills: m.skills || '',
            currentWork: m.currentWork || '',
            category: m.category || 'AI工具',
            productName: m.productName || '',
            productLogo: m.productLogo || '',
            productDesc: m.productDesc || '',
            productDetail: m.productDetail || '',
            productImg: m.productImg || '',
            productStage: m.productStage || '',
            productLink: m.productLink || '',
            order: m.order || 0,
            visible: m.visible ?? true,
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
      const res = await fetch(`/api/admin/opc-members/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (res.ok) router.push('/admin/opc-members')
      else alert('保存失败')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="text-gray-500">加载中...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">编辑OPC成员</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-3xl space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">姓名</label>
            <input type="text" required value={form.name} onChange={(e) => updateField('name', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">分类</label>
            <select value={form.category} onChange={(e) => updateField('category', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="AI工具">AI工具</option>
              <option value="跨境电商">跨境电商</option>
              <option value="设计创意">设计创意</option>
              <option value="医疗健康">医疗健康</option>
              <option value="其他">其他</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">身份标签</label>
          <input type="text" value={form.title} onChange={(e) => updateField('title', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">个人宣言</label>
          <input type="text" value={form.quote} onChange={(e) => updateField('quote', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">个人背景</label>
          <textarea rows={3} value={form.bio} onChange={(e) => updateField('bio', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">擅长领域（逗号分隔）</label>
          <input type="text" value={form.skills} onChange={(e) => updateField('skills', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">正在做什么</label>
          <input type="text" value={form.currentWork} onChange={(e) => updateField('currentWork', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ImageUpload value={form.avatar} onChange={(url) => updateField('avatar', url)} label="头像" />
          <ImageUpload value={form.photo} onChange={(url) => updateField('photo', url)} label="个人照片" />
        </div>

        <hr className="my-2" />
        <p className="text-sm font-medium text-gray-600">产品/项目信息</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">产品名称</label>
            <input type="text" value={form.productName} onChange={(e) => updateField('productName', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">产品阶段</label>
            <select value={form.productStage} onChange={(e) => updateField('productStage', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="">请选择</option>
              <option value="开发中">开发中</option>
              <option value="内测中">内测中</option>
              <option value="公测中">公测中</option>
              <option value="已上线">已上线</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">产品一句话介绍</label>
          <input type="text" value={form.productDesc} onChange={(e) => updateField('productDesc', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">产品详细介绍</label>
          <textarea rows={3} value={form.productDetail} onChange={(e) => updateField('productDetail', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">产品链接</label>
          <input type="text" value={form.productLink} onChange={(e) => updateField('productLink', e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <ImageUpload value={form.productLogo} onChange={(url) => updateField('productLogo', url)} label="产品Logo" />
          <ImageUpload value={form.productImg} onChange={(url) => updateField('productImg', url)} label="产品截图" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">排序（数字越小越靠前）</label>
            <input type="number" value={form.order} onChange={(e) => updateField('order', parseInt(e.target.value) || 0)} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          <div className="flex items-end gap-2 pb-2">
            <input type="checkbox" id="visible" checked={form.visible} onChange={(e) => updateField('visible', e.target.checked)} className="rounded" />
            <label htmlFor="visible" className="text-sm text-gray-700">可见</label>
          </div>
        </div>
        <div className="flex gap-3 pt-4">
          <button type="submit" disabled={saving} className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 text-sm">{saving ? '保存中...' : '保存'}</button>
          <button type="button" onClick={() => router.push('/admin/opc-members')} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm">取消</button>
        </div>
      </form>
    </div>
  )
}
