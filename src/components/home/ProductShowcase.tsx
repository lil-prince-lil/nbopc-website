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

const PRODUCT_COLORS = ['#2857A4', '#FF8C00', '#1EAF8E', '#A855F7', '#06B6D4', '#EC4899']

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
    <section id="products" className="py-20 bg-gray-50">
      <div ref={sectionRef} className="max-w-6xl mx-auto px-6">
        <div className="reveal flex items-end justify-between mb-10">
          <div>
            <div className="eyebrow mb-3">PRODUCTS</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">专委会赋能工具库</h2>
            <p className="text-gray-500 mt-2 text-base">
              专委会委员与生态伙伴的 AI 应用产品，服务宁波外贸与制造场景
            </p>
          </div>
          <Link
            href="/resources"
            className="hidden sm:inline-flex items-center gap-1 text-sm font-medium text-[#2857A4] hover:text-[#1E4580] transition-colors shrink-0"
          >
            查看全部
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {loading ? (
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex-shrink-0 w-72 card-soft p-6 animate-pulse">
                <div className="w-14 h-14 rounded-xl bg-gray-100 mb-4" />
                <div className="h-4 bg-gray-100 rounded w-2/3 mb-2" />
                <div className="h-3 bg-gray-100 rounded w-full mb-1" />
                <div className="h-3 bg-gray-100 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : members.length === 0 ? (
          <div className="text-center py-12 text-gray-500">暂无产品</div>
        ) : (
          <div className="reveal relative">
            <button
              type="button"
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-10 h-10 rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 hidden md:flex items-center justify-center hover:border-gray-200 transition-colors"
              aria-label="向左滚动"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-10 h-10 rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 hidden md:flex items-center justify-center hover:border-gray-200 transition-colors"
              aria-label="向右滚动"
            >
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className="flex-shrink-0 w-72 snap-start card-soft p-6 group hover:-translate-y-1"
                >
                  {m.productLogo && m.productLogo.startsWith('/') ? (
                    <img
                      src={m.productLogo}
                      alt={m.productName}
                      className="w-14 h-14 rounded-xl mb-4 object-cover ring-1 ring-gray-100"
                    />
                  ) : (
                    <div
                      className="w-14 h-14 rounded-xl mb-4 flex items-center justify-center text-white font-bold text-xl"
                      style={{ backgroundColor: PRODUCT_COLORS[i % PRODUCT_COLORS.length] }}
                    >
                      {m.productName[0]}
                    </div>
                  )}
                  <h3 className="font-semibold text-gray-900 text-lg mb-1 group-hover:text-[#2857A4] transition-colors">
                    {m.productName}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed mb-4 line-clamp-2">{m.productDesc}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">by {m.name}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full text-[#2857A4] bg-[#2857A4]/5 border border-[#2857A4]/30">
                      {m.productStage}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-8 sm:hidden">
          <Link href="/resources" className="text-sm text-[#2857A4] hover:text-[#1E4580] font-medium">
            查看全部资源 →
          </Link>
        </div>
      </div>
    </section>
  )
}
