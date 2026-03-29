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

/* ---------- static data ---------- */

const AI_MODELS = [
  { name: 'DeepSeek', desc: '国产开源大模型领军者', initial: 'D', gradient: 'from-blue-600 to-cyan-500' },
  { name: '通义千问', desc: '阿里云AI大模型', initial: '通', gradient: 'from-orange-500 to-amber-400' },
  { name: 'Kimi', desc: '长文本理解专家', initial: 'K', gradient: 'from-indigo-500 to-purple-500' },
  { name: 'Claude', desc: 'Anthropic AI助手', initial: 'C', gradient: 'from-amber-600 to-yellow-400' },
]

const CLOUD_SERVICES = [
  { name: '移动云', desc: 'OPC专属优惠', initial: '移', gradient: 'from-blue-500 to-blue-600' },
  { name: '华为云', desc: '创业者扶持计划', initial: '华', gradient: 'from-red-500 to-rose-500' },
  { name: '腾讯云', desc: '初创企业套餐', initial: '腾', gradient: 'from-blue-400 to-indigo-500' },
]

const POLICY_ITEMS = [
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

/* ---------- page ---------- */

export default function ResourcesPage() {
  const [membersWithProducts, setMembersWithProducts] = useState<OpcMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/public/opc-members')
      .then((res) => res.json())
      .then((json) => {
        const all: OpcMember[] = json.data || []
        setMembersWithProducts(all.filter((m) => m.productName))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {AI_MODELS.map((model) => (
              <div
                key={model.name}
                className="bg-[#132238] rounded-2xl border border-white/10 p-6 hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${model.gradient} flex items-center justify-center text-white font-bold text-lg mb-4 shadow-md`}
                >
                  {model.initial}
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{model.name}</h3>
                <p className="text-sm text-gray-400 mb-5">{model.desc}</p>
                <button
                  disabled
                  className="w-full py-2 rounded-lg text-sm font-medium text-gray-500 bg-white/5 border border-white/10 cursor-not-allowed"
                >
                  即将开放
                </button>
              </div>
            ))}
            {/* More coming card */}
            <div className="bg-[#132238] rounded-2xl border border-dashed border-white/10 p-6 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-gray-500 mb-4">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </div>
              <h3 className="text-base font-medium text-gray-400 mb-1">更多模型</h3>
              <p className="text-sm text-gray-400">持续接入中...</p>
            </div>
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
              与主流云服务商合作，为 OPC 创业者提供专属优惠和扶持计划
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {CLOUD_SERVICES.map((svc) => (
              <div
                key={svc.name}
                className="bg-[#132238] rounded-2xl border border-white/10 p-6 hover:shadow-md transition-shadow"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${svc.gradient} flex items-center justify-center text-white font-bold text-lg mb-4 shadow-md`}
                >
                  {svc.initial}
                </div>
                <h3 className="text-lg font-semibold text-white mb-1">{svc.name}</h3>
                <p className="text-sm text-gray-400 mb-5">{svc.desc}</p>
                <button
                  disabled
                  className="w-full py-2 rounded-lg text-sm font-medium text-gray-500 bg-white/5 border border-white/10 cursor-not-allowed"
                >
                  即将开放
                </button>
              </div>
            ))}
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
