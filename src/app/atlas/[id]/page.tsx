'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

interface OpcMember {
  id: string
  name: string
  avatar: string
  title: string
  quote: string
  bio: string
  photo: string
  skills: string
  currentWork: string
  category: string
  productName: string
  productLogo: string
  productDesc: string
  productDetail: string
  productImg: string
  productStage: string
  productLink: string
}

const GRADIENTS = [
  'from-blue-500 to-purple-600',
  'from-purple-500 to-pink-500',
  'from-emerald-500 to-teal-500',
  'from-amber-500 to-orange-500',
  'from-rose-500 to-red-500',
  'from-cyan-500 to-blue-500',
]

const STAGE_COLORS: Record<string, string> = {
  '内测中': 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
  '公测中': 'bg-[#2857A4]/10 text-[#2857A4] border border-[#2857A4]/20',
  '已上线': 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
  '开发中': 'bg-purple-500/10 text-purple-400 border border-purple-500/20',
}

function getInitial(name: string): string {
  const first = name.charAt(0)
  if (/[a-zA-Z]/.test(first)) return first.toUpperCase()
  return first
}

export default function MemberDetailPage() {
  const params = useParams()
  const id = params.id as string
  const [member, setMember] = useState<OpcMember | null>(null)
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!id) return
    fetch(`/api/public/opc-members/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('not found')
        return res.json()
      })
      .then((json) => setMember(json.data))
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#2857A4] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (notFound || !member) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-400">
        成员未找到
      </div>
    )
  }

  const gradient = member.avatar || GRADIENTS[Math.abs(member.name.length) % GRADIENTS.length]
  const skillsArray = member.skills ? member.skills.split(',').map((s) => s.trim()).filter(Boolean) : []
  const hasProduct = !!member.productName

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
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          aria-hidden="true"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div
          className="absolute w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{
            background: 'radial-gradient(circle, #2857A4, transparent)',
            top: '5%',
            right: '15%',
          }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Avatar */}
          {member.avatar && member.avatar.startsWith('/') ? (
            <img src={member.avatar} alt={member.name} className="w-28 h-28 rounded-full object-cover mx-auto mb-6 shadow-2xl ring-4 ring-white/20" />
          ) : (
            <div
              className={`w-28 h-28 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-4xl mx-auto mb-6 shadow-2xl ring-4 ring-white/20`}
            >
              {getInitial(member.name)}
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 tracking-tight">
            {member.name}
          </h1>

          <p className="text-sky-200/80 text-base sm:text-lg mb-6 max-w-2xl mx-auto">
            {member.title}
          </p>

          {member.quote && (
            <p className="text-lg sm:text-xl italic text-white/60 max-w-xl mx-auto">
              &ldquo;{member.quote}&rdquo;
            </p>
          )}
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-12">
        {/* About */}
        {member.bio && (
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 rounded-full bg-gradient-to-b from-primary to-secondary inline-block" />
              关于我
            </h2>
            <p className="text-gray-400 leading-relaxed">{member.bio}</p>
          </section>
        )}

        {/* Skills */}
        {skillsArray.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 rounded-full bg-gradient-to-b from-primary to-secondary inline-block" />
              擅长领域
            </h2>
            <div className="flex flex-wrap gap-2">
              {skillsArray.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-1.5 rounded-full text-sm font-medium bg-[#2857A4]/10 text-[#2857A4] border border-[#2857A4]/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Current Work */}
        {member.currentWork && (
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-1 h-6 rounded-full bg-gradient-to-b from-primary to-secondary inline-block" />
              正在做什么
            </h2>
            <p className="text-gray-400 leading-relaxed">{member.currentWork}</p>
          </section>
        )}

        {/* Product */}
        {hasProduct && (
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <span className="w-1 h-6 rounded-full bg-gradient-to-b from-primary to-secondary inline-block" />
              产品
            </h2>
            <div className="bg-[#132238] rounded-2xl border border-white/10 p-6 sm:p-8 shadow-sm">
              <div className="flex items-start gap-5 mb-6">
                {/* Product logo */}
                {member.productLogo && member.productLogo.startsWith('/') ? (
                  <img src={member.productLogo} alt={member.productName} className="w-16 h-16 rounded-2xl object-cover shrink-0 shadow-md" />
                ) : (
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white font-bold text-xl shrink-0 shadow-md`}
                  >
                    {member.productName.charAt(0)}
                  </div>
                )}
                <div className="min-w-0">
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3 className="text-xl font-bold text-white">
                      {member.productName}
                    </h3>
                    {member.productStage && (
                      <span
                        className={`px-3 py-0.5 rounded-full text-xs font-medium ${STAGE_COLORS[member.productStage] || 'bg-white/10 text-gray-400'}`}
                      >
                        {member.productStage}
                      </span>
                    )}
                  </div>
                  {member.productDesc && (
                    <p className="text-gray-400 mt-1">{member.productDesc}</p>
                  )}
                </div>
              </div>

              {member.productDetail && (
                <p className="text-gray-400 leading-relaxed mb-6">
                  {member.productDetail}
                </p>
              )}

              {/* Product screenshots placeholder */}
              {member.productImg ? (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-3">产品截图</h4>
                  <img src={member.productImg} alt={member.productName} className="rounded-xl border border-white/10 max-w-full" />
                </div>
              ) : (
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-500 mb-3">产品截图</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="aspect-video rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 flex items-center justify-center"
                      >
                        <svg
                          className="w-8 h-8 text-gray-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1}
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0 0 22.5 18.75V5.25A2.25 2.25 0 0 0 20.25 3H3.75A2.25 2.25 0 0 0 1.5 5.25v13.5A2.25 2.25 0 0 0 3.75 21Z"
                          />
                        </svg>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {member.productLink && (
                <a
                  href={member.productLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-2.5 rounded-full text-sm font-medium text-white bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity shadow-md shadow-primary/20"
                >
                  访问产品
                  <svg
                    className="w-4 h-4 ml-1.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </a>
              )}
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="flex flex-col sm:flex-row items-center gap-4 pt-4">
          <Link
            href="/atlas"
            className="px-6 py-2.5 rounded-full text-sm font-medium text-gray-400 border border-white/10 hover:bg-white/5 transition-colors"
          >
            &larr; 返回图谱
          </Link>
          <a
            href="#"
            className="px-6 py-2.5 rounded-full text-sm font-medium text-white bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity shadow-md shadow-primary/20"
          >
            联系 / 了解更多
          </a>
        </section>
      </div>
    </div>
  )
}
