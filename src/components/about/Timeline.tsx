'use client'

import { useEffect, useRef } from 'react'

const timelineData = [
  {
    date: '2023年底',
    title: '社群萌芽',
    description:
      'ChatGPT 掀起 AI 热潮，一场以 AI 为主题的公开聚会成为转折点，点燃了宁波本地 AI 爱好者与创业者的热情。',
  },
  {
    date: '2024年初',
    title: '"多个伙伴"AI社群正式起步',
    description:
      '创始人李乐源正式创立"多个伙伴"AI社群，聚集了一批对 AI 充满热情的伙伴，开启了从兴趣社群到创业生态的探索之路。',
  },
  {
    date: '2024年10月',
    title: '首次品牌线下合作',
    description:
      '社群与东钱湖韩岭景区合作举办AI线下展览，首次将 AI 社群的影响力延伸到线下场景与品牌合作。',
  },
  {
    date: '2025年4月',
    title: '甬派AI众创空间启动',
    description:
      '甬派客户端与"多个伙伴"AI社群共同成立甬派AI众创空间，为社群成员提供了首个实体化运营阵地。',
  },
  {
    date: '2025年（全年）',
    title: '宁波OPC生态持续成长',
    description:
      '宁波启动城市级开源社区"NBopen"，OPC 理念在宁波数字经济圈持续发酵，越来越多的一人公司涌现。',
  },
  {
    date: '2026年4月',
    title: 'NBOPC社区正式成立',
    description:
      '宁波OPC社区正式成立，标志着两年多积累正式升级为市级孵化社区，开启 AI OPC 生态建设新篇章。',
  },
]

export default function Timeline() {
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
    <section className="py-20 px-6 bg-light">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-dark mb-16 text-center">
          发展历程
        </h2>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 md:-translate-x-px" />

          <div className="space-y-12">
            {timelineData.map((item, idx) => {
              const isLeft = idx % 2 === 0
              return (
                <div
                  key={idx}
                  ref={(el) => { itemRefs.current[idx] = el }}
                  className="opacity-0 translate-y-8 transition-all duration-700 ease-out"
                >
                  {/* Mobile: always left-aligned. Desktop: alternating */}
                  <div
                    className={`relative flex items-start gap-6 md:gap-0 ${
                      isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Dot on mobile */}
                    <div className="relative z-10 flex-shrink-0 md:hidden">
                      <div className="w-8 h-8 rounded-full bg-primary border-4 border-white shadow-md" />
                    </div>

                    {/* Content card */}
                    <div
                      className={`flex-1 md:w-[calc(50%-2rem)] ${
                        isLeft ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'
                      }`}
                    >
                      <span className="inline-block text-sm font-semibold text-primary bg-primary/10 px-3 py-1 rounded-full mb-3">
                        {item.date}
                      </span>
                      <h3 className="text-lg font-bold text-dark mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    {/* Center dot (desktop only) */}
                    <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 z-10">
                      <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-white shadow-md" />
                    </div>

                    {/* Spacer for opposite side on desktop */}
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
