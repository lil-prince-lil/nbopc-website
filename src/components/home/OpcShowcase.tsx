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
  'from-blue-500 to-indigo-500',
  'from-violet-500 to-purple-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
  'from-rose-500 to-pink-500',
  'from-cyan-500 to-sky-500',
  'from-indigo-500 to-blue-500',
  'from-lime-500 to-green-500',
  'from-fuchsia-500 to-pink-500',
  'from-sky-500 to-blue-500',
  'from-teal-500 to-emerald-500',
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
    scrollRef.current.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' })
  }

  return (
    <section id="opc-showcase" className="py-20 bg-white">
      <div ref={sectionRef} className="max-w-6xl mx-auto px-6">
        <div className="reveal flex items-end justify-between mb-10">
          <div>
            <div className="eyebrow mb-3">MEMBERS</div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">专委会委员矩阵</h2>
            <p className="text-gray-500 mt-2 text-base">专委会委员与生态伙伴，共同构建宁波 AI 应用生态</p>
          </div>
          <Link
            href="/atlas"
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
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-shrink-0 w-64 card-soft p-6 animate-pulse">
                <div className="w-20 h-20 rounded-full bg-gray-100 mx-auto mb-4" />
                <div className="h-4 bg-gray-100 rounded w-2/3 mx-auto mb-2" />
                <div className="h-3 bg-gray-100 rounded w-1/2 mx-auto" />
              </div>
            ))}
          </div>
        ) : members.length === 0 ? (
          <div className="text-center py-12 text-gray-500">暂无成员</div>
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
              className="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {members.map((m, i) => (
                <Link
                  key={m.id}
                  href={`/atlas/${m.id}`}
                  className="flex-shrink-0 w-64 snap-start card-soft p-6 text-center group hover:-translate-y-1"
                >
                  {m.avatar && m.avatar.startsWith('/') ? (
                    <img
                      src={m.avatar}
                      alt={m.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover shadow-sm ring-2 ring-gray-100"
                    />
                  ) : (
                    <div
                      className={`w-20 h-20 rounded-full mx-auto mb-4 bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]} flex items-center justify-center text-2xl font-bold text-white shadow-sm`}
                    >
                      {getInitial(m.name)}
                    </div>
                  )}
                  <h3 className="font-semibold text-gray-900 text-lg group-hover:text-[#2857A4] transition-colors">
                    {m.name}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500 line-clamp-1">{m.title}</p>
                  {m.productName && (
                    <span className="inline-block mt-2 px-3 py-0.5 rounded-full text-xs font-medium text-[#FF8C00] bg-[#FF8C00]/5 border border-[#FF8C00]/30">
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
          <Link href="/atlas" className="text-sm text-[#2857A4] hover:text-[#1E4580] font-medium">
            查看全部成员 →
          </Link>
        </div>
      </div>
    </section>
  )
}
