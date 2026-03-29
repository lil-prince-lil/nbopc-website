'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface OpcMember {
  id: string
  name: string
  avatar: string
  title: string
  quote: string
  productName: string
}

function getInitial(name: string): string {
  const first = name.charAt(0)
  if (/[a-zA-Z]/.test(first)) return first.toUpperCase()
  return first
}

const GRADIENTS = [
  'from-blue-500 to-purple-600',
  'from-purple-500 to-pink-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
  'from-rose-500 to-red-500',
  'from-cyan-500 to-blue-500',
  'from-violet-500 to-indigo-500',
  'from-lime-500 to-green-500',
  'from-fuchsia-500 to-purple-500',
  'from-sky-500 to-indigo-500',
  'from-teal-500 to-cyan-500',
]

export default function OpcShowcase() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const sectionRef = useScrollReveal()
  const [members, setMembers] = useState<OpcMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/public/opc-members')
      .then((res) => res.json())
      .then((json) => setMembers(json.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  function scroll(dir: 'left' | 'right') {
    if (!scrollRef.current) return
    const amount = 300
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' })
  }

  return (
    <section id="opc-showcase" className="py-20 bg-[#0F1D32]">
      <div ref={sectionRef} className="max-w-6xl mx-auto px-6">
        <div className="reveal flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">OPC 矩阵</h2>
            <p className="text-gray-400 mt-2 text-base">有趣的 AI 原生创业者，正在宁波把想法变成现实</p>
          </div>
          <Link href="/atlas" className="text-sm text-[#1EAF8E] hover:underline font-medium hidden sm:flex items-center gap-1">
            查看全部
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {loading ? (
          <div className="flex gap-6 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-shrink-0 w-64 rounded-2xl bg-[#132238] border border-white/10 p-6 animate-pulse">
                <div className="w-20 h-20 rounded-full bg-white/5 mx-auto mb-4" />
                <div className="h-4 bg-white/5 rounded w-2/3 mx-auto mb-2" />
                <div className="h-3 bg-white/5 rounded w-1/2 mx-auto" />
              </div>
            ))}
          </div>
        ) : members.length === 0 ? (
          <div className="text-center py-12 text-gray-400">暂无成员</div>
        ) : (
          <div className="reveal relative">
            {/* Nav buttons */}
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 z-10 w-10 h-10 rounded-full bg-[#1a2d4a] shadow-md flex items-center justify-center hover:bg-[#2d3a4d] transition-colors hidden md:flex"
              aria-label="向左滚动"
            >
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 z-10 w-10 h-10 rounded-full bg-[#1a2d4a] shadow-md flex items-center justify-center hover:bg-[#2d3a4d] transition-colors hidden md:flex"
              aria-label="向右滚动"
            >
              <svg className="w-5 h-5 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div
              ref={scrollRef}
              className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {members.map((m, i) => (
                  <Link
                    key={m.id}
                    href={`/atlas/${m.id}`}
                    className="flex-shrink-0 w-64 snap-start rounded-2xl bg-[#132238] border border-white/10 p-6 hover:border-[#1EAF8E]/30 hover:shadow-lg hover:shadow-[#2857A4]/10 transition-all duration-300 hover:-translate-y-1 text-center group"
                  >
                    {/* Avatar */}
                    {m.avatar && m.avatar.startsWith('/') ? (
                      <img src={m.avatar} alt={m.name} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover shadow-lg ring-2 ring-white/10" />
                    ) : (
                      <div className={`w-20 h-20 rounded-full mx-auto mb-4 bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]} flex items-center justify-center text-2xl font-bold text-white shadow-lg`}>
                        {getInitial(m.name)}
                      </div>
                    )}
                    <h3 className="font-semibold text-white text-lg group-hover:text-[#1EAF8E] transition-colors">
                      {m.name}
                    </h3>
                    <p className="mt-1 text-xs text-gray-400 line-clamp-1">
                      {m.title}
                    </p>
                    {m.productName && (
                      <span className="inline-block mt-2 px-3 py-0.5 rounded-full text-xs font-medium bg-[#2857A4]/10 text-[#2857A4] border border-[#2857A4]/20">
                        {m.productName}
                      </span>
                    )}
                    <p className="mt-3 text-sm text-gray-500 leading-relaxed line-clamp-2 italic">
                      &ldquo;{m.quote}&rdquo;
                    </p>
                  </Link>
              ))}
            </div>
          </div>
        )}

        <div className="text-center mt-8 sm:hidden">
          <Link href="/atlas" className="text-sm text-[#1EAF8E] hover:underline font-medium">
            查看全部成员 →
          </Link>
        </div>
      </div>
    </section>
  )
}
