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
  spotlight: { label: string; color: SpotlightColor }
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

/* ---------- data (整理自《宁波OPC社区完整信息汇总》2026-05) ---------- */

const COMMUNITIES: Community[] = [
  {
    id: 'duogehuoban',
    name: '多个伙伴 AI OPC 社区',
    shortName: '多个伙伴',
    district: '高新区',
    status: 'operating',
    spotlight: { label: 'NBOPC 总部', color: 'gold' },
    address: '宁波高新区 · 宁波软件园 D 幢 1-3 层',
    operator: '宁波市软件行业协会人工智能应用专委会 + 多个伙伴 AI 社群联合运营',
    scale: '约 3,000㎡（D 幢 1-3 层）',
    positioning: 'NBOPC 赋能中心总部 · 宁波软件园 OPC 项目集聚地',
    features: ['NBOPC 总部', '赋能中心', '免费工位', '导师辅导', '20+ 项目'],
    highlights: [
      '🎯 NBOPC 官方赋能中心总部，宁波 OPC 创业生态核心节点',
      '💎 入驻享 3-6 个月费用全免：房租、水电、网络费、物业费等全部费用都免',
      '🧑‍🏫 配备顶级导师团一对一辅导创业，覆盖产品 / 技术 / 商业化全流程',
      '🏢 位于宁波软件园 D 幢 1-3 层，约 3,000㎡ 专属空间',
      '🌐 已集聚 20+ OPC 创业项目，规模持续扩大',
    ],
    policy:
      '享受宁波市级 OPC 全部扶持政策（含九大核心政策：空间注册补贴、算力补贴最高 800 万、人才工程最高 100 万、"创业保"最高 6 万、场景数据开放、沙盒监管等），叠加 NBOPC 总部独家 3-6 个月全免福利',
  },
  {
    id: 'aiopc-baiyun',
    name: 'AiOPC 社区 · 白云街道（OPC 云创 Labo）',
    shortName: '白云 AiOPC',
    district: '海曙区',
    status: 'operating',
    spotlight: { label: '云创 Labo', color: 'sky' },
    address: '海曙区白云街道（甬水桥科创中心附近）',
    operator: '海曙区白云街道，联合宁波阿里中心、宁波人工智能产业研究院等多方力量',
    launchTime: '2025 年 12 月 31 日发布，2026 年初运营',
    scale: '汇聚十多个科技创业团队',
    features: ['AI 影视', 'AI 动物行为分析', '数据标注', '内容电商'],
    highlights: [
      'NewBoss 0574 支持体系',
      'AiOPC 工具库（500+ 免费 / 低偿轻量化 AI 工具）',
      '沙龙、路演、赛事等社交活动',
      'OpenClaw 部署实战培训',
    ],
    policy:
      '免费工位（5㎡ 起，最长免租 3 年）；打印、设备租赁最低半价；年度算力补贴（政府补贴最高 50%，上限 30 万元）；半年人才驿站免费住',
    representatives: '宁波冬寂科技（AI 动物行为分析）、宁波澜屿科技（AI 影视）',
  },
  {
    id: 'aiopc-gulou',
    name: 'AiOPC 社区 · 鼓楼街道',
    shortName: '鼓楼 AiOPC',
    district: '海曙区',
    status: 'operating',
    spotlight: { label: '路演定级', color: 'cyan' },
    address: '海曙区鼓楼街道辖区内存量楼宇改造',
    operator: '鼓楼街道主导，跨部门组建"一人公司"服务小组',
    launchTime: '2025 年底启动建设',
    features: ['标准化路演定级', '即时资源对接'],
    highlights: [
      '标准化"路演定级"流程：材料初筛 → 现场路演 → 工位定配',
      '为不同发展阶段的入驻企业提供精准化服务',
    ],
    policy: '与海曙区统一政策体系，享受 NewBoss 0574 全部扶持',
  },
  {
    id: 'aiopc-yuehu',
    name: 'AiOPC 社区 · 月湖街道',
    shortName: '月湖 AiOPC',
    district: '海曙区',
    status: 'operating',
    spotlight: { label: '政企校协同', color: 'teal' },
    address: '海曙区月湖街道辖区内',
    operator: '维科集团运营，宁波本地高校对接人才项目，政府搭台',
    launchTime: '2025 年底 — 2026 年初',
    positioning: '"政府搭台、企业主导、高校参与"三方协同',
    features: ['校企对接', '产业投资'],
    highlights: [
      '维科集团以产业资源和投资能力为后盾，为社区早期项目提供落地推力',
      '打通从校园到市场的过渡带',
      '对接产业投资资源',
    ],
    policy: '与海曙区统一政策体系',
  },
  {
    id: 'hi-opc',
    name: 'Hi-OPC 空间',
    shortName: 'Hi-OPC',
    district: '高新区',
    status: 'operating',
    spotlight: { label: '国企孵化标杆', color: 'violet' },
    address: '宁波高新区核心区（宁波软件园区域）',
    operator: '宁波高新区投资管理集团（国企平台）',
    launchTime: '2026 年 3 月 27 日正式启动',
    scale: '建筑面积超 7,000㎡',
    positioning: '专为 AI 创业者打造的人工智能专业孵化载体',
    features: ['AI 孵化标杆', '国企平台', '五大服务包'],
    highlights: [
      '"低成本物理空间 + AI 技术服务 + 政企资源对接"三位一体',
      '首批 6 家 OPC 企业入驻，包括灵算科技、绘梦文化科技',
      '全球首个商业龙虾管家项目（与灵算科技合作）',
      '"品质标+"质暖小站（与市场监管局联合设立）',
      '"OPC-AI 赋能实战班"培训体系',
      '首批"人工智能+"应用场景需求清单（涵盖九大场景）',
    ],
    ecosystem:
      '技术支持：光合组织、恒品极算等 6 家；算力支撑：宁波宁数智算 + 三大运营商共 4 家；链主企业：宁波普智未来、和利时卡优倍等 6 家；金融机构：中国银行、宁波银行等 6 家',
    servicePackages: '金融、技术、算力、政策、场景五大服务包',
    policy: '低成本甚至免费工位；算力补贴；创业服务包免费使用；金融授信支持',
  },
  {
    id: 'beian',
    name: '北岸数字人力产业园（OPC 专区）',
    shortName: '北岸数字人力产业园',
    district: '江北区',
    status: 'operating',
    spotlight: { label: '数字人力', color: 'blue' },
    operator: '江北区',
    features: ['数字人力', 'AI + 房产'],
    highlights: [
      '提供 OPC 创业支持体系，已有 OPC 创业项目入驻',
      '江北区计划基于零创空间开展 AI 工具使用课程，帮助创业者解决"难上手"问题',
    ],
    representatives: '宁波哦啦啦信息科技有限公司（AI + 房产交易数据分析）',
  },
  {
    id: 'yaochuang',
    name: '"姚创+" OPC 社区',
    shortName: '姚创+',
    district: '余姚市',
    status: 'operating',
    spotlight: { label: '首张 AiOPC 执照', color: 'rose' },
    operator: '余姚市政府主导，"姚创+"服务品牌为抓手',
    positioning: '探索"前置合办"模式，助力符合条件的创业者在专业社区内落户',
    features: ['前置合办', '首张 AiOPC 营业执照'],
    highlights: [
      '余姚市市场监管局颁发了该市首张 AiOPC 营业执照',
      '探索"前置合办"模式，助力创业者落户专业社区',
    ],
    policy: '享受宁波市级 OPC 扶持政策',
  },
  {
    id: 'beilun',
    name: '"大自然工位"等 OPC 空间',
    shortName: '大自然工位',
    district: '北仑区',
    status: 'operating',
    spotlight: { label: '户外开放空间', color: 'lime' },
    address: '北仑区九峰片区',
    operator: '北仑区',
    positioning: '户外/开放式办公空间',
    features: ['户外办公', '开放式空间'],
    highlights: [
      '"大自然工位"——户外/开放式办公空间',
      '已有 OPC 创业者自发入驻办公',
    ],
    representatives:
      '宁波无中生有建筑设计有限公司（1 人 AI 建筑设计公司，年利润率高出传统团队 20%-30%）',
  },
  {
    id: 'idea-start',
    name: '宁波启迪·易得 Idea Start OPC 创业社区',
    shortName: '启迪·易得',
    district: '镇海区',
    status: 'operating',
    spotlight: { label: '启迪系孵化', color: 'indigo' },
    address: '启迪科技园（宁波）',
    operator: '启迪科技园（宁波）+ 浙江省易得融信软件有限公司 联合打造',
    launchTime: '2026 年 3 月启动',
    scale: '首期约 1,000㎡',
    positioning:
      '聚焦"AI+金融科技 / AI+企业服务 / AI+产业升级"等 5+X 核心方向，打造具有专业品牌影响力与自我造血能力的垂直领域 AI 创业社区，孵化"超级个体"',
    features: ['启迪系', 'AI+金融科技', 'AI+企业服务', '产业升级', '5+X 方向', '黑客松'],
    highlights: [
      '入驻项目可免费 / 优惠使用启迪科技园路演厅、会议室、培训教室等公共配套',
      '易得融信打造闭环流转系统：需求发布与获取、产品库、悬赏、审核',
      '提供真实业务场景需求侧反馈 + 共创机会 + 项目试点 + 验证性测试',
      '产业链上下游合作渠道、数据 / 算力资源、技术培训与行业业务辅导',
      '联合 OPC 项目开发可落地解决方案包，推动在政务、金融、园区企业试点',
      '联合宁波大学、宁波工程学院、宁波诺丁汉大学等高校共建联合实验室、实训基地、研究课题',
      '同步启动 OPC 创业社区黑客松大赛，面向全国创新团队与技术开发者招募',
    ],
  },
  {
    id: 'yongjiang',
    name: '甬江软件园 · OPC 专属空间',
    shortName: '甬江软件园 OPC',
    district: '高新区',
    status: 'preparing',
    spotlight: { label: '万平大空间', color: 'slate' },
    address: '宁波高新区（甬江软件园）',
    scale: '近 10,000㎡',
    operator: '甬江软件园',
    features: ['专属空间', '近万平方米'],
    highlights: ['正在筹备中，OPC 专属空间', '空间规模近 10,000㎡'],
  },
]

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
    className: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30',
  },
  preparing: {
    label: '筹备中',
    className: 'bg-amber-500/15 text-amber-300 border border-amber-500/30',
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

  const filtered = COMMUNITIES.filter((c) => {
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
    <div className="min-h-screen bg-[#0B1628]">
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
          style={{ background: 'radial-gradient(circle, #2857A4, transparent)', top: '10%', right: '20%' }}
        />
        <div
          className="absolute w-56 h-56 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, #1EAF8E, transparent)', bottom: '10%', left: '15%' }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            OPC 社区图谱
          </h1>
          <p className="text-lg sm:text-xl text-sky-200/80 max-w-3xl mx-auto leading-relaxed">
            宁波 AI 原生独立创业者的孵化生态 · 截至 2026 年 5 月
          </p>
          <p className="mt-4 text-sm text-sky-200/60 max-w-3xl mx-auto leading-relaxed">
            宁波市计划到 2028 年底打造 10 个以上市级标杆 OPC 社区，全市集聚 OPC 创业者超 1 万人
          </p>
        </div>
      </section>

      {/* Stats banner */}
      <section className="bg-[#0D1A2D] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#2857A4] to-[#1EAF8E] bg-clip-text text-transparent">
                  {s.value}
                </div>
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
            <span className="text-xs font-medium text-gray-500 mr-2 shrink-0">区域</span>
            {DISTRICTS.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDistrictFilter(d)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  districtFilter === d
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/20'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-medium text-gray-500 mr-2 shrink-0">状态</span>
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s.key}
                type="button"
                onClick={() => setStatusFilter(s.key)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  statusFilter === s.key
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/20'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* Card grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-gray-400">未找到符合条件的社区</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelected(c)}
                className="group text-left rounded-2xl p-6 bg-[#132238] border border-white/10 hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300"
              >
                {/* Spotlight tag (每个社区的核心特色) */}
                <div className="flex items-center mb-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${SPOTLIGHT_GRADIENTS[c.spotlight.color]} shadow-sm`}
                  >
                    {c.spotlight.label}
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

                {/* Name */}
                <h3 className="text-lg font-bold text-white mb-3 leading-tight group-hover:text-primary transition-colors">
                  {c.name}
                </h3>

                {/* Meta info */}
                <div className="space-y-2 text-sm text-gray-400 mb-4">
                  {c.operator && (
                    <div className="flex gap-2">
                      <span className="text-gray-500 shrink-0">运营方</span>
                      <span className="line-clamp-1">{c.operator}</span>
                    </div>
                  )}
                  {c.launchTime && (
                    <div className="flex gap-2">
                      <span className="text-gray-500 shrink-0">启动时间</span>
                      <span>{c.launchTime}</span>
                    </div>
                  )}
                  {c.scale && (
                    <div className="flex gap-2">
                      <span className="text-gray-500 shrink-0">规模</span>
                      <span>{c.scale}</span>
                    </div>
                  )}
                </div>

                {/* Feature tags */}
                {c.features.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {c.features.slice(0, 4).map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium text-gray-300 bg-white/5 border border-white/10"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                )}

                {/* CTA */}
                <div className="flex items-center text-xs text-gray-400 group-hover:text-primary transition-colors">
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
              </button>
            ))}
          </div>
        )}
      </section>

      {/* 市级九大政策 */}
      <section className="bg-[#0F1D32] py-16 sm:py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 flex items-center gap-3">
              <span className="w-1.5 h-8 rounded-full bg-gradient-to-b from-primary to-secondary inline-block" />
              市级九大政策支持
            </h2>
            <p className="text-gray-400 max-w-2xl">
              宁波市《关于支持人工智能 OPC 创新创业发展的若干意见》围绕 OPC 创新创业全生命周期提供九大核心政策
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {POLICIES.map((p) => (
              <div
                key={p.title}
                className="bg-[#132238] rounded-2xl border border-white/10 p-6 hover:border-primary/30 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center text-xl">
                    {p.icon}
                  </span>
                  <h3 className="text-base font-semibold text-white">{p.title}</h3>
                </div>
                <ul className="space-y-2">
                  {p.items.map((item) => (
                    <li key={item} className="flex gap-2 text-sm text-gray-400 leading-relaxed">
                      <span className="text-secondary mt-1.5 shrink-0 w-1 h-1 rounded-full bg-secondary inline-block" />
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
      <section className="bg-[#0B1628] py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 flex items-center gap-3">
              <span className="w-1.5 h-8 rounded-full bg-gradient-to-b from-secondary to-accent inline-block" />
              各区特色对比
            </h2>
            <p className="text-gray-400 max-w-2xl">
              不同区县基于本地资源差异化布局 OPC 社区，形成各具特色的孵化生态
            </p>
          </div>
          <div className="bg-[#132238] rounded-2xl border border-white/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-white/5 text-left">
                  <tr>
                    <th className="px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">区域</th>
                    <th className="px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">品牌 / 体系</th>
                    <th className="px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">核心特色</th>
                    <th className="px-5 py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">空间免租</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {DISTRICT_COMPARISON.map((row) => (
                    <tr key={row.district} className="hover:bg-white/[0.02] transition-colors">
                      <td className="px-5 py-4 text-white font-medium whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium text-white bg-gradient-to-br ${DISTRICT_GRADIENT[row.district] || 'from-gray-500 to-gray-600'}`}
                        >
                          {row.district}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-gray-300">{row.brand}</td>
                      <td className="px-5 py-4 text-gray-400 leading-relaxed">{row.feature}</td>
                      <td className="px-5 py-4 text-gray-300 whitespace-nowrap">{row.rentFree}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 数据来源说明 */}
      <section className="bg-[#0B1628] pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
            <h3 className="text-sm font-semibold text-white mb-3">关于本图谱</h3>
            <ul className="text-sm text-gray-400 leading-relaxed space-y-2">
              <li>
                <span className="text-gray-500">·</span> 宁波 OPC 社区生态正在快速扩展中，目前已有 10 余个社区运营、超 30 个项目筹备，信息可能随时更新
              </li>
              <li>
                <span className="text-gray-500">·</span> 部分社区（尤其海曙区老城区点位）利用的是分散的存量闲置空间，并非集中固定园区，精确门牌号建议联系各街道了解
              </li>
              <li>
                <span className="text-gray-500">·</span> 多数社区采用"项目申报 → 路演评审 → 工位分配"流程，建议关注各区官方公众号或通过 OPC 圈（opcquan.com）等平台获取最新入驻信息
              </li>
              <li>
                <span className="text-gray-500">·</span> 2026 年下半年预计将有更多社区正式亮相，本页面会持续更新
              </li>
            </ul>
            <p className="mt-4 text-xs text-gray-600">
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
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#132238] border border-white/10 rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* close */}
            <button
              type="button"
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors flex items-center justify-center"
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
              <div className="absolute inset-0 bg-[#132238]/30" />
              <div className="absolute bottom-3 left-6 flex items-center gap-2 flex-wrap">
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${SPOTLIGHT_GRADIENTS[selected.spotlight.color]} shadow-md`}
                >
                  {selected.spotlight.label}
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
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-5">{selected.name}</h3>

              {/* Meta grid */}
              <dl className="grid sm:grid-cols-2 gap-4 mb-6">
                {selected.operator && (
                  <div>
                    <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">运营方</dt>
                    <dd className="text-sm text-gray-200">{selected.operator}</dd>
                  </div>
                )}
                {selected.launchTime && (
                  <div>
                    <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">启动时间</dt>
                    <dd className="text-sm text-gray-200">{selected.launchTime}</dd>
                  </div>
                )}
                {selected.address && (
                  <div className="sm:col-span-2">
                    <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">地址</dt>
                    <dd className="text-sm text-gray-200">{selected.address}</dd>
                  </div>
                )}
                {selected.scale && (
                  <div>
                    <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">空间规模</dt>
                    <dd className="text-sm text-gray-200">{selected.scale}</dd>
                  </div>
                )}
                {selected.positioning && (
                  <div className="sm:col-span-2">
                    <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">定位</dt>
                    <dd className="text-sm text-gray-200">{selected.positioning}</dd>
                  </div>
                )}
              </dl>

              {/* Tags */}
              {selected.features.length > 0 && (
                <div className="mb-6">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">领域 / 标签</div>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.features.map((f) => (
                      <span
                        key={f}
                        className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-primary bg-primary/10 border border-primary/20"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Highlights */}
              {selected.highlights.length > 0 && (
                <div className="mb-6">
                  <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">服务特色</div>
                  <ul className="space-y-2">
                    {selected.highlights.map((h) => (
                      <li key={h} className="flex gap-2 text-sm text-gray-300 leading-relaxed">
                        <span className="text-secondary mt-1.5 shrink-0 w-1 h-1 rounded-full bg-secondary inline-block" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Other detail blocks */}
              {selected.ecosystem && (
                <DetailBlock label="合作生态" value={selected.ecosystem} />
              )}
              {selected.servicePackages && (
                <DetailBlock label="服务包" value={selected.servicePackages} />
              )}
              {selected.representatives && (
                <DetailBlock label="代表企业 / 项目" value={selected.representatives} />
              )}
              {selected.policy && (
                <DetailBlock label="政策扶持" value={selected.policy} />
              )}
              {selected.notes && (
                <DetailBlock label="备注" value={selected.notes} />
              )}
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
      <div className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1.5">{label}</div>
      <p className="text-sm text-gray-300 leading-relaxed">{value}</p>
    </div>
  )
}
