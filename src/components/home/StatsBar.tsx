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
    { label: '入驻 OPC', value: counts.opc, suffix: '+' },
    { label: '累计活动', value: counts.activity, suffix: '场' },
    { label: '对接资源方', value: counts.partner, suffix: '+' },
    { label: '触达企业', value: counts.enterprise, suffix: '+' },
  ]

  return (
    <section id="stats" className="relative py-10 bg-[#0D1A2D]">
      {/* Decorative curve */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#1EAF8E]/30 to-transparent" />
      <svg className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[60px] opacity-20" viewBox="0 0 600 60" fill="none">
        <path d="M0 60 Q150 0 300 30 Q450 60 600 0" stroke="url(#curveGrad)" strokeWidth="1.5" fill="none"/>
        <defs>
          <linearGradient id="curveGrad" x1="0" y1="0" x2="600" y2="0">
            <stop offset="0%" stopColor="#2857A4" stopOpacity="0"/>
            <stop offset="50%" stopColor="#1EAF8E"/>
            <stop offset="100%" stopColor="#2857A4" stopOpacity="0"/>
          </linearGradient>
        </defs>
      </svg>

      <div ref={sectionRef} className="max-w-6xl mx-auto px-6">
        <div ref={countRef} className="reveal flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <h3 className="text-lg font-semibold text-white/60 tracking-wide shrink-0">
            数据活跃度
          </h3>
          <div className="flex flex-wrap items-center gap-8 md:gap-12">
            {items.map((item) => (
              <div key={item.label} className="flex items-baseline gap-2">
                <span className="text-sm text-gray-500">{item.label}</span>
                <span className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#2857A4] to-[#1EAF8E] bg-clip-text text-transparent">
                  {item.value.toLocaleString()}{item.suffix}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </section>
  )
}
