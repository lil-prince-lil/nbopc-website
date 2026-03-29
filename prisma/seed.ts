import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import bcrypt from 'bcryptjs'

const adapter = new PrismaLibSql({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
})
const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('Seeding database...')

  // ===== a) 创建默认管理员 =====
  const adminPassword = await bcrypt.hash('admin123', 10)
  await prisma.admin.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      password: adminPassword,
      name: '超级管理员',
      role: 'superadmin',
    },
  })
  console.log('Admin created.')

  // ===== b) OPC 成员数据 =====
  const members = [
    {
      name: 'Miranda',
      avatar: '/uploads/avatars/miranda.jpeg',
      title: 'AI工具爱好者，跨境电商独立站资深专家',
      quote: '我的KPI：让每个独立站卖家，都养得起自己的"龙虾"。',
      bio: '十年跨境电商独立站经验，从运营到负责人，深耕高客单价家居品类。2026年起决定彻底转换战场：从"在流量里卷效率"到"用AI重构逻辑"。',
      photo: '',
      skills: '高客单价独立站增长,AI+跨境电商赋能,全链路AI解决方案,百万级品牌操盘手,数据驱动增长专家',
      currentWork: '我正在做一个面向独立站卖家的整合AI系统。卖家可以自由挑选AI员工，可以挑其中的几个，也可以打包团队。',
      category: '跨境电商',
      productName: 'Site Peak AI',
      productLogo: '',
      productDesc: '5分钟内发现独立站痛点与卡点',
      productDetail: 'SitePeak AI 是面向跨境电商卖家的独立站健康度AI诊断助手，用户只需输入网站链接与关键运营数据，即可获得全链路的智能问题定位与优化方案。',
      productImg: '',
      productStage: '已上线',
      productLink: '',
      order: 1,
    },
    {
      name: '墨点星痕',
      avatar: '/uploads/avatars/modianxinghen.jpg',
      title: '软件设计师 · AI工具爱好者 · 医疗软件开发7年',
      quote: 'AI 是人生的星际航线，我乘着这艘星舰，在时代里留下属于自己的痕迹。',
      bio: '七年深耕互联网医疗 HIS 开发，2025年起专注探索AI赋能开发，借助多个AI工具让脑海里的创意快速落地为可运行的项目。',
      photo: '',
      skills: '医疗HIS开发,Java后端,AI应用开发,AI辅助编程,自媒体技术创作',
      currentWork: '正在做AI抓取国外平台热点到AI洗稿到格式化自媒体文案一站式平台。',
      category: '医疗健康',
      productName: '全球视野自媒体工作平台',
      productLogo: '',
      productDesc: 'AI驱动全球自媒体创作工作台，一站式搞定热点到排版。',
      productDetail: '全球视野自媒体工作台是面向内容创作者的AI辅助工具，支持从Reddit等平台采集热点、全文抓取、AI翻译改写、Markdown解析到公众号排版的全流程自动化。',
      productImg: '',
      productStage: '内测中',
      productLink: 'https://freecodecampxyg.github.io/DoWXPubContect/',
      order: 2,
    },
    {
      name: '徐帆',
      avatar: '/uploads/avatars/xufan.jpeg',
      title: '资深机械结构工程师 · 3D数字化建模先锋 · 资深3D打印玩家与AI创作者',
      quote: '致力于打通"从逻辑到实体"的最后一公里。',
      bio: '5年机械设计与3D打印相关经验，近两年开始将AI工具融入设计与开发流程，持续优化建模、结构设计与生产效率。',
      photo: '',
      skills: '机械结构设计,3D打印,产品建模,快速打样,产品落地',
      currentWork: '文创产品3D打印，医疗方向骨骼三维重建，定制化配件服务。',
      category: '其他',
      productName: '',
      productLogo: '',
      productDesc: '',
      productDetail: '',
      productImg: '',
      productStage: '',
      productLink: '',
      order: 3,
    },
    {
      name: 'xy',
      avatar: '/uploads/avatars/xy.jpeg',
      title: '全栈开发者 · AI工具爱好者 · 独立开发6年',
      quote: '用代码创造价值，用AI放大效率',
      bio: '拥有6年全栈开发经验，长期深耕Web现代化架构与企业级数字化转型领域，致力于探索AI智能体与低代码技术在复杂业务场景下的深度融合。',
      photo: '',
      skills: '前后端全栈,AI辅助编程,代码架构设计,独立产品开发,AI智能体',
      currentWork: 'AI Agent安全连接平台，让个人/企业Agent不暴露公网：全球可达、可控、可审计。',
      category: 'AI工具',
      productName: '',
      productLogo: '',
      productDesc: '',
      productDetail: '',
      productImg: '',
      productStage: '内测中',
      productLink: '',
      order: 4,
    },
    {
      name: '石鱼',
      avatar: '/uploads/avatars/shiyu.jpeg',
      title: '建筑设计师｜AIGC创作者｜AI动画编导',
      quote: 'AI 满肚子学问，天天拉着我超速',
      bio: '建筑设计师，2023年正式与AI结缘，借助AI不断拓宽创作边界，涉足绘画、视频、音乐等多元创作方向。',
      photo: '',
      skills: 'AI辅助设计,建筑设计,室内设计,编剧,视频制作,音乐',
      currentWork: '正在做一套全流程的AI相关IP开发。',
      category: '设计创意',
      productName: '',
      productLogo: '',
      productDesc: '',
      productDetail: '',
      productImg: '',
      productStage: '公测中',
      productLink: '',
      order: 5,
    },
    {
      name: '海森',
      avatar: '/uploads/avatars/haisen.png',
      title: 'AI架构工程师 · 感官体验设计师 · 东方美学爱好者',
      quote: 'AI即将终结平均化审美。',
      bio: '在美期间深度接触欧美消费市场，发现东方美学出海最大的问题不是"中国风不够"，而是感官叙事的缺失。用AI把感官数据结构化，变成可生成、可订阅、可迭代的感官产品。',
      photo: '',
      skills: '感官AI建模,消费品个性化设计,东方美学出海,订阅制产品设计,跨文化用户画像',
      currentWork: '正在构建一套感官生成式引擎：视觉、嗅觉、味觉、触觉。生活方式品牌"虚室"是它的第一个落地场景。',
      category: '设计创意',
      productName: '虚室 Stillroom',
      productLogo: '',
      productDesc: '感官维度的精准设计——AI为每个人生成唯一的茶香器境体验。',
      productDetail: '虚室的核心是一套多维感官生成引擎，覆盖视觉、嗅觉、味觉与触觉。用户完成感官画像后，引擎根据个体偏好、节气律动与情绪状态，动态生成专属方案。',
      productImg: '',
      productStage: '内测中',
      productLink: 'https://stillroom.club/',
      order: 6,
    },
    {
      name: '李木子',
      avatar: '/uploads/avatars/limuzi.jpeg',
      title: 'AI工程师·UX设计师·内容创作者',
      quote: '理想地探索，创造性的表达，并持续思考AI的未来与意义',
      bio: '程序员出身，随后转向UX设计，在产品体验与技术实现之间形成了复合型能力结构。2024年加入外贸公司担任AI负责人，后选择离开传统组织开始一人公司创业。',
      photo: '',
      skills: '系统架构设计,AI辅助编程,工作流开发',
      currentWork: '目前深耕视频领域，正在开发一款面向企业的带货数字人系统，目前已正式上线测试版。',
      category: 'AI工具',
      productName: 'digitalHumanShop',
      productLogo: '',
      productDesc: 'AI驱动的带货数字人视频自动生成系统',
      productDetail: '面向电商与内容营销场景的AI带货数字人生成平台，能够基于商品信息与素材，自动生成具备真实用户表达风格的带货视频内容。',
      productImg: '',
      productStage: '已上线',
      productLink: 'https://www.aivox.com.cn/digitalHumanShop/home',
      order: 7,
    },
    {
      name: '冯腾',
      avatar: '/uploads/avatars/fengteng.jpeg',
      title: 'AI工具爱好者',
      quote: '用Ai科技赋能企业，让更多企业成为胖东来式标杆企业',
      bio: '十五年企业运营经验，了解商业模式，擅长分析用户痛点。',
      photo: '',
      skills: '企业营销,运营,系统打造',
      currentWork: '做一款针对企业的新媒体内容营销文案助手。',
      category: 'AI工具',
      productName: '妙笔Ai',
      productLogo: '',
      productDesc: '妙笔是一款针对企业的新媒体内容营销文案助手',
      productDetail: '用妙笔，轻松实现品牌宣传和线上获客。',
      productImg: '',
      productStage: '已上线',
      productLink: 'https://museapp.vip/',
      order: 8,
    },
    {
      name: '刘一手',
      avatar: '/uploads/avatars/liuyishou.jpeg',
      title: '品牌设计师 · AIGC导师 · AIGC创意设计师',
      quote: '用 AI 的你淘汰不用 AI 的你',
      bio: '资深品牌设计师，2024年起全面投入AIGC领域，将AI工具深度融入设计工作流，现以导师身份系统带教学员。',
      photo: '',
      skills: '品牌视觉设计,广告创意设计,AIGC实战教学,展厅空间设计,AI设计工作流',
      currentWork: '深耕品牌设计多年，近两年专注AIGC在广告设计中的实战应用，以导师身份带领学员用AI落地商业设计项目。',
      category: '设计创意',
      productName: '',
      productLogo: '',
      productDesc: '',
      productDetail: '',
      productImg: '',
      productStage: '',
      productLink: '',
      order: 9,
    },
    {
      name: 'Frank',
      avatar: '/uploads/avatars/frank.jpeg',
      title: '20年外贸实战经验｜AI打造爆款外贸产品线',
      quote: '想让外贸产品更好卖、系列化产品出图更快、接单更轻松',
      bio: '深耕外贸20年，始终在一线参与产品开发与市场推广。率先将AI应用到外贸实际场景中，重构从产品设计到推广获客的全流程。',
      photo: '',
      skills: '外贸产品线规划,爆款产品开发,AI驱动外贸提效,企业AI系统定制,产品视觉策略',
      currentWork: '正在用AI帮助外贸企业重塑产品开发与推广流程，涵盖产品线设计、A+详情页、商业海报等。',
      category: '跨境电商',
      productName: '赛博星球',
      productLogo: '',
      productDesc: '外贸企业AI产品设计与开发工作台，简单易用高效出图',
      productDetail: '赛博星球是一款面向外贸企业的AI产品设计与开发工作台，聚焦产品线打造与推广效率提升。',
      productImg: '',
      productStage: '内测中',
      productLink: 'https://viva-cutout-v25.pages.dev/',
      order: 10,
    },
    {
      name: 'BARRY',
      avatar: '/uploads/avatars/barry.jpeg',
      title: 'AI工具爱好者',
      quote: '让AI触达更多普通人',
      bio: '多年外贸从业经验，从2024年就开始研究通过AI增强个人效率。想让外贸人员的传统繁琐工作进行流程化、自动化。',
      photo: '',
      skills: '流程规划框架设计,AI辅助编程,独立产品开发,工业设计到实际产品生产落地',
      currentWork: '我正在做一套适合传统外贸人的AI辅助系统，借助OpenClaw为传统外贸工作人员提供AI时代的提效增速方案。',
      category: '其他',
      productName: '',
      productLogo: '',
      productDesc: '',
      productDetail: '',
      productImg: '',
      productStage: '内测中',
      productLink: '',
      order: 11,
    },
  ]

  for (const member of members) {
    await prisma.opcMember.create({ data: member })
  }
  console.log(`${members.length} OPC members created.`)

  // ===== c) 示例活动 =====
  const activities = [
    {
      title: 'NB OPC 第一期线下聚会',
      summary: '社区首次线下聚会，成员们面对面交流AI产品心得，分享创业经验，探讨合作机会。',
      content: '这是 NB OPC 社区成立以来的首次线下聚会活动。我们邀请了社区内的核心成员，围绕"AI时代的一人公司"主题展开深度交流。\n\n活动当天，来自不同领域的创业者分享了各自在AI产品开发中的实战经验。',
      coverImage: '/images/activity-card-1.png',
      date: '2026-03-15',
      location: '宁波·海曙区',
      status: 'ended',
      tags: JSON.stringify(['线下聚会', '社区活动']),
    },
    {
      title: 'AI产品路演 Demo Day',
      summary: '社区成员展示各自的AI产品，接受专业评审点评，获取用户反馈与投资人关注。',
      content: 'NB OPC 社区首届 AI 产品路演 Demo Day 即将拉开帷幕！本次 Demo Day 将邀请 8-10 位社区成员上台展示自己的 AI 产品。',
      coverImage: '/images/activity-card-2.png',
      date: '2026-04-15',
      location: '宁波·鄞州区',
      status: 'upcoming',
      tags: JSON.stringify(['产品路演', 'Demo Day']),
    },
    {
      title: 'OPC成员闭门交流会',
      summary: '仅限社区成员参加的深度交流会，围绕商业模式、技术选型、运营增长等话题展开讨论。',
      content: '这是一场仅面向 NB OPC 社区正式成员的闭门深度交流会。本期聚焦三大主题：商业模式验证、技术架构选择、增长策略。',
      coverImage: '/images/activity-card-3.png',
      date: '2026-05-10',
      location: '宁波·江北区',
      status: 'upcoming',
      tags: JSON.stringify(['闭门交流', '社区活动']),
    },
    {
      title: 'AI+外贸实战工作坊',
      summary: '结合宁波外贸产业优势，探索AI在外贸场景中的实际应用，从选品到客服全流程赋能。',
      content: '宁波作为中国重要的外贸城市，拥有庞大的外贸产业基础。本次工作坊专门探讨 AI 技术如何为外贸行业赋能。',
      coverImage: '/images/activity-card-1.png',
      date: '2026-03-01',
      location: '宁波·北仑区',
      status: 'ended',
      tags: JSON.stringify(['外贸', 'AI应用']),
    },
    {
      title: 'AIGC创意设计沙龙',
      summary: '探索AIGC在设计领域的无限可能，从Midjourney到Stable Diffusion，实操演练创意工作流。',
      content: 'AIGC 正在重塑创意设计的工作方式。本次沙龙将带你深入了解当前最前沿的 AI 创意工具和工作流。',
      coverImage: '/images/activity-card-2.png',
      date: '2026-04-20',
      location: '宁波·鄞州区',
      status: 'upcoming',
      tags: JSON.stringify(['AIGC', '设计']),
    },
    {
      title: '一人公司创业分享会',
      summary: '三位一人公司创始人分享从0到1的创业历程，如何用AI工具实现高效运营。',
      content: '一人公司，不是单打独斗，而是用技术杠杆撬动更大的可能。本次分享会邀请了三位成功运营一人公司的创始人。',
      coverImage: '/images/activity-card-3.png',
      date: '2026-02-20',
      location: '宁波·海曙区',
      status: 'ended',
      tags: JSON.stringify(['创业', '分享']),
    },
  ]

  for (const activity of activities) {
    await prisma.activity.create({ data: activity })
  }
  console.log(`${activities.length} activities created.`)

  // ===== d) 示例资讯文章 =====
  const articles = [
    {
      title: 'OPC社区正式成立，汇聚宁波AI力量',
      summary: 'NB OPC宁波一人公司社区正式成立，致力于汇聚宁波本地AI创业者与创新者，共建共享共成长。',
      content: '<p>NB OPC宁波一人公司社区正式成立，致力于汇聚宁波本地AI创业者与创新者，共建共享共成长。</p>',
      coverImage: '/uploads/articles/community-launch.jpg',
      category: '社区公告',
      author: 'NB OPC',
      tags: JSON.stringify(['社区', '成立']),
    },
    {
      title: '社区首批成员入驻完成，产品百花齐放',
      summary: '首批11位社区成员正式入驻，涵盖跨境电商、医疗软件、3D打印、建筑设计等多个领域。',
      content: '<p>首批11位社区成员正式入驻，涵盖跨境电商、医疗软件、3D打印、建筑设计等多个领域，产品百花齐放。</p>',
      coverImage: '/uploads/articles/members-onboard.jpg',
      category: '社区公告',
      author: 'NB OPC',
      tags: JSON.stringify(['成员', '入驻']),
    },
    {
      title: 'AI时代的一人公司：如何用技术杠杆撬动商业',
      summary: '探讨在AI时代，个人如何利用技术杠杆，以一人公司的形式撬动更大的商业价值。',
      content: '<p>探讨在AI时代，个人如何利用技术杠杆，以一人公司的形式撬动更大的商业价值。</p>',
      coverImage: '/uploads/articles/one-person-company.jpg',
      category: '行业动态',
      author: 'NB OPC',
      tags: JSON.stringify(['一人公司', 'AI', '创业']),
    },
    {
      title: '从外贸到AI：Frank的跨界创业之路',
      summary: '20年外贸老兵如何拥抱AI时代，用技术重构产品开发与推广流程。',
      content: 'Frank 深耕外贸20年，一直在一线参与产品开发与市场推广。随着AI技术快速发展，他率先将AI应用到外贸实际场景中。',
      coverImage: '/images/activity-1.png',
      category: '成员故事',
      author: 'NB OPC',
      tags: JSON.stringify(['外贸', 'AI', '创业']),
    },
    {
      title: '宁波AI产业政策解读：OPC创业者的机遇',
      summary: '解读宁波市最新AI产业扶持政策，为OPC创业者提供政策指引和资源对接。',
      content: '宁波市近年来大力推动AI产业发展，出台了一系列扶持政策。本文将为OPC创业者解读这些政策带来的机遇。',
      coverImage: '/images/activity-2.png',
      category: '行业动态',
      author: 'NB OPC',
      tags: JSON.stringify(['政策', 'AI', '宁波']),
    },
  ]

  for (const article of articles) {
    await prisma.article.create({ data: article })
  }
  console.log(`${articles.length} articles created.`)

  // ===== e) 合作伙伴 =====
  const partners = [
    { name: '宁波软件行业协会', logo: '/uploads/partners/ningbo-software.jpg', website: '', category: '支持单位', order: 1 },
    { name: '浙江移动云', logo: '/uploads/partners/chinamobile-cloud.png', website: '', category: '云服务商', order: 2 },
    { name: '华为云', logo: '/uploads/partners/huawei-cloud.png', website: '', category: '云服务商', order: 3 },
    { name: 'DeepSeek', logo: '/uploads/partners/deepseek.png', website: '', category: 'AI大模型', order: 4 },
    { name: '阿里云·通义千问', logo: '/uploads/partners/aliyun.png', website: '', category: 'AI大模型', order: 5 },
    { name: 'Kimi（月之暗面）', logo: '/uploads/partners/moonshot.png', website: '', category: 'AI大模型', order: 6 },
  ]

  for (const partner of partners) {
    await prisma.partner.create({ data: partner })
  }
  console.log(`${partners.length} partners created.`)

  // ===== f) 默认 Banner =====
  const banners = [
    {
      title: '欢迎来到 NB OPC 宁波一人公司社区',
      image: '/uploads/banners/banner-1.jpg',
      link: '',
      order: 1,
    },
    {
      title: 'AI时代，一个人也能成就一家公司',
      image: '/uploads/banners/banner-2.jpg',
      link: '',
      order: 2,
    },
  ]

  for (const banner of banners) {
    await prisma.banner.create({ data: banner })
  }
  console.log(`${banners.length} banners created.`)

  // ===== g) 默认站点配置 =====
  const configs = [
    { key: 'site_name', value: 'NB OPC 宁波一人公司社区' },
    { key: 'site_description', value: '汇聚AI时代的创业者与创新者' },
    { key: 'contact_email', value: 'contact@nbopc.org.cn' },
    { key: 'contact_wechat', value: 'NBOPC_Official' },
  ]

  for (const config of configs) {
    await prisma.siteConfig.upsert({
      where: { key: config.key },
      update: { value: config.value },
      create: config,
    })
  }
  console.log(`${configs.length} site configs created.`)

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
