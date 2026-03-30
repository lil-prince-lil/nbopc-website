'use client'

import { useEffect, useState } from 'react'

interface FaqItem {
  question: string
  answer: string
}

export default function AdminJoinPage() {
  const [faq, setFaq] = useState<FaqItem[]>([])
  const [contactEmail, setContactEmail] = useState('')
  const [contactDesc, setContactDesc] = useState('')
  const [saving, setSaving] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => {
        const s = data.settings || {}
        try { setFaq(JSON.parse(s.join_faq || '[]')) } catch { setFaq([]) }
        setContactEmail(s.join_contact_email || '')
        setContactDesc(s.join_contact_desc || '')
      })
  }, [])

  async function saveField(key: string, value: string) {
    setSaving(key)
    setMessage('')
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings: { [key]: value } }),
      })
      if (res.ok) setMessage('保存成功')
      else setMessage('保存失败')
    } catch { setMessage('保存失败') }
    setSaving('')
    setTimeout(() => setMessage(''), 2000)
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">加入我们 - 内容管理</h1>
      {message && <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm">{message}</div>}

      {/* FAQ */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">常见问题 (FAQ)</h2>
        {faq.map((f, i) => (
          <div key={i} className="border border-gray-100 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-700">问题 {i + 1}</span>
              <button onClick={() => setFaq(faq.filter((_, j) => j !== i))} className="text-xs text-red-500 hover:text-red-700">删除</button>
            </div>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">问题</label>
                <input value={f.question} onChange={e => { const n = [...faq]; n[i] = {...f, question: e.target.value}; setFaq(n) }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">回答</label>
                <textarea value={f.answer} onChange={e => { const n = [...faq]; n[i] = {...f, answer: e.target.value}; setFaq(n) }}
                  rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
            </div>
          </div>
        ))}
        <button onClick={() => setFaq([...faq, { question: '', answer: '' }])}
          className="text-sm text-blue-600 hover:text-blue-800">+ 添加问题</button>
        <div className="mt-4">
          <button onClick={() => saveField('join_faq', JSON.stringify(faq))} disabled={saving === 'join_faq'}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50">
            {saving === 'join_faq' ? '保存中...' : '保存FAQ'}
          </button>
        </div>
      </div>

      {/* 联系信息 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">联系信息</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">联系邮箱</label>
            <input value={contactEmail} onChange={e => setContactEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">合作联系描述</label>
            <textarea value={contactDesc} onChange={e => setContactDesc(e.target.value)} rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
          </div>
        </div>
        <button onClick={() => saveField('join_contact_email', contactEmail).then(() => saveField('join_contact_desc', contactDesc))}
          disabled={saving !== ''} className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50">
          {saving ? '保存中...' : '保存联系信息'}
        </button>
      </div>
    </div>
  )
}
