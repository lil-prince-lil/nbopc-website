'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface OpcMember {
  id: string
  name: string
  avatar: string
  productName: string
  productLogo: string
  productDesc: string
  productStage: string
}

const PRODUCT_COLORS = ['#2857A4', '#1EAF8E', '#F59E0B', '#10B981', '#EF4444', '#06B6D4']

export default function ProductShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useScrollReveal()
  const [members, setMembers] = useState<OpcMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/public/opc-members')
      .then((res) => res.json())
      .then((json) => {
        const all: OpcMember[] = json.data || []
        setMembers(all.filter((m) => m.productName))
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  function scroll(dir: 'left' | 'right') {
    if (!scrollRef.current) return
    scrollRef.current.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' })
  }

  return (
    <section id="products" className="py-20 bg-[#0D1A2D]">
      <div ref={sectionRef} className="max-w-6xl mx-auto px-6">
        <div className="reveal flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">OPC 自研工具</h2>
            <p className="text-gray-400 mt-2 text-base">来自 NB OPC 成员的 AI 原生产品，每一个都是一个人撑起来的</p>
          </div>
          <Link href="/resources" className="text-sm text-[#1EAF8E] hover:underline font-medium hidden sm:flex items-center gap-1">
            查看全部
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {loading ? (
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-shrink-0 w-72 rounded-2xl border border-white/10 bg-[#132238] p-6 animate-pulse">
                <div className="w-14 h-14 rounded-xl bg-white/5 mb-4" />
                <div className="h-4 bg-white/5 rounded w-2/3 mb-2" />
                <div className="h-3 bg-white/5 rounded w-full mb-1" />
                <div className="h-3 bg-white/5 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : members.length === 0 ? (
          <div className="text-center py-12 text-gray-400">暂无产品</div>
        ) : (
          <div className="reveal relative">
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-10 h-10 rounded-full bg-[#1a2d4a] shadow-md items-center justify-center hover:bg-[#2d3a4d] transition-colors hidden md:flex"
              aria-label="向左滚动"
            >
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-10 h-10 rounded-full bg-[#1a2d4a] shadow-md items-center justify-center hover:bg-[#2d3a4d] transition-colors hidden md:flex"
              aria-label="向右滚动"
            >
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {members.map((m, i) => (
                <Link
                  key={m.id}
                  href={`/atlas/${m.id}`}
                  className="flex-shrink-0 w-72 snap-start rounded-2xl border border-white/10 bg-[#132238] p-6 hover:border-[#1EAF8E]/30 hover:shadow-lg hover:shadow-[#2857A4]/10 transition-all duration-300 hover:-translate-y-1 group"
                >
                  {/* Product logo */}
                  {m.productLogo && m.productLogo.startsWith('/') ? (
                    <img src={m.productLogo} alt={m.productName} className="w-14 h-14 rounded-xl mb-4 object-cover shadow-lg" />
                  ) : (
                    <div
                      className="w-14 h-14 rounded-xl mb-4 flex items-center justify-center text-white font-bold text-xl shadow-lg"
                      style={{ backgroundColor: PRODUCT_COLORS[i % PRODUCT_COLORS.length] }}
                    >
                      {m.productName[0]}
                    </div>
                  )}
                  <h3 className="font-semibold text-white text-lg mb-1 group-hover:text-[#1EAF8E] transition-colors">
                    {m.productName}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-2">
                    {m.productDesc}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">by {m.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#2857A4]/10 text-[#2857A4] border border-[#2857A4]/20">
                      {m.productStage}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-8 sm:hidden">
          <Link href="/resources" className="text-sm text-[#1EAF8E] hover:underline font-medium">
            查看全部资源 →
          </Link>
        </div>
      </div>
    </section>
  )
}
