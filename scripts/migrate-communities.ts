/**
 * 一次性脚本：在 Turso 生产库中创建 Community 表（若不存在）并导入 10 个现有社区（若为空）。
 * 显式使用 Turso 适配器（加载 .env 的 TURSO_* 凭证）。
 * 运行：npx tsx scripts/migrate-communities.ts
 */
import 'dotenv/config'
import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const tursoUrl = (process.env.TURSO_DATABASE_URL || '').replace('libsql://', 'https://')
if (!tursoUrl) {
  console.error('ERROR: TURSO_DATABASE_URL 未设置')
  process.exit(1)
}
const adapter = new PrismaLibSql({ url: tursoUrl, authToken: process.env.TURSO_AUTH_TOKEN })
const prisma = new PrismaClient({ adapter })

const CREATE_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS "Community" (
  "id" TEXT NOT NULL PRIMARY KEY,
  "name" TEXT NOT NULL,
  "shortName" TEXT NOT NULL DEFAULT '',
  "district" TEXT NOT NULL DEFAULT '',
  "status" TEXT NOT NULL DEFAULT 'operating',
  "spotlightLabel" TEXT NOT NULL DEFAULT '',
  "spotlightColor" TEXT NOT NULL DEFAULT 'blue',
  "address" TEXT NOT NULL DEFAULT '',
  "operator" TEXT NOT NULL DEFAULT '',
  "launchTime" TEXT NOT NULL DEFAULT '',
  "scale" TEXT NOT NULL DEFAULT '',
  "positioning" TEXT NOT NULL DEFAULT '',
  "features" TEXT NOT NULL DEFAULT '',
  "highlights" TEXT NOT NULL DEFAULT '',
  "policy" TEXT NOT NULL DEFAULT '',
  "ecosystem" TEXT NOT NULL DEFAULT '',
  "representatives" TEXT NOT NULL DEFAULT '',
  "servicePackages" TEXT NOT NULL DEFAULT '',
  "notes" TEXT NOT NULL DEFAULT '',
  "order" INTEGER NOT NULL DEFAULT 0,
  "visible" INTEGER NOT NULL DEFAULT 1,
  "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
)
`

type Seed = {
  name: string
  shortName?: string
  district: string
  status: 'operating' | 'preparing'
  spotlightLabel: string
  spotlightColor: string
  address?: string
  operator?: string
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

const SEED: Seed[] = [
  {
    name: '多个伙伴 AI OPC 社区',
    shortName: '多个伙伴',
    district: '高新区',
    status: 'operating',
    spotlightLabel: 'NBOPC 总部',
    spotlightColor: 'gold',
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
    name: 'AiOPC 社区 · 白云街道（OPC 云创 Labo）',
    shortName: '白云 AiOPC',
    district: '海曙区',
    status: 'operating',
    spotlightLabel: '云创 Labo',
    spotlightColor: 'sky',
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
    name: 'AiOPC 社区 · 鼓楼街道',
    shortName: '鼓楼 AiOPC',
    district: '海曙区',
    status: 'operating',
    spotlightLabel: '路演定级',
    spotlightColor: 'cyan',
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
    name: 'AiOPC 社区 · 月湖街道',
    shortName: '月湖 AiOPC',
    district: '海曙区',
    status: 'operating',
    spotlightLabel: '政企校协同',
    spotlightColor: 'teal',
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
    name: 'Hi-OPC 空间',
    shortName: 'Hi-OPC',
    district: '高新区',
    status: 'operating',
    spotlightLabel: '国企孵化标杆',
    spotlightColor: 'violet',
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
    name: '北岸数字人力产业园（OPC 专区）',
    shortName: '北岸数字人力产业园',
    district: '江北区',
    status: 'operating',
    spotlightLabel: '数字人力',
    spotlightColor: 'blue',
    operator: '江北区',
    features: ['数字人力', 'AI + 房产'],
    highlights: [
      '提供 OPC 创业支持体系，已有 OPC 创业项目入驻',
      '江北区计划基于零创空间开展 AI 工具使用课程，帮助创业者解决"难上手"问题',
    ],
    representatives: '宁波哦啦啦信息科技有限公司（AI + 房产交易数据分析）',
  },
  {
    name: '"姚创+" OPC 社区',
    shortName: '姚创+',
    district: '余姚市',
    status: 'operating',
    spotlightLabel: '首张 AiOPC 执照',
    spotlightColor: 'rose',
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
    name: '"大自然工位"等 OPC 空间',
    shortName: '大自然工位',
    district: '北仑区',
    status: 'operating',
    spotlightLabel: '户外开放空间',
    spotlightColor: 'lime',
    address: '北仑区九峰片区',
    operator: '北仑区',
    positioning: '户外/开放式办公空间',
    features: ['户外办公', '开放式空间'],
    highlights: ['"大自然工位"——户外/开放式办公空间', '已有 OPC 创业者自发入驻办公'],
    representatives:
      '宁波无中生有建筑设计有限公司（1 人 AI 建筑设计公司，年利润率高出传统团队 20%-30%）',
  },
  {
    name: '宁波启迪·易得 Idea Start OPC 创业社区',
    shortName: '启迪·易得',
    district: '镇海区',
    status: 'operating',
    spotlightLabel: '启迪系孵化',
    spotlightColor: 'indigo',
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
    name: '甬江软件园 · OPC 专属空间',
    shortName: '甬江软件园 OPC',
    district: '高新区',
    status: 'preparing',
    spotlightLabel: '万平大空间',
    spotlightColor: 'slate',
    address: '宁波高新区（甬江软件园）',
    scale: '近 10,000㎡',
    operator: '甬江软件园',
    features: ['专属空间', '近万平方米'],
    highlights: ['正在筹备中，OPC 专属空间', '空间规模近 10,000㎡'],
  },
]

;(async () => {
  try {
    console.log('1. 创建 Community 表（若不存在）...')
    await prisma.$executeRawUnsafe(CREATE_TABLE_SQL)
    console.log('   ✓ 表已就绪')

    const count = await prisma.community.count()
    console.log(`2. 当前 Community 表共有 ${count} 行`)

    if (count > 0) {
      console.log('   表非空，跳过导入。')
    } else {
      console.log('3. 导入 10 个社区...')
      for (let i = 0; i < SEED.length; i++) {
        const s = SEED[i]
        await prisma.community.create({
          data: {
            name: s.name,
            shortName: s.shortName || '',
            district: s.district,
            status: s.status,
            spotlightLabel: s.spotlightLabel,
            spotlightColor: s.spotlightColor,
            address: s.address || '',
            operator: s.operator || '',
            launchTime: s.launchTime || '',
            scale: s.scale || '',
            positioning: s.positioning || '',
            features: JSON.stringify(s.features),
            highlights: JSON.stringify(s.highlights),
            policy: s.policy || '',
            ecosystem: s.ecosystem || '',
            representatives: s.representatives || '',
            servicePackages: s.servicePackages || '',
            notes: s.notes || '',
            order: i,
            visible: true,
          },
        })
        console.log(`   ✓ [${i}] ${s.name}`)
      }
    }

    const final = await prisma.community.count()
    console.log(`完成。Community 表现有 ${final} 行。`)
  } catch (e) {
    console.error('ERROR:', e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
})()
