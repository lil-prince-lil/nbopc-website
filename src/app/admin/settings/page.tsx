'use client'

import { useState, useEffect } from 'react'
import ImageUpload from '@/components/admin/ImageUpload'

const SETTING_KEYS = [
  { key: 'siteName', label: '站点名称' },
  { key: 'siteDescription', label: '站点描述' },
  { key: 'contactEmail', label: '联系邮箱' },
  { key: 'contactPhone', label: '联系电话' },
  { key: 'wechat', label: '微信号' },
  { key: 'address', label: '地址' },
  { key: 'icp', label: 'ICP备案号' },
  { key: 'copyright', label: '版权信息' },
]

export default function SettingsPage() {
  const [settings, setSettings] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/admin/settings')
      .then((r) => r.json())
      .then((data) => {
        setSettings(data.settings || {})
        setLoading(false)
      })
  }, [])

  function updateSetting(key: string, value: string) {
    setSettings((s) => ({ ...s, [key]: value }))
    setSaved(false)
  }

  async function handleSave() {
    setSaving(true)
    try {
      const res = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ settings }),
      })
      if (res.ok) {
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      } else {
        alert('保存失败')
      }
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="text-gray-500">加载中...</div>

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">站点设置</h1>

      <div className="bg-white rounded-lg shadow p-6 max-w-3xl space-y-4">
        {/* Logo 上传 */}
        <div>
          <ImageUpload
            value={settings['site_logo'] || ''}
            onChange={(url) => updateSetting('site_logo', url)}
            label="站点 Logo"
          />
          <p className="mt-1 text-xs text-gray-400">上传后将替换 Header 和 Footer 中的默认 Logo</p>
        </div>

        {SETTING_KEYS.map((item) => (
          <div key={item.key}>
            <label className="block text-sm font-medium text-gray-700 mb-1">{item.label}</label>
            <input
              type="text"
              value={settings[item.key] || ''}
              onChange={(e) => updateSetting(item.key, e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        ))}

        <div className="flex items-center gap-4 pt-4">
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 text-sm"
          >
            {saving ? '保存中...' : '保存设置'}
          </button>
          {saved && <span className="text-sm text-green-600">已保存</span>}
        </div>
      </div>
    </div>
  )
}
