'use client'

import { useEffect, useState } from 'react'
import Timeline from '@/components/about/Timeline'

interface TeamMember {
  name: string
  role: string
  bio: string
  avatar: string
}

interface TimelineItem {
  date: string
  title: string
  description: string
}

const DEFAULT_INTRO = 'NB OPC 社区，是宁波第一个专为 AI 原生独立创业者（One Person Company）打造的市级孵化社区。\n\n在 AI 技术快速普及的今天，一个人借助 AI 工具，完全有可能独立完成一款产品从 0 到 1 的构建——写代码、做设计、跑运营、接客户。我们相信，「一人公司」不是过渡，而是未来最有活力的创业形态之一。\n\nNB OPC 社区成立于 2026 年，由宁波软件行业协会人工智能应用专委会主管运营。社区聚焦「高频交流 + 资源对接 + 产业落地」三个核心，通过线上线下活动、API 资源补贴、产业客户对接等方式，帮助每一位 AI 原生创业者在宁波找到根据地。\n\n我们的口号是：「让每一个 AI 原生创业者，在宁波找到根据地。」'
const DEFAULT_MISSION = '孵化 AI Native 创业者，用AI赋能千行百业，推动 AI 项目在宁波真实落地、商业化变现。'
const DEFAULT_VISION = '成为中国最活跃的城市级 AI OPC 生态社区，让一人公司成为宁波数字经济的新生力量。'
const DEFAULT_ENDORSEMENT = 'NB OPC 社区受宁波市经信局支持，由宁波软件行业协会人工智能应用专委会主管运营，是宁波市政府认可的市级 AI OPC 官方社区平台。'

export default function AboutPage() {
  const [intro, setIntro] = useState(DEFAULT_INTRO)
  const [mission, setMission] = useState(DEFAULT_MISSION)
  const [vision, setVision] = useState(DEFAULT_VISION)
  const [endorsement, setEndorsement] = useState(DEFAULT_ENDORSEMENT)
  const [team, setTeam] = useState<TeamMember[]>([])
  const [timeline, setTimeline] = useState<TimelineItem[]>([])

  useEffect(() => {
    fetch('/api/public/config')
      .then(res => res.json())
      .then(data => {
        const c = data.data || {}
        if (c.about_intro) setIntro(c.about_intro)
        if (c.about_mission) setMission(c.about_mission)
        if (c.about_vision) setVision(c.about_vision)
        if (c.about_endorsement) setEndorsement(c.about_endorsement)
        try { if (c.about_team) setTeam(JSON.parse(c.about_team)) } catch {}
        try { if (c.about_timeline) setTimeline(JSON.parse(c.about_timeline)) } catch {}
      })
      .catch(() => {})
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center justify-center h-[40vh] min-h-[320px] bg-gradient-to-br from-dark via-slate-900 to-primary/80 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-secondary/20 rounded-full blur-3xl" />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">关于我们</h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-xl mx-auto">了解 NB OPC 社区的故事与使命</p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 px-6 bg-[#0B1628]">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">我们是谁</h2>
          <div className="space-y-6 text-gray-300 leading-relaxed text-base md:text-lg">
            {intro.split('\n\n').map((p, i) => (
              <p key={i} className={p.includes('口号') ? 'text-primary font-semibold text-center text-lg md:text-xl mt-8' : ''}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 bg-[#0F1D32]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">使命与愿景</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="relative rounded-2xl p-[2px] bg-gradient-to-br from-primary to-secondary">
              <div className="bg-[#132238] rounded-2xl p-8 h-full">
                <h3 className="text-xl font-bold text-white mb-4">我们的使命</h3>
                <p className="text-gray-400 leading-relaxed">{mission}</p>
              </div>
            </div>
            <div className="relative rounded-2xl p-[2px] bg-gradient-to-br from-secondary to-accent">
              <div className="bg-[#132238] rounded-2xl p-8 h-full">
                <h3 className="text-xl font-bold text-white mb-4">我们的愿景</h3>
                <p className="text-gray-400 leading-relaxed">{vision}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Endorsement */}
      <section className="py-20 px-6 bg-[#0B1628]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-8">官方背书</h2>
          <p className="text-gray-300 leading-relaxed text-base md:text-lg mb-12 max-w-3xl mx-auto">{endorsement}</p>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 px-6 bg-[#0F1D32]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white mb-12 text-center">核心运营团队</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {(team.length > 0 ? team : [{ name: '李乐源', role: '社区发起人/主理人', bio: '专注AI创业生态建设，推动宁波AI产业落地', avatar: '' }]).map((m, i) => (
              <div key={i} className="bg-[#132238] border border-white/10 rounded-2xl p-8 text-center">
                {m.avatar ? (
                  <img src={m.avatar} alt={m.name} className="w-24 h-24 rounded-full mx-auto mb-5 object-cover" />
                ) : (
                  <div className="w-24 h-24 rounded-full mx-auto mb-5 bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold text-white">
                    {m.name[0]}
                  </div>
                )}
                <h3 className="text-lg font-bold text-white mb-1">{m.name}</h3>
                <p className="text-primary text-sm font-medium mb-3">{m.role}</p>
                <p className="text-gray-400 text-sm">{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <Timeline items={timeline.length > 0 ? timeline : undefined} />
    </>
  )
}
