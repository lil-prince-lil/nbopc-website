'use client'

import { useEffect, useState } from 'react'
import ImageUpload from '@/components/admin/ImageUpload'

interface TeamMember {
  name: string
  role: string
  bio: string
  avatar: string
}

interface TimelineItem {
  date: string
  title: string
  description: string
}

export default function AdminAboutPage() {
  const [intro, setIntro] = useState('')
  const [mission, setMission] = useState('')
  const [vision, setVision] = useState('')
  const [endorsement, setEndorsement] = useState('')
  const [team, setTeam] = useState<TeamMember[]>([])
  const [timeline, setTimeline] = useState<TimelineItem[]>([])
  const [saving, setSaving] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(res => res.json())
      .then(data => {
        const s = data.settings || {}
        setIntro(s.about_intro || '')
        setMission(s.about_mission || '')
        setVision(s.about_vision || '')
        setEndorsement(s.about_endorsement || '')
        try { setTeam(JSON.parse(s.about_team || '[]')) } catch { setTeam([]) }
        try { setTimeline(JSON.parse(s.about_timeline || '[]')) } catch { setTimeline([]) }
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
      <h1 className="text-2xl font-bold text-gray-900">关于我们 - 内容管理</h1>
      {message && <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm">{message}</div>}

      {/* 社区介绍 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">社区介绍</h2>
        <textarea value={intro} onChange={e => setIntro(e.target.value)} rows={8}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="社区介绍正文..." />
        <button onClick={() => saveField('about_intro', intro)} disabled={saving === 'about_intro'}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50">
          {saving === 'about_intro' ? '保存中...' : '保存'}
        </button>
      </div>

      {/* 使命 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">使命</h2>
        <textarea value={mission} onChange={e => setMission(e.target.value)} rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
        <button onClick={() => saveField('about_mission', mission)} disabled={saving === 'about_mission'}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50">
          {saving === 'about_mission' ? '保存中...' : '保存'}
        </button>
      </div>

      {/* 愿景 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">愿景</h2>
        <textarea value={vision} onChange={e => setVision(e.target.value)} rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
        <button onClick={() => saveField('about_vision', vision)} disabled={saving === 'about_vision'}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50">
          {saving === 'about_vision' ? '保存中...' : '保存'}
        </button>
      </div>

      {/* 官方背书 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">官方背书</h2>
        <textarea value={endorsement} onChange={e => setEndorsement(e.target.value)} rows={3}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
        <button onClick={() => saveField('about_endorsement', endorsement)} disabled={saving === 'about_endorsement'}
          className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50">
          {saving === 'about_endorsement' ? '保存中...' : '保存'}
        </button>
      </div>

      {/* 团队成员 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">核心运营团队</h2>
        {team.map((m, i) => (
          <div key={i} className="border border-gray-100 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-700">成员 {i + 1}</span>
              <button onClick={() => setTeam(team.filter((_, j) => j !== i))} className="text-xs text-red-500 hover:text-red-700">删除</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">姓名</label>
                <input value={m.name} onChange={e => { const t = [...team]; t[i] = {...m, name: e.target.value}; setTeam(t) }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">职位</label>
                <input value={m.role} onChange={e => { const t = [...team]; t[i] = {...m, role: e.target.value}; setTeam(t) }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-500 mb-1">简介</label>
                <input value={m.bio} onChange={e => { const t = [...team]; t[i] = {...m, bio: e.target.value}; setTeam(t) }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div className="md:col-span-2">
                <ImageUpload value={m.avatar} onChange={url => { const t = [...team]; t[i] = {...m, avatar: url}; setTeam(t) }} label="头像" />
              </div>
            </div>
          </div>
        ))}
        <button onClick={() => setTeam([...team, { name: '', role: '', bio: '', avatar: '' }])}
          className="text-sm text-blue-600 hover:text-blue-800">+ 添加成员</button>
        <div className="mt-4">
          <button onClick={() => saveField('about_team', JSON.stringify(team))} disabled={saving === 'about_team'}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50">
            {saving === 'about_team' ? '保存中...' : '保存团队'}
          </button>
        </div>
      </div>

      {/* 发展历程 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">发展历程</h2>
        {timeline.map((t, i) => (
          <div key={i} className="border border-gray-100 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-gray-700">节点 {i + 1}</span>
              <button onClick={() => setTimeline(timeline.filter((_, j) => j !== i))} className="text-xs text-red-500 hover:text-red-700">删除</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">时间</label>
                <input value={t.date} onChange={e => { const tl = [...timeline]; tl[i] = {...t, date: e.target.value}; setTimeline(tl) }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs text-gray-500 mb-1">标题</label>
                <input value={t.title} onChange={e => { const tl = [...timeline]; tl[i] = {...t, title: e.target.value}; setTimeline(tl) }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
              <div className="md:col-span-3">
                <label className="block text-xs text-gray-500 mb-1">描述</label>
                <textarea value={t.description} onChange={e => { const tl = [...timeline]; tl[i] = {...t, description: e.target.value}; setTimeline(tl) }}
                  rows={2} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" />
              </div>
            </div>
          </div>
        ))}
        <button onClick={() => setTimeline([...timeline, { date: '', title: '', description: '' }])}
          className="text-sm text-blue-600 hover:text-blue-800">+ 添加节点</button>
        <div className="mt-4">
          <button onClick={() => saveField('about_timeline', JSON.stringify(timeline))} disabled={saving === 'about_timeline'}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 disabled:opacity-50">
            {saving === 'about_timeline' ? '保存中...' : '保存时间轴'}
          </button>
        </div>
      </div>
    </div>
  )
}
