export interface MemberProduct {
  name: string
  description: string
  detailDescription: string
  stage: '内测中' | '公测中' | '已上线' | '开发中'
  link?: string
}

export interface Member {
  id: number
  name: string
  title: string
  quote: string
  category: string
  avatar: string // gradient colors for placeholder
  product?: MemberProduct
  about: string
  skills: string[]
  currentWork: string
}

export const CATEGORIES = [
  '全部',
  'AI工具',
  '跨境电商',
  '设计创意',
  '医疗健康',
  '其他',
] as const

export type Category = (typeof CATEGORIES)[number]

const GRADIENTS = [
  'from-blue-500 to-purple-600',
  'from-purple-500 to-pink-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
  'from-rose-500 to-red-500',
  'from-cyan-500 to-blue-500',
  'from-violet-500 to-indigo-500',
  'from-lime-500 to-green-500',
  'from-fuchsia-500 to-purple-500',
  'from-sky-500 to-indigo-500',
  'from-teal-500 to-cyan-500',
]

export const MEMBERS: Member[] = [
  {
    id: 1,
    name: 'Miranda',
    title: 'AI工具爱好者，跨境电商独立站资深专家',
    quote: '我的KPI：让每个独立站卖家，都养得起自己的"龙虾"。',
    category: '跨境电商',
    avatar: GRADIENTS[0],
    product: {
      name: 'Site Peak AI',
      description: 'AI驱动的独立站优化工具',
      detailDescription:
        'Site Peak AI 是一款专为跨境电商独立站卖家打造的 AI 优化工具，通过智能分析网站数据、优化 SEO 策略、提升转化率，帮助卖家用更低成本获取更多订单。',
      stage: '公测中',
    },
    about: '拥有多年跨境电商独立站运营经验，深耕 Shopify、WordPress 等平台。热衷于将 AI 技术应用于电商场景，帮助中小卖家降本增效。',
    skills: ['跨境电商', '独立站运营', 'SEO优化', 'AI工具', 'Shopify'],
    currentWork: '正在打造 Site Peak AI，一款 AI 驱动的独立站优化工具，帮助卖家提升网站转化率。',
  },
  {
    id: 2,
    name: '墨点星痕',
    title: '软件设计师·AI工具爱好者·医疗软件开发7年',
    quote: 'AI是人生的星际航线',
    category: '医疗健康',
    avatar: GRADIENTS[1],
    product: {
      name: '全球视野自媒体工作平台',
      description: '一站式自媒体内容创作与分发平台',
      detailDescription:
        '全球视野自媒体工作平台集成了 AI 辅助写作、多平台分发、数据分析等功能，帮助自媒体创作者高效产出优质内容并触达全球受众。',
      stage: '内测中',
      link: 'https://freecodecampxyg.github.io/DoWXPubContect/',
    },
    about: '7年医疗软件开发经验，对软件设计和用户体验有深刻理解。在 AI 浪潮中看到了改变医疗行业的机会，积极探索 AI 在医疗软件中的应用。',
    skills: ['医疗软件', '软件设计', 'AI应用', '全栈开发', 'UX设计'],
    currentWork: '正在开发全球视野自媒体工作平台，同时探索 AI 在医疗软件领域的创新应用。',
  },
  {
    id: 3,
    name: '徐帆',
    title: '资深机械结构工程师·3D数字化建模先锋·资深3D打印玩家与AI创作者',
    quote: '致力于打通"从逻辑到实体"的最后一公里',
    category: '其他',
    avatar: GRADIENTS[2],
    about: '深耕机械结构设计多年，在 3D 打印和数字化建模领域有丰富实践。善于将 AI 技术与传统制造工艺结合，推动数字化制造转型。',
    skills: ['机械设计', '3D打印', '数字化建模', 'AI创作', 'CAD/CAM'],
    currentWork: '致力于将 AI 与 3D 打印技术结合，探索"从逻辑到实体"的快速制造方案。',
  },
  {
    id: 4,
    name: 'xy',
    title: '全栈开发者·AI工具爱好者·独立开发6年',
    quote: '用代码创造价值，用AI放大效率',
    category: 'AI工具',
    avatar: GRADIENTS[3],
    about: '6年独立开发经验，擅长全栈技术，从前端到后端、从移动端到服务端都有丰富实践。坚信 AI 是提升开发效率的最佳伙伴。',
    skills: ['全栈开发', 'React/Next.js', 'Node.js', 'AI工具', '独立开发'],
    currentWork: '探索 AI 辅助开发的最佳实践，同时持续迭代个人独立开发项目。',
  },
  {
    id: 5,
    name: '石鱼',
    title: '建筑设计师｜AIGC创作者｜AI动画编导',
    quote: 'AI满肚子学问，天天拉着我超速',
    category: '设计创意',
    avatar: GRADIENTS[4],
    about: '建筑设计师出身，将空间设计思维与 AIGC 创作相结合。在 AI 动画编导领域积极探索，致力于用 AI 技术革新视觉创作流程。',
    skills: ['建筑设计', 'AIGC', 'AI动画', '视觉设计', '空间设计'],
    currentWork: '探索 AI 在建筑可视化和动画编导中的应用，创作沉浸式视觉内容。',
  },
  {
    id: 6,
    name: '海森',
    title: 'AI架构工程师·感官体验设计师·东方美学爱好者',
    quote: 'AI即将终结平均化审美。',
    category: '设计创意',
    avatar: GRADIENTS[5],
    product: {
      name: '虚室 Stillroom',
      description: '融合东方美学的AI感官体验空间',
      detailDescription:
        '虚室 Stillroom 是一个融合东方美学理念的 AI 感官体验设计平台，通过 AI 技术创造独特的沉浸式空间体验，让用户感受科技与传统美学的碰撞。',
      stage: '内测中',
      link: 'https://stillroom.club/',
    },
    about: '兼具 AI 架构工程和感官体验设计双重背景，热爱东方美学。坚信 AI 可以帮助打破审美同质化，创造更个性化的美学体验。',
    skills: ['AI架构', '体验设计', '东方美学', '感官设计', '交互设计'],
    currentWork: '正在打造「虚室 Stillroom」，一个融合东方美学的 AI 感官体验空间。',
  },
  {
    id: 7,
    name: '李木子',
    title: 'AI工程师·UX设计师·内容创作者',
    quote: '理想地探索，创造性的表达',
    category: 'AI工具',
    avatar: GRADIENTS[6],
    product: {
      name: 'digitalHumanShop',
      description: 'AI数字人定制与应用平台',
      detailDescription:
        'digitalHumanShop 提供 AI 数字人的定制、训练和部署服务，为企业和个人创作者提供高质量的数字人解决方案，应用于直播、客服、教育等场景。',
      stage: '已上线',
      link: 'https://www.aivox.com.cn/digitalHumanShop/home',
    },
    about: '兼具 AI 工程和 UX 设计能力，擅长将技术产品化。在内容创作领域也有丰富经验，理解用户需求和产品体验。',
    skills: ['AI工程', 'UX设计', '数字人', '内容创作', 'Python'],
    currentWork: '运营 digitalHumanShop 平台，持续优化 AI 数字人的表现力和应用场景。',
  },
  {
    id: 8,
    name: '冯腾',
    title: 'AI工具爱好者',
    quote: '用Ai科技赋能企业',
    category: 'AI工具',
    avatar: GRADIENTS[7],
    product: {
      name: '妙笔Ai',
      description: 'AI智能写作与内容生成工具',
      detailDescription:
        '妙笔Ai 是一款面向企业的 AI 智能写作工具，支持营销文案、产品描述、社交媒体内容等多场景内容生成，帮助企业提升内容生产效率。',
      stage: '已上线',
      link: 'https://museapp.vip/',
    },
    about: '专注于 AI 工具在企业场景中的应用，致力于用 AI 技术帮助企业提升效率、降低成本。',
    skills: ['AI工具', '企业服务', '内容生成', 'SaaS', '产品运营'],
    currentWork: '运营妙笔Ai，持续拓展 AI 写作工具在企业中的应用场景。',
  },
  {
    id: 9,
    name: '刘一手',
    title: '品牌设计师·AIGC导师·AIGC创意设计师',
    quote: '用AI的你淘汰不用AI的你',
    category: '设计创意',
    avatar: GRADIENTS[8],
    about: '资深品牌设计师，也是 AIGC 创意设计领域的导师。善于将 AI 技术融入品牌设计流程，帮助设计师拥抱 AI 时代。',
    skills: ['品牌设计', 'AIGC', '创意设计', '设计培训', 'Midjourney'],
    currentWork: '开展 AIGC 设计培训，帮助更多设计师掌握 AI 创意工具。',
  },
  {
    id: 10,
    name: 'Frank',
    title: '20年外贸实战经验｜AI打造爆款外贸产品线',
    quote: '想让外贸产品更好卖',
    category: '跨境电商',
    avatar: GRADIENTS[9],
    product: {
      name: '赛博星球',
      description: 'AI驱动的外贸选品与产品线规划工具',
      detailDescription:
        '赛博星球利用 AI 技术分析全球市场趋势和消费者需求，帮助外贸企业精准选品、优化产品线，打造爆款产品。',
      stage: '公测中',
      link: 'https://viva-cutout-v25.pages.dev/',
    },
    about: '20年外贸实战经验，深谙国际贸易规则和市场趋势。现在将 AI 技术与外贸经验结合，探索智能化的外贸产品策略。',
    skills: ['外贸', '选品策略', 'AI分析', '产品线规划', '市场洞察'],
    currentWork: '打造赛博星球，用 AI 帮助外贸企业找到爆款产品方向。',
  },
  {
    id: 11,
    name: 'BARRY',
    title: 'AI工具爱好者',
    quote: '让AI触达更多普通人',
    category: '其他',
    avatar: GRADIENTS[10],
    about: '热衷于 AI 工具的推广和普及，相信 AI 不应该只是技术精英的工具，而应该惠及每一个普通人。',
    skills: ['AI推广', '用户教育', '社区运营', '内容传播'],
    currentWork: '致力于 AI 工具的普及推广，帮助更多普通人了解和使用 AI 技术。',
  },
]

export function getMemberById(id: number): Member | undefined {
  return MEMBERS.find((m) => m.id === id)
}

export function getMembersByCategory(category: Category): Member[] {
  if (category === '全部') return MEMBERS
  return MEMBERS.filter((m) => m.category === category)
}

export function getMembersWithProducts(): Member[] {
  return MEMBERS.filter((m) => m.product)
}

export function getInitial(name: string): string {
  // For Chinese names, return the first character; for English names, return first letter uppercase
  const first = name.charAt(0)
  if (/[a-zA-Z]/.test(first)) {
    return first.toUpperCase()
  }
  return first
}
