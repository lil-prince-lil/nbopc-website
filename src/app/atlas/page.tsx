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
    activeCategory === '全部' ? allMembers : allMembers.filter((m) => m.category === activeCategory)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative py-16 sm:py-20 overflow-hidden bg-white border-b border-gray-100">
        <div
          className="absolute inset-0 opacity-50 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(40, 87, 164, 0.06), transparent 70%), radial-gradient(ellipse 40% 30% at 80% 90%, rgba(255, 140, 0, 0.05), transparent 60%)',
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="eyebrow mb-4">MEMBERS</div>
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4 tracking-tight">OPC 图谱</h1>
          <p className="text-lg sm:text-xl text-gray-500 max-w-2xl mx-auto">
            发现宁波最有活力的 AI 原生创业者
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <div className="sticky top-16 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 py-4 overflow-x-auto scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`chip ${activeCategory === cat ? 'chip-active' : ''}`}
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
              <div key={i} className="card-soft p-6 animate-pulse">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full bg-gray-100" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-gray-100 rounded w-2/3" />
                    <div className="h-3 bg-gray-100 rounded w-1/3" />
                  </div>
                </div>
                <div className="h-3 bg-gray-100 rounded w-full mb-2" />
                <div className="h-3 bg-gray-100 rounded w-3/4" />
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredMembers.map((member, i) => (
                <Link
                  key={member.id}
                  href={`/atlas/${member.id}`}
                  className="group card-soft p-6 hover:-translate-y-1"
                >
                  <div className="flex items-center gap-4 mb-4">
                    {member.avatar && member.avatar.startsWith('/') ? (
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-14 h-14 rounded-full object-cover shrink-0 ring-2 ring-gray-100"
                      />
                    ) : (
                      <div
                        className={`w-14 h-14 rounded-full bg-gradient-to-br ${GRADIENTS[i % GRADIENTS.length]} flex items-center justify-center text-white font-bold text-lg shrink-0`}
                      >
                        {getInitial(member.name)}
                      </div>
                    )}
                    <div className="min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 truncate group-hover:text-[#2857A4] transition-colors">
                        {member.name}
                      </h3>
                      {member.productName && (
                        <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium text-[#FF8C00] bg-[#FF8C00]/5 border border-[#FF8C00]/30">
                          {member.productName}
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2 leading-relaxed">{member.title}</p>

                  <p className="text-sm italic text-gray-500 line-clamp-2 leading-relaxed">
                    &ldquo;{member.quote}&rdquo;
                  </p>

                  <div className="mt-4 flex items-center text-xs text-[#2857A4] group-hover:text-[#1E4580] transition-colors">
                    <span>了解更多</span>
                    <svg
                      className="w-3.5 h-3.5 ml-1 transform group-hover:translate-x-0.5 transition-transform"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>

            {filteredMembers.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">暂无该方向的成员</p>
              </div>
            )}
          </>
        )}
      </section>
    </div>
  )
}
