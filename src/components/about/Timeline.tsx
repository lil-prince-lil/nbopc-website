'use client'

import { useEffect, useRef } from 'react'

interface TimelineItem {
  date: string
  title: string
  description: string
}

interface TimelineProps {
  items?: TimelineItem[]
}

const defaultTimelineData: TimelineItem[] = [
  {
    date: '2024 年 9 月',
    title: '理事会审议通过',
    description: '宁波市软件行业协会第七届第一次理事会审议通过，同意成立人工智能专委会。',
  },
  {
    date: '2024 年底',
    title: '投融资对接活动',
    description: '举办投融资对接活动，推动社群与行业协会深度结合，OPC 社区走向实体化。',
  },
  {
    date: '2025 年',
    title: '调研走访 OPC 企业',
    description: '实地走访 40 余家 OPC 企业，形成调研报告并获市委领导批示。',
  },
  {
    date: '2026 年 5 月',
    title: '专委会正式运营',
    description: '专委会工作条例表决通过，正式实体化运营，NBOPC 赋能平台同步上线。',
  },
]

export default function Timeline({ items }: TimelineProps) {
  const timelineData = items && items.length > 0 ? items : defaultTimelineData
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0')
            entry.target.classList.remove('opacity-0', 'translate-y-8')
          }
        })
      },
      { threshold: 0.15 }
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 px-6 bg-gray-50 border-t border-gray-100">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-16 text-center">发展历程</h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-[#2857A4]/15 md:-translate-x-px" />

          <div className="space-y-12">
            {timelineData.map((item, idx) => {
              const isLeft = idx % 2 === 0
              return (
                <div
                  key={idx}
                  ref={(el) => {
                    itemRefs.current[idx] = el
                  }}
                  className="opacity-0 translate-y-8 transition-all duration-700 ease-out"
                >
                  <div className={`relative flex items-start gap-6 md:gap-0 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                    {/* Dot on mobile */}
                    <div className="relative z-10 flex-shrink-0 md:hidden">
                      <div className="w-8 h-8 rounded-full bg-[#FF8C00] border-4 border-gray-50 shadow-sm" />
                    </div>

                    {/* Content card */}
                    <div className={`flex-1 md:w-[calc(50%-2rem)] ${isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}>
                      <span className="inline-block text-sm font-semibold text-[#2857A4] bg-[#2857A4]/5 border border-[#2857A4]/30 px-3 py-1 rounded-full mb-3">
                        {item.date}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                    </div>

                    {/* Center dot (desktop only) */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
                      <div className="w-4 h-4 rounded-full bg-[#FF8C00] ring-4 ring-gray-50 shadow-sm" />
                    </div>

                    {/* Spacer */}
                    <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
