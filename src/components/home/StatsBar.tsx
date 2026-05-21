'use client'

import { useEffect, useRef, useState } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface Stats {
  opcCount: number
  activityCount: number
  partnerCount: number
  enterpriseCount: number
}

export default function StatsBar() {
  const sectionRef = useScrollReveal()
  const countRef = useRef<HTMLDivElement>(null)
  const [stats, setStats] = useState<Stats | null>(null)
  const [counts, setCounts] = useState({ opc: 0, activity: 0, partner: 0, enterprise: 0 })
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    fetch('/api/public/stats')
      .then(res => res.json())
      .then(data => setStats(data.data))
      .catch(() => {})
  }, [])

  // Start counting only when the element is visible in viewport
  useEffect(() => {
    if (!stats || animated || !countRef.current) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimated(true)
          observer.disconnect()

          const duration = 2000
          const steps = 60
          const interval = duration / steps
          let step = 0
          const timer = setInterval(() => {
            step++
            const progress = Math.min(step / steps, 1)
            const ease = 1 - Math.pow(1 - progress, 3)
            setCounts({
              opc: Math.round(stats.opcCount * ease),
              activity: Math.round(stats.activityCount * ease),
              partner: Math.round(stats.partnerCount * ease),
              enterprise: Math.round(stats.enterpriseCount * ease),
            })
            if (step >= steps) clearInterval(timer)
          }, interval)
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(countRef.current)
    return () => observer.disconnect()
  }, [stats, animated])

  const items = [
    { label: '专委会委员', value: counts.opc, suffix: '+' },
    { label: '赋能活动', value: counts.activity, suffix: '场' },
    { label: '对接生态资源方', value: counts.partner, suffix: '+' },
    { label: '服务企业', value: counts.enterprise, suffix: '+' },
  ]

  return (
    <section id="stats" className="relative py-10 bg-white border-y border-gray-100">
      <div ref={sectionRef} className="max-w-6xl mx-auto px-6">
        <div ref={countRef} className="reveal flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <h3 className="eyebrow shrink-0">数据活跃度</h3>
          <div className="grid grid-cols-2 md:flex md:flex-wrap items-center gap-8 md:gap-12">
            {items.map((item) => (
              <div key={item.label} className="flex flex-col gap-1">
                <span className="text-2xl md:text-3xl font-bold text-[#2857A4]">
                  {item.value.toLocaleString()}
                  <span className="text-[#FF8C00]">{item.suffix}</span>
                </span>
                <span className="text-xs text-gray-500">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
