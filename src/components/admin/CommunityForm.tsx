'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export interface CommunityFormData {
  name: string
  shortName: string
  district: string
  status: string
  spotlightLabel: string
  spotlightColor: string
  address: string
  operator: string
  launchTime: string
  scale: string
  positioning: string
  features: string // 换行分隔
  highlights: string // 换行分隔
  policy: string
  ecosystem: string
  representatives: string
  servicePackages: string
  notes: string
  order: number
  visible: boolean
}

export const EMPTY_COMMUNITY: CommunityFormData = {
  name: '',
  shortName: '',
  district: '海曙区',
  status: 'operating',
  spotlightLabel: '',
  spotlightColor: 'blue',
  address: '',
  operator: '',
  launchTime: '',
  scale: '',
  positioning: '',
  features: '',
  highlights: '',
  policy: '',
  ecosystem: '',
  representatives: '',
  servicePackages: '',
  notes: '',
  order: 0,
  visible: true,
}

const DISTRICTS = ['海曙区', '高新区', '镇海区', '江北区', '余姚市', '北仑区']

const SPOTLIGHT_COLORS = [
  { key: 'gold', label: '金 Gold（总部/最高级）' },
  { key: 'sky', label: '天蓝 Sky' },
  { key: 'cyan', label: '青 Cyan' },
  { key: 'teal', label: '碧绿 Teal' },
  { key: 'violet', label: '紫 Violet' },
  { key: 'blue', label: '蓝 Blue' },
  { key: 'rose', label: '玫红 Rose' },
  { key: 'lime', label: '青柠 Lime' },
  { key: 'slate', label: '灰 Slate（筹备中）' },
  { key: 'indigo', label: '靛蓝 Indigo' },
]

const inputCls =
  'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm'

export default function CommunityForm({
  initial,
  submitLabel,
  onSubmit,
}: {
  initial: CommunityFormData
  submitLabel: string
  onSubmit: (data: CommunityFormData) => Promise<void>
}) {
  const router = useRouter()
  const [form, setForm] = useState<CommunityFormData>(initial)
  const [saving, setSaving] = useState(false)

  function update<K extends keyof CommunityFormData>(field: K, value: CommunityFormData[K]) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    try {
      await onSubmit(form)
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6 max-w-3xl space-y-5">
      {/* 基础信息 */}
      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">基础信息</div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">社区名称 *</label>
        <input type="text" required value={form.name} onChange={(e) => update('name', e.target.value)} className={inputCls} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">简称</label>
          <input type="text" value={form.shortName} onChange={(e) => update('shortName', e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">所属区域</label>
          <select value={form.district} onChange={(e) => update('district', e.target.value)} className={inputCls}>
            {DISTRICTS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">运营状态</label>
          <select value={form.status} onChange={(e) => update('status', e.target.value)} className={inputCls}>
            <option value="operating">已运营</option>
            <option value="preparing">筹备中</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">排序（数字越小越靠前）</label>
          <input
            type="number"
            value={form.order}
            onChange={(e) => update('order', parseInt(e.target.value) || 0)}
            className={inputCls}
          />
        </div>
      </div>

      {/* 特色标签 */}
      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider pt-2">特色标签</div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">标签文字</label>
          <input
            type="text"
            value={form.spotlightLabel}
            onChange={(e) => update('spotlightLabel', e.target.value)}
            placeholder="如：NBOPC 总部 / 云创 Labo"
            className={inputCls}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">标签配色</label>
          <select
            value={form.spotlightColor}
            onChange={(e) => update('spotlightColor', e.target.value)}
            className={inputCls}
          >
            {SPOTLIGHT_COLORS.map((c) => (
              <option key={c.key} value={c.key}>{c.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 详情信息 */}
      <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider pt-2">详情信息</div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">运营方</label>
        <input type="text" value={form.operator} onChange={(e) => update('operator', e.target.value)} className={inputCls} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">启动时间</label>
          <input type="text" value={form.launchTime} onChange={(e) => update('launchTime', e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">空间规模</label>
          <input type="text" value={form.scale} onChange={(e) => update('scale', e.target.value)} className={inputCls} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">地址</label>
        <input type="text" value={form.address} onChange={(e) => update('address', e.target.value)} className={inputCls} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">定位</label>
        <textarea rows={2} value={form.positioning} onChange={(e) => update('positioning', e.target.value)} className={inputCls} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          领域标签 <span className="text-gray-400 font-normal">（每行一个）</span>
        </label>
        <textarea
          rows={4}
          value={form.features}
          onChange={(e) => update('features', e.target.value)}
          placeholder={'AI 影视\n数据标注\n内容电商'}
          className={inputCls}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          服务特色 <span className="text-gray-400 font-normal">（每行一条，弹窗详情展示）</span>
        </label>
        <textarea
          rows={6}
          value={form.highlights}
          onChange={(e) => update('highlights', e.target.value)}
          placeholder={'NewBoss 0574 支持体系\n沙龙、路演、赛事等社交活动'}
          className={inputCls}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">政策扶持</label>
        <textarea rows={3} value={form.policy} onChange={(e) => update('policy', e.target.value)} className={inputCls} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">合作生态</label>
        <textarea rows={2} value={form.ecosystem} onChange={(e) => update('ecosystem', e.target.value)} className={inputCls} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">代表企业 / 项目</label>
        <textarea rows={2} value={form.representatives} onChange={(e) => update('representatives', e.target.value)} className={inputCls} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">服务包</label>
        <input type="text" value={form.servicePackages} onChange={(e) => update('servicePackages', e.target.value)} className={inputCls} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">备注</label>
        <textarea rows={2} value={form.notes} onChange={(e) => update('notes', e.target.value)} className={inputCls} />
      </div>

      <div className="flex items-center gap-2 pt-2">
        <input
          type="checkbox"
          id="visible"
          checked={form.visible}
          onChange={(e) => update('visible', e.target.checked)}
          className="rounded"
        />
        <label htmlFor="visible" className="text-sm text-gray-700">前台可见</label>
      </div>

      <div className="flex gap-3 pt-4 border-t border-gray-100">
        <button
          type="submit"
          disabled={saving}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 text-sm"
        >
          {saving ? '保存中...' : submitLabel}
        </button>
        <button
          type="button"
          onClick={() => router.push('/admin/communities')}
          className="px-6 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
        >
          取消
        </button>
      </div>
    </form>
  )
}
