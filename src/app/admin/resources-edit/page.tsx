'use client'

import { useEffect, useState } from 'react'

interface AiModel { name: string; description: string; status: string }
interface CloudService { name: string; description: string; offer: string }
interface PolicyItem { title: string; description: string }

export default function AdminResourcesEditPage() {
  const [aiModels, setAiModels] = useState<AiModel[]>([])
  const [cloud, setCloud] = useState<CloudService[]>([])
  const [policy, setPolicy] = useState<PolicyItem[]>([])
  const [saving, setSaving] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => {
        const s = data.settings || {}
        try { setAiModels(JSON.parse(s.resources_ai_models || '[]')) } catch { setAiModels([]) }
        try { setCloud(JSON.parse(s.resources_cloud || '[]')) } catch { setCloud([]) }
        try { setPolicy(JSON.parse(s.resources_policy || '[]')) } catch { setPolicy([]) }
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
      <h1 className="text-2xl font-bold text-gray-900">资源管理 - 内容编辑</h1>
      <p className="text-sm text-gray-500">OPC自研产品部分从OPC成员数据中自动读取，无需在此编辑。</p>
      {message && <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm">{message}</div>}

      {/* AI 大模型 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">AI 大模型 API</h2>
        {aiModels.map((m, i) => (
          <div key={i} className="border border-gray-100 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-700">模型 {i + 1}</span>
              <button onClick={() => setAiModels(aiModels.filter((_, j) => j !== i))} className="text-xs text-red-500 hover:text-red-700">删除</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">名称</label>
                <input value={m.name} onChange={e => { const n = [...aiModels]; n[i] = {...m, name: e.target.value}; setAiModels(n) }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">描述</label>
                <input value={m.description} onChange={e => { const n = [...aiModels]; n[i] = {...m, description: e.target.value}; setAiModels(n) }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">状态</label>
                <select value={m.status} onChange={e => { const n = [...aiModels]; n[i] = {...m, status: e.target.value}; setAiModels(n) }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option value="即将开放">即将开放</option>
                  <option value="可用">可用</option>
                </select>
              </div>
            </div>
          </div>
        ))}
        <button onClick={() => setAiModels([...aiModels, { name: '', description: '', status: '即将开放' }])}
          className="text-sm text-blue-600 hover:text-blue-800">+ 添加模型</button>
        <div className="mt-4">
          <button onClick={() => saveField('resources_ai_models', JSON.stringify(aiModels))} disabled={saving === 'resources_ai_models'}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50">
            {saving === 'resources_ai_models' ? '保存中...' : '保存'}
          </button>
        </div>
      </div>

      {/* 云服务 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">云服务资源</h2>
        {cloud.map((c, i) => (
          <div key={i} className="border border-gray-100 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-700">服务 {i + 1}</span>
              <button onClick={() => setCloud(cloud.filter((_, j) => j !== i))} className="text-xs text-red-500 hover:text-red-700">删除</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">名称</label>
                <input value={c.name} onChange={e => { const n = [...cloud]; n[i] = {...c, name: e.target.value}; setCloud(n) }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">描述</label>
                <input value={c.description} onChange={e => { const n = [...cloud]; n[i] = {...c, description: e.target.value}; setCloud(n) }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">优惠信息</label>
                <input value={c.offer} onChange={e => { const n = [...cloud]; n[i] = {...c, offer: e.target.value}; setCloud(n) }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
            </div>
          </div>
        ))}
        <button onClick={() => setCloud([...cloud, { name: '', description: '', offer: '' }])}
          className="text-sm text-blue-600 hover:text-blue-800">+ 添加服务</button>
        <div className="mt-4">
          <button onClick={() => saveField('resources_cloud', JSON.stringify(cloud))} disabled={saving === 'resources_cloud'}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50">
            {saving === 'resources_cloud' ? '保存中...' : '保存'}
          </button>
        </div>
      </div>

      {/* 政策资源 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">政策与产业资源</h2>
        {policy.map((p, i) => (
          <div key={i} className="border border-gray-100 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-700">资源 {i + 1}</span>
              <button onClick={() => setPolicy(policy.filter((_, j) => j !== i))} className="text-xs text-red-500 hover:text-red-700">删除</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">标题</label>
                <input value={p.title} onChange={e => { const n = [...policy]; n[i] = {...p, title: e.target.value}; setPolicy(n) }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">描述</label>
                <input value={p.description} onChange={e => { const n = [...policy]; n[i] = {...p, description: e.target.value}; setPolicy(n) }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
            </div>
          </div>
        ))}
        <button onClick={() => setPolicy([...policy, { title: '', description: '' }])}
          className="text-sm text-blue-600 hover:text-blue-800">+ 添加资源</button>
        <div className="mt-4">
          <button onClick={() => saveField('resources_policy', JSON.stringify(policy))} disabled={saving === 'resources_policy'}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50">
            {saving === 'resources_policy' ? '保存中...' : '保存'}
          </button>
        </div>
      </div>
    </div>
  )
}
