'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface OpcMember {
  id: string
  name: string
  avatar: string
  title: string
  quote: string
  category: string
  productName: string
}

const CATEGORIES = ['全部', 'AI工具', '跨境电商', '设计创意', '医疗健康', '其他']

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

function getInitial(name: string): string {
  const first = name.charAt(0)
  if (/[a-zA-Z]/.test(first)) return first.toUpperCase()
  return first
}

export default function AtlasPage() {
  const [activeCategory, setActiveCategory] = useState('全部')
  const [allMembers, setAllMembers] = useState<OpcMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/public/opc-members')
      .then((res) => res.json())
      .then((json) => setAllMembers(json.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const filteredMembers =
    activeCategory === '全部'
      ? allMembers
      : allMembers.filter((m) => m.category === activeCategory)

  return (
    <div className="min-h-screen bg-[#0B1628]">
      {/* Hero */}
      <section
        className="relative py-20 sm:py-28 overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, #0F172A 0%, #1e1b4b 50%, #312e81 100%)',
        }}
      >
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
          <div
            className="absolute w-72 h-72 rounded-full opacity-20 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #2857A4, transparent)',
              top: '10%',
              right: '20%',
            }}
          />
          <div
            className="absolute w-56 h-56 rounded-full opacity-15 blur-3xl"
            style={{
              background: 'radial-gradient(circle, #1EAF8E, transparent)',
              bottom: '10%',
              left: '15%',
            }}
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
            OPC 图谱
          </h1>
          <p className="text-lg sm:text-xl text-sky-200/80 max-w-2xl mx-auto">
            发现宁波最有活力的 AI 原生创业者
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="sticky top-16 z-30 bg-[#0B1628]/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-primary to-secondary text-white shadow-md shadow-primary/20'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Member Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div key={i} className="bg-[#132238] rounded-2xl p-6 border border-white/10 animate-pulse">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-white/5" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-white/5 rounded w-2/3" />
                    <div className="h-3 bg-white/5 rounded w-1/3" />
                  </div>
                </div>
                <div className="h-3 bg-white/5 rounded w-full mb-2" />
                <div className="h-3 bg-white/5 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMembers.map((member, i) => {
                const gradient = member.avatar || GRADIENTS[i % GRADIENTS.length]
                return (
                  <Link
                    key={member.id}
                    href={`/atlas/${member.id}`}
                    className="group relative bg-[#132238] rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 border border-white/10 hover:border-transparent"
                  >
                    {/* Gradient border on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 blur-[1px] scale-[1.02]" />

                    {/* Avatar */}
                    <div className="flex items-center gap-4 mb-4">
                      {member.avatar && member.avatar.startsWith('/') ? (
                        <img src={member.avatar} alt={member.name} className="w-14 h-14 rounded-full object-cover shrink-0 shadow-md ring-2 ring-white/10" />
                      ) : (
                        <div
                          className={`w-14 h-14 rounded-full bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]} flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-md`}
                        >
                          {getInitial(member.name)}
                        </div>
                      )}
                      <div className="min-w-0">
                        <h3 className="text-lg font-semibold text-white truncate group-hover:text-primary transition-colors">
                          {member.name}
                        </h3>
                        {member.productName && (
                          <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                            {member.productName}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <p className="text-sm text-gray-400 mb-3 line-clamp-2 leading-relaxed">
                      {member.title}
                    </p>

                    {/* Quote */}
                    <p className="text-sm italic text-gray-400 line-clamp-2 leading-relaxed">
                      &ldquo;{member.quote}&rdquo;
                    </p>

                    {/* Arrow indicator */}
                    <div className="mt-4 flex items-center text-xs text-gray-400 group-hover:text-primary transition-colors">
                      <span>了解更多</span>
                      <svg
                        className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-1 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                      </svg>
                    </div>
                  </Link>
                )
              })}
            </div>

            {filteredMembers.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-400 text-lg">暂无该方向的成员</p>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  )
}
