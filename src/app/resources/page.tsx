'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface OpcMember {
  id: string
  name: string
  avatar: string
  productName: string
  productDesc: string
  productStage: string
}

/* ---------- default data ---------- */

// AI 模型按类别展示（过渡阶段：统一走飞书表单申请，人工开通）
const AI_MODEL_CATEGORIES: Array<{ category: string; gradient: string; models: string[] }> = [
  {
    category: '大语言模型',
    gradient: 'from-blue-500 to-indigo-500',
    models: ['MiniMax-M2.5', 'DeepSeek-R1', 'DeepSeek-V3', 'qwen3-max', 'qwen3.5-plus'],
  },
  {
    category: '图像模型',
    gradient: 'from-pink-500 to-rose-500',
    models: ['Doubao-Seedream-5.0-lite', 'Doubao-Seedream-4.5', 'qwen-image-2.0-pro', 'qwen-image-2.0'],
  },
  {
    category: '视频模型',
    gradient: 'from-purple-500 to-fuchsia-500',
    models: ['Doubao-Seedance-2.0-fast', 'Doubao-Seedance-2.0', 'Doubao-Seedance-1.5-pro', 'wan2.6-t2v'],
  },
  {
    category: '语音模型',
    gradient: 'from-emerald-500 to-teal-500',
    models: ['CosyVoice', 'SenseVoice', 'qwen3-tts-instruct-flash', 'qwen3-asr-flash-filetrans', 'qwen3-asr-flash-realtime', 'cosyvoice-v3.5-flash'],
  },
  {
    category: '图形化界面模型',
    gradient: 'from-amber-500 to-orange-500',
    models: ['gui-plus'],
  },
]

const DEFAULT_POLICY_ITEMS = [
  { title: '宁波市OPC专项扶持政策', desc: '针对AI原生一人公司的专项扶持政策，包括资金补贴、税收优惠等' },
  { title: '产业对接：制造业、外贸、跨境电商', desc: '连接宁波优势产业资源，助力AI创业者找到落地场景' },
  { title: '宁波大数据交易中心', desc: '提供合规数据交易服务，为AI创业者提供数据资源支撑' },
]

const STAGE_COLORS: Record<string, string> = {
  '内测中': 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  '公测中': 'bg-[#2857A4]/10 text-[#2857A4] border border-[#2857A4]/20',
  '已上线': 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  '开发中': 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
}

const GRADIENTS = [
  'from-blue-500 to-purple-600',
  'from-purple-500 to-pink-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
  'from-rose-500 to-red-500',
  'from-cyan-500 to-blue-500',
]

// 飞书申请表单（过渡方案：人工受理开通资源）
const AI_MODEL_APPLY_URL = 'https://pq2povrxukm.feishu.cn/share/base/form/shrcnn8RPGyQRcGrwlpAZj6aqAh'
const CLOUD_APPLY_URL = 'https://pq2povrxukm.feishu.cn/share/base/form/shrcn7iegcRELlh9rVb1ySQ6G8c'

/* ---------- page ---------- */

export default function ResourcesPage() {
  const [membersWithProducts, setMembersWithProducts] = useState<OpcMember[]>([])
  const [loading, setLoading] = useState(true)
  const [POLICY_ITEMS, setPolicyItems] = useState(DEFAULT_POLICY_ITEMS)

  useEffect(() => {
    fetch('/api/public/opc-members')
      .then((res) => res.json())
      .then((json) => {
        const all: OpcMember[] = json.data || []
        setMembersWithProducts(all.filter((m) => m.productName))
      })
      .catch(() => {})
      .finally(() => setLoading(false))

    fetch('/api/public/config')
      .then(res => res.json())
      .then(data => {
        const c = data.data || {}
        try {
          if (c.resources_policy) {
            const items = JSON.parse(c.resources_policy)
            setPolicyItems(items.map((p: { title: string; description: string }) => ({
              title: p.title, desc: p.description
            })))
          }
        } catch {}
      })
      .catch(() => {})
  }, [])

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        className="relative py-20 sm:py-28 overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, #0F172A 0%, #1e1b4b 50%, #312e81 100%)',
        }}
      >
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div
          className="absolute w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #1EAF8E, transparent)',
            top: '10%',
            left: '20%',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            资源
          </h1>
          <p className="text-lg sm:text-xl text-sky-200/80 max-w-2xl mx-auto">
            助力 OPC 创业者的全方位资源生态
          </p>
        </div>
      </section>

      {/* Section 1: AI Models */}
      <section className="bg-[#0B1628] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 flex items-center gap-3">
              <span className="w-1.5 h-8 rounded-full bg-gradient-to-b from-primary to-secondary inline-block" />
              AI 大模型 API
            </h2>
            <p className="text-gray-400 max-w-2xl">
              为 OPC 创业者提供主流 AI 大模型的 API 接入服务，降低 AI 应用开发门槛
            </p>
          </div>

          {/* 可选模型清单（按类别展示） */}
          <div className="space-y-6">
            {AI_MODEL_CATEGORIES.map((cat) => (
              <div key={cat.category} className="bg-[#132238] rounded-2xl border border-white/10 p-6 sm:p-7">
                <h3 className="flex items-center gap-2.5 text-base sm:text-lg font-semibold text-white mb-4">
                  <span className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${cat.gradient}`} />
                  {cat.category}
                  <span className="ml-1 text-xs font-normal text-gray-500">
                    共 {cat.models.length} 款
                  </span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.models.map((m) => (
                    <span
                      key={m}
                      className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium text-gray-200 bg-white/5 border border-white/10"
                    >
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* 统一申请入口 */}
          <div className="mt-10 flex flex-col items-center text-center">
            <a
              href={AI_MODEL_APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-semibold text-base bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity shadow-md shadow-primary/20"
            >
              申请 AI 模型 API
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
            <p className="mt-3 text-xs text-gray-500">
              提交后由 NB OPC 社区运营团队人工受理并为你开通
            </p>
          </div>
        </div>
      </section>

      {/* Section 2: Cloud Services */}
      <section className="bg-[#0F1D32] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 flex items-center gap-3">
              <span className="w-1.5 h-8 rounded-full bg-gradient-to-b from-secondary to-accent inline-block" />
              云服务资源
            </h2>
            <p className="text-gray-400 max-w-2xl">
              与移动云合作，为 OPC 创业者提供专属优惠和扶持计划
            </p>
          </div>

          {/* 移动云卡片（居中展示） */}
          <div className="max-w-md mx-auto">
            <div className="bg-[#132238] rounded-2xl border border-white/10 p-8 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-bold text-2xl mb-5 shadow-md">
                移
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">移动云</h3>
              <p className="text-sm text-gray-400">OPC 专属优惠 · 创业者扶持计划</p>
            </div>
          </div>

          {/* 统一申请入口 */}
          <div className="mt-10 flex flex-col items-center text-center">
            <a
              href={CLOUD_APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-white font-semibold text-base bg-gradient-to-r from-secondary to-accent hover:opacity-90 transition-opacity shadow-md shadow-secondary/20"
            >
              申请云资源
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
            <p className="mt-3 text-xs text-gray-500">
              提交后由 NB OPC 社区运营团队人工受理并为你开通
            </p>
          </div>
        </div>
      </section>

      {/* Section 3: OPC Products */}
      <section className="bg-[#0B1628] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 flex items-center gap-3">
              <span className="w-1.5 h-8 rounded-full bg-gradient-to-b from-primary to-accent inline-block" />
              OPC 自研产品
            </h2>
            <p className="text-gray-400 max-w-2xl">
              由 OPC 社区成员自主研发的 AI 产品与工具，欢迎体验与合作
            </p>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-[#132238] rounded-2xl border border-white/10 p-6 animate-pulse">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-white/5 rounded w-2/3" />
                      <div className="h-3 bg-white/5 rounded w-1/3" />
                    </div>
                  </div>
                  <div className="h-3 bg-white/5 rounded w-full mb-1" />
                  <div className="h-3 bg-white/5 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : membersWithProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-400">暂无产品</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {membersWithProducts.map((member, i) => {
                const gradient = member.avatar || GRADIENTS[i % GRADIENTS.length]
                return (
                  <Link
                    key={member.id}
                    href={`/atlas/${member.id}`}
                    className="group bg-[#132238] rounded-2xl border border-white/10 p-6 hover:shadow-md hover:border-primary/20 transition-all"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-md`}
                      >
                        {member.productName.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-lg font-semibold text-white group-hover:text-primary transition-colors">
                            {member.productName}
                          </h3>
                          {member.productStage && (
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${STAGE_COLORS[member.productStage] || 'bg-white/10 text-gray-400'}`}
                            >
                              {member.productStage}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5">by {member.name}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed line-clamp-2">
                      {member.productDesc}
                    </p>
                    <div className="mt-4 flex items-center text-xs text-gray-400 group-hover:text-primary transition-colors">
                      <span>查看详情</span>
                      <svg
                        className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Section 4: Policy & Industry */}
      <section className="bg-[#0F1D32] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 flex items-center gap-3">
              <span className="w-1.5 h-8 rounded-full bg-gradient-to-b from-accent to-primary inline-block" />
              政策与产业资源
            </h2>
            <p className="text-gray-400 max-w-2xl">
              连接宁波本地政策与产业资源，为 AI 创业者提供全方位支撑
            </p>
          </div>
          <div className="space-y-4">
            {POLICY_ITEMS.map((item) => (
              <div
                key={item.title}
                className="bg-[#132238] rounded-2xl border border-white/10 p-6 hover:shadow-md transition-shadow flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent/20 to-primary/20 flex items-center justify-center text-primary shrink-0 mt-0.5">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-400">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
