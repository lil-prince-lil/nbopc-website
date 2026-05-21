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

const DEFAULT_INTRO =
  '宁波市软件行业协会人工智能专委会（简称"AI 专委会"），是宁波市软件行业协会依法设立、直接领导的二级专业委员会，由 NBOPC 赋能平台负责日常运营。\n\n本专委会受宁波市经信局指导，是宁波市政府认可的市级 AI OPC 官方服务平台，以"发现项目、服务项目、培育项目"为核心使命，致力于为宁波 AI 创业群体与企业提供全链路生态赋能，打造宁波 AI 应用产业高质量发展的核心枢纽。\n\n专委会遵循《宁波市软件行业协会章程》《宁波市软件行业协会专业委员会管理办法》，在协会的统一管理下开展工作，重大事项向协会报备，接受协会的指导与监督。依托原 NB OPC 社群积累的产业基础，我们将持续整合资源、对接场景、搭建桥梁，推动宁波 AI OPC 生态的规范化、实体化、规模化发展。'
const DEFAULT_MISSION = '发现项目、服务项目、培育项目。'
const DEFAULT_VISION =
  '打造全市人工智能应用交流平台（全市 AIOPC 生态核心枢纽），服务全市 AI 创业群体，推动宁波人工智能应用产业高质量发展。'

const ENDORSEMENT_ITEMS = [
  { label: '主管单位', value: '宁波市软件行业协会' },
  { label: '指导单位', value: '宁波市经信局' },
  { label: '认可单位', value: '宁波市政府' },
  { label: '组织依据', value: '宁波市软件行业协会第七届第一次理事会审议通过成立，2026 年 5 月正式运营' },
]

const COMMITTEE_LEADERSHIP = [
  { title: '主任委员', count: '1 名', note: '协会聘任，主任负责制' },
  { title: '副主任委员', count: '2 名', note: '主任提名、协会批准' },
]

const MVP_TEAM = [
  { letter: 'M', name: '灯塔智库', role: '项目指导顾问', gradient: 'from-amber-500 to-orange-500' },
  { letter: 'V', name: '价值合伙人', role: '投资服务', gradient: 'from-emerald-500 to-teal-500' },
  { letter: 'T', name: '护航天团', role: '第三方机构服务', gradient: 'from-blue-500 to-indigo-500' },
  { letter: 'E', name: '共创引擎', role: '运营服务', gradient: 'from-fuchsia-500 to-pink-500' },
  { letter: 'A', name: '智能装备库', role: '要素保障', gradient: 'from-cyan-500 to-blue-500' },
  { letter: 'M', name: '信号塔', role: '媒体资源', gradient: 'from-violet-500 to-purple-500' },
]

export default function AboutPage() {
  const [intro, setIntro] = useState(DEFAULT_INTRO)
  const [mission, setMission] = useState(DEFAULT_MISSION)
  const [vision, setVision] = useState(DEFAULT_VISION)
  const [team, setTeam] = useState<TeamMember[]>([])
  const [timeline, setTimeline] = useState<TimelineItem[]>([])

  useEffect(() => {
    fetch('/api/public/config')
      .then((res) => res.json())
      .then((data) => {
        const c = data.data || {}
        if (c.about_intro) setIntro(c.about_intro)
        if (c.about_mission) setMission(c.about_mission)
        if (c.about_vision) setVision(c.about_vision)
        try {
          if (c.about_team) setTeam(JSON.parse(c.about_team))
        } catch {}
        try {
          if (c.about_timeline) setTimeline(JSON.parse(c.about_timeline))
        } catch {}
      })
      .catch(() => {})
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="relative flex items-center justify-center h-[40vh] min-h-[320px] bg-white border-b border-gray-100 overflow-hidden">
        <div
          className="absolute inset-0 opacity-60 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(40, 87, 164, 0.06), transparent 70%), radial-gradient(ellipse 40% 30% at 80% 90%, rgba(255, 140, 0, 0.05), transparent 60%)',
          }}
        />
        <div className="relative z-10 text-center px-6">
          <div className="eyebrow mb-4">ABOUT</div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">关于专委会</h1>
          <p className="text-lg md:text-xl text-gray-500 max-w-xl mx-auto">
            宁波市软件行业协会人工智能专委会官方介绍
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">我们是谁</h2>
          <div className="space-y-6 text-gray-700 leading-relaxed text-base md:text-lg">
            {intro.split('\n\n').map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">使命与愿景</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card-soft p-8">
              <div className="w-10 h-10 rounded-xl bg-[#2857A4]/5 border border-[#2857A4]/20 flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-[#2857A4]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 1 0-9-9h9V3a9 9 0 0 1 9 9h-9" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">我们的使命</h3>
              <p className="text-gray-600 leading-relaxed text-lg">{mission}</p>
            </div>
            <div className="card-soft p-8">
              <div className="w-10 h-10 rounded-xl bg-[#FF8C00]/5 border border-[#FF8C00]/20 flex items-center justify-center mb-5">
                <svg className="w-5 h-5 text-[#FF8C00]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">我们的愿景</h3>
              <p className="text-gray-600 leading-relaxed">{vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Endorsement — 4 structured items */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">官方背书</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {ENDORSEMENT_ITEMS.map((item) => (
              <div key={item.label} className="card-soft p-6 flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-[#2857A4]/5 border border-[#2857A4]/20 flex items-center justify-center text-[#2857A4] shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <div>
                  <div className="eyebrow mb-1">{item.label}</div>
                  <div className="text-base text-gray-900 leading-relaxed">{item.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 组织架构 */}
      <section className="py-20 px-6 bg-gray-50 border-y border-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">组织架构</h2>
          <p className="text-gray-500 text-center mb-12 max-w-2xl mx-auto">
            采用「主任委员层 + MVP TEAM 横向生态」双层结构，由主任委员层主导决策，MVP TEAM 六大生态横向赋能
          </p>

          {/* 主任委员层 */}
          <div className="mb-12">
            <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2.5">
              <span className="w-1.5 h-6 rounded-full bg-[#2857A4] inline-block" />
              主任委员层
            </h3>
            <div className="grid sm:grid-cols-2 gap-5">
              {COMMITTEE_LEADERSHIP.map((c) => (
                <div key={c.title} className="card-soft p-6">
                  <div className="flex items-baseline gap-3 mb-2">
                    <h4 className="text-lg font-bold text-gray-900">{c.title}</h4>
                    <span className="text-sm font-medium text-[#2857A4]">{c.count}</span>
                  </div>
                  <p className="text-sm text-gray-500">{c.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* MVP TEAM */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-5 flex items-center gap-2.5">
              <span className="w-1.5 h-6 rounded-full bg-[#FF8C00] inline-block" />
              MVP TEAM 六大赋能生态
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {MVP_TEAM.map((m, i) => (
                <div key={`${m.letter}-${i}`} className="card-soft p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.gradient} flex items-center justify-center text-white font-bold text-xl shadow-sm`}
                    >
                      {m.letter}
                    </div>
                    <h4 className="text-lg font-bold text-gray-900">{m.name}</h4>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{m.role}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 专委会成员名单 */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">专委会成员名单</h2>
          <p className="text-gray-500 text-center mb-12">主任委员、副主任委员及执行秘书处成员</p>
          {team.length > 0 ? (
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
              {team.map((m, i) => (
                <div key={i} className="card-soft p-8 text-center">
                  {m.avatar ? (
                    <img
                      src={m.avatar}
                      alt={m.name}
                      className="w-24 h-24 rounded-full mx-auto mb-5 object-cover ring-2 ring-gray-100"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full mx-auto mb-5 bg-[#2857A4] flex items-center justify-center text-2xl font-bold text-white">
                      {m.name[0]}
                    </div>
                  )}
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{m.name}</h3>
                  <p className="text-[#2857A4] text-sm font-medium mb-3">{m.role}</p>
                  <p className="text-gray-500 text-sm">{m.bio}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 italic">名单正在筹备中，将在专委会正式公示后更新</div>
          )}
        </div>
      </section>

      {/* Timeline */}
      <Timeline items={timeline.length > 0 ? timeline : undefined} />
    </>
  )
}
