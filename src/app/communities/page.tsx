'use client'

import { useState, useEffect } from 'react'

/* ---------- types ---------- */

type Status = 'operating' | 'preparing'
type SpotlightColor = 'gold' | 'sky' | 'cyan' | 'teal' | 'violet' | 'blue' | 'rose' | 'lime' | 'slate' | 'indigo'

const SPOTLIGHT_GRADIENTS: Record<SpotlightColor, string> = {
  gold: 'from-amber-500 to-orange-500',
  sky: 'from-sky-500 to-blue-500',
  cyan: 'from-cyan-500 to-teal-500',
  teal: 'from-teal-500 to-emerald-500',
  violet: 'from-violet-500 to-purple-600',
  blue: 'from-blue-500 to-indigo-500',
  rose: 'from-rose-500 to-pink-500',
  lime: 'from-lime-500 to-green-500',
  slate: 'from-slate-500 to-slate-700',
  indigo: 'from-indigo-500 to-purple-500',
}

interface Community {
  id: string
  name: string
  shortName?: string
  district: string
  status: Status
  spotlightLabel: string
  spotlightColor: SpotlightColor
  address?: string
  operator: string
  launchTime?: string
  scale?: string
  positioning?: string
  features: string[]
  highlights: string[]
  policy?: string
  ecosystem?: string
  representatives?: string
  servicePackages?: string
  notes?: string
}

const DISTRICTS = ['全部', '海曙区', '高新区', '镇海区', '江北区', '余姚市', '北仑区'] as const
type DistrictFilter = (typeof DISTRICTS)[number]

const STATUS_OPTIONS: Array<{ key: Status | 'all'; label: string }> = [
  { key: 'all', label: '全部' },
  { key: 'operating', label: '已运营' },
  { key: 'preparing', label: '筹备中' },
]

/* ---------- 政策九条 ---------- */

const POLICIES = [
  {
    title: '空间与注册',
    icon: '🏢',
    items: [
      '盘活存量楼宇打造 OPC 社区',
      '"工位号"登记、一址多照',
      '场地租赁补贴最高 6,000 元',
      '社区运营补助最高 200 万',
    ],
  },
  {
    title: '算力与工具',
    icon: '⚡',
    items: [
      '宁波人工智能超算中心提供低成本算力',
      '各区县定额免费算力',
      '主流大模型 API 免费/低成本接入',
      '算力语料模型补贴最高 800 万',
    ],
  },
  {
    title: '人才与资金',
    icon: '🎓',
    items: [
      '甬江人才工程 OPC 赛道最高 100 万',
      '"AI 宁波"大赛最高 2,000 万投拨联动',
      '新引进人才安居补贴最高 300 万',
      '科创/消费券最高 25 万',
    ],
  },
  {
    title: '金融支持',
    icon: '💰',
    items: [
      '"OPC 创业贷"等专属信贷产品',
      'OPC 社区批量授信试点',
      '投资满 2 年按 10% 奖励',
      '天使引导基金加大早期投资',
    ],
  },
  {
    title: '创业保险（全国率先）',
    icon: '🛡️',
    items: [
      '创业失败基础补助最高 2 万',
      '带动就业补助最高 4 万',
      '"创业保"合计最高 6 万元',
    ],
  },
  {
    title: '场景与数据',
    icon: '🎯',
    items: [
      '开放政府/国企/龙头企业场景',
      '支持首购订购，提供"试验场"',
      '有序开放医疗、交通等数据',
      '数据产品奖励最高 35 万',
    ],
  },
  {
    title: '沙盒监管',
    icon: '📋',
    items: [
      '试点"沙盒监管"1-3 年观察期',
      '观察期以行政指导、风险提示为主',
      '提供数据安全、算法备案合规辅导',
    ],
  },
  {
    title: '线上服务',
    icon: '💻',
    items: [
      '线上 OPC 专区"一站式"服务',
      '整合政策、产品、市场资源',
      '建立运营虚拟社区',
    ],
  },
  {
    title: '生态建设',
    icon: '🌱',
    items: [
      '支持成立 OPC 创新创业联盟',
      '常态化举办创业大赛、路演',
      '协助数据知识产权登记与维权',
    ],
  },
]

/* ---------- 各区特色对比 ---------- */

const DISTRICT_COMPARISON = [
  {
    district: '海曙区',
    brand: 'NewBoss 0574 体系（AiOPC / 云创 Labo）',
    feature: '五维联动（空间+政策+场景+工具+服务）；500+ 免费 AI 工具；标准化路演定级；政企校三方协同',
    rentFree: '5㎡ 起，最长 3 年免租',
  },
  {
    district: '高新区',
    brand: '多个伙伴 AI OPC（NBOPC 总部）+ Hi-OPC 空间',
    feature: '多个伙伴：NBOPC 赋能中心总部，约 3,000㎡，顶级导师团一对一辅导；Hi-OPC：五大服务包（金融+技术+算力+政策+场景），7,000㎡+ 国企平台运营',
    rentFree: '多个伙伴 3-6 个月房租 / 水电 / 网络 / 物业全免；Hi-OPC 低成本 / 免费工位',
  },
  {
    district: '镇海区',
    brand: '启迪·易得 Idea Start',
    feature: '启迪系孵化 + 易得融信闭环流转系统；聚焦"5+X"核心方向（AI+金融科技 / 企业服务 / 产业升级）；联合宁大、宁工、宁诺等高校共建实验室',
    rentFree: '路演厅 / 会议室 / 培训教室等公共配套免费或优惠',
  },
  {
    district: '江北区',
    brand: '北岸数字人力产业园 + 零创空间',
    feature: '数字人力 + AI 工具使用课程培训；AI+房产等垂直方向落地',
    rentFree: '待确认',
  },
  {
    district: '余姚市',
    brand: '"姚创+"品牌',
    feature: '"前置合办"模式；颁发首张 AiOPC 营业执照；享市级 OPC 扶持政策',
    rentFree: '待确认',
  },
  {
    district: '北仑区',
    brand: '"大自然工位"',
    feature: '户外/开放式 OPC 创业空间；自发入驻办公',
    rentFree: '待确认',
  },
]

/* ---------- 顶部统计 ---------- */

const STATS = [
  { value: '10+', label: '已运营社区' },
  { value: '30+', label: '筹备中项目' },
  { value: '6+', label: '区县覆盖' },
  { value: '1万+', label: '2028 创业者目标' },
]

/* ---------- helpers ---------- */

const STATUS_BADGE: Record<Status, { label: string; className: string }> = {
  operating: {
    label: '已运营',
    className: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  },
  preparing: {
    label: '筹备中',
    className: 'bg-amber-50 text-amber-700 border border-amber-200',
  },
}

const DISTRICT_GRADIENT: Record<string, string> = {
  海曙区: 'from-blue-500 to-indigo-500',
  高新区: 'from-violet-500 to-purple-600',
  镇海区: 'from-fuchsia-500 to-pink-500',
  江北区: 'from-cyan-500 to-blue-500',
  余姚市: 'from-emerald-500 to-teal-500',
  北仑区: 'from-amber-500 to-orange-500',
}

/* ---------- page ---------- */

export default function CommunitiesPage() {
  const [districtFilter, setDistrictFilter] = useState<DistrictFilter>('全部')
  const [statusFilter, setStatusFilter] = useState<Status | 'all'>('all')
  const [selected, setSelected] = useState<Community | null>(null)
  const [communities, setCommunities] = useState<Community[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/public/communities')
      .then((res) => res.json())
      .then((json) => setCommunities(json.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filtered = communities.filter((c) => {
    if (districtFilter !== '全部' && c.district !== districtFilter) return false
    if (statusFilter !== 'all' && c.status !== statusFilter) return false
    return true
  })

  // 关闭弹窗：ESC + 滚动锁
  useEffect(() => {
    if (!selected) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setSelected(null)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [selected])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative py-16 sm:py-20 overflow-hidden bg-white border-b border-gray-100">
        <div
          className="absolute inset-0 opacity-60 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(40, 87, 164, 0.06), transparent 70%), radial-gradient(ellipse 40% 30% at 80% 90%, rgba(255, 140, 0, 0.05), transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="eyebrow mb-4">COMMUNITY ATLAS</div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">专委会图谱</h1>
          <p className="text-lg sm:text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
            宁波 AI 原生独立创业者的孵化生态 · 截至 2026 年 5 月
          </p>
          <p className="mt-4 text-sm text-gray-500 max-w-3xl mx-auto leading-relaxed">
            宁波市计划到 2028 年底打造 10 个以上市级标杆 OPC 社区，全市集聚 OPC 创业者超 1 万人
          </p>
        </div>
      </section>

      {/* Stats banner */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#2857A4]">{s.value}</div>
                <div className="mt-1 text-xs sm:text-sm text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters + Cards */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filters */}
        <div className="space-y-3 mb-8">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="eyebrow mr-2 shrink-0">区域</span>
            {DISTRICTS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDistrictFilter(d)}
                className={`chip ${districtFilter === d ? 'chip-active' : ''}`}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="eyebrow mr-2 shrink-0">状态</span>
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setStatusFilter(s.key)}
                className={`chip ${statusFilter === s.key ? 'chip-active' : ''}`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Card grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="card-soft p-6 animate-pulse">
                <div className="h-5 w-20 bg-gray-100 rounded-full mb-3" />
                <div className="h-4 w-28 bg-gray-100 rounded mb-4" />
                <div className="h-5 bg-gray-100 rounded w-3/4 mb-3" />
                <div className="h-3 bg-gray-100 rounded w-full mb-2" />
                <div className="h-3 bg-gray-100 rounded w-2/3" />
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-500">未找到符合条件的社区</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelected(c)}
                className="group text-left card-soft p-6 hover:-translate-y-1"
              >
                {/* Spotlight tag */}
                <div className="flex items-center mb-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${SPOTLIGHT_GRADIENTS[c.spotlightColor] || SPOTLIGHT_GRADIENTS.blue} shadow-sm`}
                  >
                    {c.spotlightLabel}
                  </span>
                </div>

                {/* District + Status */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-br ${DISTRICT_GRADIENT[c.district] || 'from-gray-500 to-gray-600'}`}
                  >
                    {c.district}
                  </span>
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_BADGE[c.status].className}`}
                  >
                    {STATUS_BADGE[c.status].label}
                  </span>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight group-hover:text-[#2857A4] transition-colors">
                  {c.name}
                </h3>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  {c.operator && (
                    <div className="flex gap-2">
                      <span className="text-gray-400 shrink-0">运营方</span>
                      <span className="line-clamp-1">{c.operator}</span>
                    </div>
                  )}
                  {c.launchTime && (
                    <div className="flex gap-2">
                      <span className="text-gray-400 shrink-0">启动时间</span>
                      <span>{c.launchTime}</span>
                    </div>
                  )}
                  {c.scale && (
                    <div className="flex gap-2">
                      <span className="text-gray-400 shrink-0">规模</span>
                      <span>{c.scale}</span>
                    </div>
                  )}
                </div>

                {c.features.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {c.features.slice(0, 4).map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium text-gray-700 bg-gray-50 border border-gray-200"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center text-xs text-[#2857A4] group-hover:text-[#1E4580] transition-colors">
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
              </button>
            ))}
          </div>
        )}
      </section>

      {/* 市级九大政策 */}
      <section className="bg-white py-16 sm:py-20 border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 flex items-center gap-3">
              <span className="w-1.5 h-8 rounded-full bg-[#2857A4] inline-block" />
              市级九大政策支持
            </h2>
            <p className="text-gray-500 max-w-2xl">
              宁波市《关于支持人工智能 OPC 创新创业发展的若干意见》围绕 OPC 创新创业全生命周期提供九大核心政策
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {POLICIES.map((p) => (
              <div key={p.title} className="card-soft p-6">
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-xl bg-[#2857A4]/5 border border-[#2857A4]/20 flex items-center justify-center text-xl">
                    {p.icon}
                  </span>
                  <h3 className="text-base font-semibold text-gray-900">{p.title}</h3>
                </div>
                <ul className="space-y-2">
                  {p.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-gray-600 leading-relaxed">
                      <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-[#FF8C00] inline-block" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 各区特色政策对比 */}
      <section className="bg-gray-50 py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3 flex items-center gap-3">
              <span className="w-1.5 h-8 rounded-full bg-[#FF8C00] inline-block" />
              各区特色对比
            </h2>
            <p className="text-gray-500 max-w-2xl">
              不同区县基于本地资源差异化布局 OPC 社区，形成各具特色的孵化生态
            </p>
          </div>
          <div className="card-soft overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 text-left border-b border-gray-100">
                  <tr>
                    <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">区域</th>
                    <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">品牌 / 体系</th>
                    <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">核心特色</th>
                    <th className="px-5 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">空间免租</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {DISTRICT_COMPARISON.map((row) => (
                    <tr key={row.district} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-br ${DISTRICT_GRADIENT[row.district] || 'from-gray-500 to-gray-600'}`}
                        >
                          {row.district}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-700 font-medium">{row.brand}</td>
                      <td className="px-5 py-4 text-gray-600 leading-relaxed">{row.feature}</td>
                      <td className="px-5 py-4 text-gray-700 whitespace-nowrap">{row.rentFree}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 数据来源说明 */}
      <section className="bg-gray-50 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="card-soft p-6">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">关于本图谱</h3>
            <ul className="text-sm text-gray-600 leading-relaxed space-y-2">
              <li>
                <span className="text-gray-400">·</span> 宁波 OPC 社区生态正在快速扩展中，目前已有 10 余个社区运营、超 30 个项目筹备，信息可能随时更新
              </li>
              <li>
                <span className="text-gray-400">·</span> 部分社区（尤其海曙区老城区点位）利用的是分散的存量闲置空间，并非集中固定园区，精确门牌号建议联系各街道了解
              </li>
              <li>
                <span className="text-gray-400">·</span> 多数社区采用"项目申报 → 路演评审 → 工位分配"流程，建议关注各区官方公众号或通过 OPC 圈（opcquan.com）等平台获取最新入驻信息
              </li>
              <li>
                <span className="text-gray-400">·</span> 2026 年下半年预计将有更多社区正式亮相，本页面会持续更新
              </li>
            </ul>
            <p className="mt-4 text-xs text-gray-500">
              数据来源：浙江日报、央广网、中国经营报、宁波市政府公开文件、新华网等公开报道，截至 2026 年 5 月初
            </p>
          </div>
        </div>
      </section>

      {/* Detail Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={() => setSelected(null)}
        >
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white border border-gray-100 rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.15)]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg bg-white/80 backdrop-blur-sm hover:bg-white text-gray-600 hover:text-gray-900 transition-colors flex items-center justify-center shadow-sm"
              aria-label="关闭"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>

            {/* gradient header */}
            <div
              className={`relative h-24 bg-gradient-to-br ${DISTRICT_GRADIENT[selected.district] || 'from-gray-500 to-gray-600'}`}
            >
              <div className="absolute bottom-3 left-6 flex items-center gap-2 flex-wrap">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${SPOTLIGHT_GRADIENTS[selected.spotlightColor] || SPOTLIGHT_GRADIENTS.blue} shadow-md`}
                >
                  {selected.spotlightLabel}
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium text-white bg-black/30 backdrop-blur-sm">
                  {selected.district}
                </span>
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${STATUS_BADGE[selected.status].className}`}
                >
                  {STATUS_BADGE[selected.status].label}
                </span>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5">{selected.name}</h3>

              <dl className="grid sm:grid-cols-2 gap-4 mb-6">
                {selected.operator && (
                  <div>
                    <dt className="eyebrow mb-1">运营方</dt>
                    <dd className="text-sm text-gray-700">{selected.operator}</dd>
                  </div>
                )}
                {selected.launchTime && (
                  <div>
                    <dt className="eyebrow mb-1">启动时间</dt>
                    <dd className="text-sm text-gray-700">{selected.launchTime}</dd>
                  </div>
                )}
                {selected.address && (
                  <div className="sm:col-span-2">
                    <dt className="eyebrow mb-1">地址</dt>
                    <dd className="text-sm text-gray-700">{selected.address}</dd>
                  </div>
                )}
                {selected.scale && (
                  <div>
                    <dt className="eyebrow mb-1">空间规模</dt>
                    <dd className="text-sm text-gray-700">{selected.scale}</dd>
                  </div>
                )}
                {selected.positioning && (
                  <div className="sm:col-span-2">
                    <dt className="eyebrow mb-1">定位</dt>
                    <dd className="text-sm text-gray-700">{selected.positioning}</dd>
                  </div>
                )}
              </dl>

              {selected.features.length > 0 && (
                <div className="mb-6">
                  <div className="eyebrow mb-2">领域 / 标签</div>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.features.map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-[#2857A4] bg-[#2857A4]/5 border border-[#2857A4]/30"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selected.highlights.length > 0 && (
                <div className="mb-6">
                  <div className="eyebrow mb-2">服务特色</div>
                  <ul className="space-y-2">
                    {selected.highlights.map((h) => (
                      <li key={h} className="flex gap-2 text-sm text-gray-700 leading-relaxed">
                        <span className="mt-1.5 shrink-0 w-1 h-1 rounded-full bg-[#FF8C00] inline-block" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {selected.ecosystem && <DetailBlock label="合作生态" value={selected.ecosystem} />}
              {selected.servicePackages && <DetailBlock label="服务包" value={selected.servicePackages} />}
              {selected.representatives && <DetailBlock label="代表企业 / 项目" value={selected.representatives} />}
              {selected.policy && <DetailBlock label="政策扶持" value={selected.policy} />}
              {selected.notes && <DetailBlock label="备注" value={selected.notes} />}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function DetailBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="mb-5">
      <div className="eyebrow mb-1.5">{label}</div>
      <p className="text-sm text-gray-700 leading-relaxed">{value}</p>
    </div>
  )
}
