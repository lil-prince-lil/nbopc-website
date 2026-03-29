import type { Metadata } from 'next'
import Timeline from '@/components/about/Timeline'

export const metadata: Metadata = {
  title: '关于我们',
  description: '了解 NB OPC 社区的故事与使命，宁波第一个专为 AI 原生独立创业者打造的市级孵化社区。',
}

/* ─── Hero Banner ─── */
function HeroBanner() {
  return (
    <section className="relative flex items-center justify-center h-[40vh] min-h-[320px] bg-gradient-to-br from-dark via-slate-900 to-primary/80 overflow-hidden">
      {/* decorative blurs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-secondary/20 rounded-full blur-3xl" />
      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          关于我们
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-xl mx-auto">
          了解 NB OPC 社区的故事与使命
        </p>
      </div>
    </section>
  )
}

/* ─── About Intro ─── */
function AboutIntro() {
  return (
    <section className="py-20 px-6 bg-[#0B1628]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-8 text-center">
          我们是谁
        </h2>
        <div className="space-y-6 text-gray-300 leading-relaxed text-base md:text-lg">
          <p>
            NB OPC 社区，是宁波第一个专为 AI 原生独立创业者（One Person Company）打造的市级孵化社区。
          </p>
          <p>
            在 AI 技术快速普及的今天，一个人借助 AI 工具，完全有可能独立完成一款产品从 0 到 1 的构建——写代码、做设计、跑运营、接客户。我们相信，「一人公司」不是过渡，而是未来最有活力的创业形态之一。
          </p>
          <p>
            NB OPC 社区成立于 2026 年，由宁波软件行业协会人工智能应用专委会主管运营。社区聚焦「高频交流 + 资源对接 + 产业落地」三个核心，通过线上线下活动、API 资源补贴、产业客户对接等方式，帮助每一位 AI 原生创业者在宁波找到根据地。
          </p>
          <p>
            目前社区已入驻多个充满活力和梦想的 AI OPC，覆盖 AI 工具、AI 应用、垂直行业解决方案等多个方向，累计举办活动 300+，触达企业超过 500+。
          </p>
          <p className="text-primary font-semibold text-center text-lg md:text-xl mt-8">
            我们的口号是：「让每一个 AI 原生创业者，在宁波找到根据地。」
          </p>
        </div>
      </div>
    </section>
  )
}

/* ─── Mission & Vision ─── */
function MissionVision() {
  return (
    <section className="py-20 px-6 bg-[#0F1D32]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">
          使命与愿景
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="relative rounded-2xl p-[2px] bg-gradient-to-br from-primary to-secondary">
            <div className="bg-[#132238] rounded-2xl p-8 h-full">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.58-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">我们的使命</h3>
              <p className="text-gray-400 leading-relaxed">
                孵化 AI Native 创业者，用 AI 赋能千行百业，推动 AI 项目在宁波真实落地、商业化变现。
              </p>
            </div>
          </div>
          {/* Vision Card */}
          <div className="relative rounded-2xl p-[2px] bg-gradient-to-br from-secondary to-accent">
            <div className="bg-[#132238] rounded-2xl p-8 h-full">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-5">
                <svg className="w-6 h-6 text-secondary" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.64 0 8.577 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.64 0-8.577-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-4">我们的愿景</h3>
              <p className="text-gray-400 leading-relaxed">
                成为中国最活跃的城市级 AI OPC 生态社区，让一人公司成为宁波数字经济的新生力量。
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Official Endorsement ─── */
function OfficialEndorsement() {
  return (
    <section className="py-20 px-6 bg-[#0B1628]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-8">官方背书</h2>
        <p className="text-gray-300 leading-relaxed text-base md:text-lg mb-12 max-w-3xl mx-auto">
          NB OPC 社区受宁波市经信局支持，由宁波软件行业协会人工智能应用专委会主管运营，是宁波市政府认可的市级 AI OPC 官方社区平台。
        </p>
        <div className="flex flex-wrap items-center justify-center gap-12">
          {/* Logo placeholder - 经信局 */}
          <div className="w-48 h-24 rounded-xl bg-[#132238] border border-white/10 shadow-sm flex items-center justify-center text-sm text-gray-400">
            宁波市经信局
          </div>
          {/* Logo placeholder - 软件协会 */}
          <div className="w-48 h-24 rounded-xl bg-[#132238] border border-white/10 shadow-sm flex items-center justify-center text-sm text-gray-400">
            宁波软件行业协会
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Team Section ─── */
const teamMembers = [
  {
    name: '李乐源',
    role: '社区发起人 / 主理人',
    bio: '专注AI创业生态建设，推动宁波AI产业落地',
    confirmed: true,
  },
  {
    name: '待公布',
    role: '核心运营',
    bio: '更多成员信息即将公布',
    confirmed: false,
  },
  {
    name: '待公布',
    role: '核心运营',
    bio: '更多成员信息即将公布',
    confirmed: false,
  },
]

function TeamSection() {
  return (
    <section className="py-20 px-6 bg-[#0B1628]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-12 text-center">
          核心运营团队
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <div
              key={idx}
              className="bg-[#132238] border border-white/10 rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Avatar placeholder */}
              <div
                className={`w-24 h-24 rounded-full mx-auto mb-5 flex items-center justify-center text-2xl font-bold text-white ${
                  member.confirmed
                    ? 'bg-gradient-to-br from-primary to-secondary'
                    : 'bg-slate-600'
                }`}
              >
                {member.confirmed ? member.name[0] : '?'}
              </div>
              <h3 className="text-lg font-bold text-white mb-1">
                {member.name}
              </h3>
              <p className="text-primary text-sm font-medium mb-3">
                {member.role}
              </p>
              <p className="text-gray-400 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Page ─── */
export default function AboutPage() {
  return (
    <>
      <HeroBanner />
      <AboutIntro />
      <MissionVision />
      <OfficialEndorsement />
      <TeamSection />
      <Timeline />
    </>
  )
}
