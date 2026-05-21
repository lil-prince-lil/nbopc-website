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
  '内测中': 'bg-amber-50 text-amber-700 border border-amber-200',
  '公测中': 'bg-[#2857A4]/5 text-[#2857A4] border border-[#2857A4]/30',
  '已上线': 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  '开发中': 'bg-purple-50 text-purple-700 border border-purple-200',
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative py-16 sm:py-20 overflow-hidden bg-white border-b border-gray-100">
        <div
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(40, 87, 164, 0.06), transparent 70%), radial-gradient(ellipse 40% 30% at 80% 90%, rgba(255, 140, 0, 0.05), transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="eyebrow mb-4">RESOURCES</div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">赋能资源</h1>
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto">
            突出专委会平台「赋能」定位，为委员与生态伙伴提供全方位资源支撑
          </p>
        </div>
      </section>

      {/* Section 1: AI Models */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 flex items-center gap-3">
              <span className="w-1.5 h-8 rounded-full bg-[#2857A4] inline-block" />
              AI 大模型 API
            </h2>
            <p className="text-gray-500 max-w-2xl">
              为 OPC 创业者提供主流 AI 大模型的 API 接入服务，降低 AI 应用开发门槛
            </p>
          </div>

          {/* 可选模型清单（按类别展示） */}
          <div className="space-y-5">
            {AI_MODEL_CATEGORIES.map((cat) => (
              <div key={cat.category} className="card-soft p-6 sm:p-7">
                <h3 className="flex items-center gap-2.5 text-base sm:text-lg font-semibold text-gray-900 mb-4">
                  <span className={`w-2.5 h-2.5 rounded-full bg-gradient-to-br ${cat.gradient}`} />
                  {cat.category}
                  <span className="ml-1 text-xs font-normal text-gray-500">共 {cat.models.length} 款</span>
                </h3>
                <div className="flex flex-wrap gap-2">
                  {cat.models.map((m) => (
                    <span
                      key={m}
                      className="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium text-gray-700 bg-gray-50 border border-gray-100"
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
              className="btn-accent inline-flex items-center gap-2 !px-7 !py-3 !rounded-xl !text-base"
            >
              申请 AI 模型 API
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
            <p className="mt-3 text-xs text-gray-500">提交后由专委会运营团队人工受理并为你开通</p>
          </div>
        </div>
      </section>

      {/* Section 2: Cloud Services */}
      <section className="bg-gray-50 py-16 sm:py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 flex items-center gap-3">
              <span className="w-1.5 h-8 rounded-full bg-[#FF8C00] inline-block" />
              云服务资源
            </h2>
            <p className="text-gray-500 max-w-2xl">
              为 OPC 创业者提供专属优惠和扶持计划，覆盖云主机与云电脑两类资源
            </p>
          </div>

          {/* 云主机 + 云电脑 双卡片 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="card-soft p-8 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#2857A4]/5 border border-[#2857A4]/20 flex items-center justify-center text-[#2857A4] mb-5">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">云主机</h3>
              <p className="text-sm text-gray-500">弹性计算服务器 · 部署 AI 应用与服务</p>
            </div>

            <div className="card-soft p-8 text-center">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#FF8C00]/5 border border-[#FF8C00]/20 flex items-center justify-center text-[#FF8C00] mb-5">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 0 1-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0 1 15 18.257V17.25m6-12V15a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 15V5.25m18 0A2.25 2.25 0 0 0 18.75 3H5.25A2.25 2.25 0 0 0 3 5.25m18 0V12a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 12V5.25" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">云电脑</h3>
              <p className="text-sm text-gray-500">远程桌面与 GPU 算力 · 适合模型训练与图形处理</p>
            </div>
          </div>

          {/* 统一申请入口 */}
          <div className="mt-10 flex flex-col items-center text-center">
            <a
              href={CLOUD_APPLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2 !px-7 !py-3 !rounded-xl !text-base"
            >
              申请云资源
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
            <p className="mt-3 text-xs text-gray-500">提交后由专委会运营团队人工受理并为你开通</p>
          </div>
        </div>
      </section>

      {/* Section 3: OPC Products */}
      <section className="bg-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 flex items-center gap-3">
              <span className="w-1.5 h-8 rounded-full bg-[#2857A4] inline-block" />
              OPC 自研产品
            </h2>
            <p className="text-gray-500 max-w-2xl">由 OPC 社区成员自主研发的 AI 产品与工具，欢迎体验与合作</p>
          </div>
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="card-soft p-6 animate-pulse">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gray-100" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-gray-100 rounded w-2/3" />
                      <div className="h-3 bg-gray-100 rounded w-1/3" />
                    </div>
                  </div>
                  <div className="h-3 bg-gray-100 rounded w-full mb-1" />
                  <div className="h-3 bg-gray-100 rounded w-3/4" />
                </div>
              ))}
            </div>
          ) : membersWithProducts.length === 0 ? (
            <div className="text-center py-12 text-gray-500">暂无产品</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {membersWithProducts.map((member, i) => {
                const gradient = member.avatar || GRADIENTS[i % GRADIENTS.length]
                return (
                  <Link
                    key={member.id}
                    href={`/atlas/${member.id}`}
                    className="group card-soft p-6 hover:-translate-y-1"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-lg shrink-0`}
                      >
                        {member.productName.charAt(0)}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#2857A4] transition-colors">
                            {member.productName}
                          </h3>
                          {member.productStage && (
                            <span
                              className={`px-2 py-0.5 rounded-full text-xs font-medium ${STAGE_COLORS[member.productStage] || 'bg-gray-100 text-gray-500'}`}
                            >
                              {member.productStage}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">by {member.name}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{member.productDesc}</p>
                    <div className="mt-4 flex items-center text-xs text-[#2857A4] group-hover:text-[#1E4580] transition-colors">
                      <span>查看详情</span>
                      <svg
                        className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-0.5 transition-transform"
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
      <section className="bg-gray-50 py-16 sm:py-20 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 flex items-center gap-3">
              <span className="w-1.5 h-8 rounded-full bg-[#FF8C00] inline-block" />
              政策与产业资源
            </h2>
            <p className="text-gray-500 max-w-2xl">连接宁波本地政策与产业资源，为 AI 创业者提供全方位支撑</p>
          </div>
          <div className="space-y-4">
            {POLICY_ITEMS.map((item) => (
              <div key={item.title} className="card-soft p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#2857A4]/5 border border-[#2857A4]/20 flex items-center justify-center text-[#2857A4] shrink-0 mt-0.5">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
