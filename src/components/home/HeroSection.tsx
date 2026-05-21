'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('.hero-title', { opacity: 0, y: 40 })
      gsap.set('.hero-sub', { opacity: 0, y: 24 })
      gsap.set('.hero-tags', { opacity: 0, y: 20 })
      gsap.set('.hero-cta', { opacity: 0, y: 20 })
      gsap.set('.hero-scroll', { opacity: 0 })

      const tl = gsap.timeline({ delay: 0.25 })
      tl.to('.hero-title', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' })
        .to('.hero-sub', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.55')
        .to('.hero-tags', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1 }, '-=0.4')
        .to('.hero-cta', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .to('.hero-scroll', { opacity: 1, duration: 0.5 }, '-=0.2')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gray-50"
    >
      {/* 极简装饰：蓝色径向光晕 + 橙色高亮点 */}
      <div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(40, 87, 164, 0.06), transparent 70%), radial-gradient(ellipse 40% 30% at 80% 90%, rgba(255, 140, 0, 0.05), transparent 60%)',
        }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(17, 24, 39, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(17, 24, 39, 0.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
          maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto py-20">
        {/* Eyebrow */}
        <div className="hero-sub eyebrow mb-6">
          <span className="inline-flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C00]" />
            宁波市软件行业协会人工智能专委会
          </span>
        </div>

        <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-6">
          NBOPC 赋能平台
        </h1>
        <p className="hero-sub text-xl sm:text-2xl md:text-3xl font-medium text-gray-700 mb-10 leading-tight">
          宁波 AI 下半场
          <span className="text-gray-400 mx-2">·</span>
          <span className="text-[#2857A4]">场景驱动</span>
          <span className="text-gray-400 mx-2">·</span>
          <span className="text-[#FF8C00]">生态协同</span>
        </p>

        <div className="flex flex-col items-center gap-2.5 mb-12">
          <span className="hero-tags inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium text-gray-700 bg-white border border-gray-200">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2857A4]" />
            宁波首个 AI OPC 生态赋能平台
          </span>
          <span className="hero-tags inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium text-gray-700 bg-white border border-gray-200">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2857A4]" />
            宁波市软件行业协会人工智能应用专委会运营
          </span>
          <span className="hero-tags inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium text-gray-700 bg-white border border-gray-200">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C00]" />
            聚焦外贸与制造场景的 AI 应用孵化枢纽
          </span>
        </div>

        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/join"
            className="group inline-flex items-center gap-1.5 px-7 py-3 rounded-xl text-white font-semibold text-base bg-[#FF8C00] hover:bg-[#E07B00] transition-all duration-200 shadow-[0_4px_14px_rgba(255,140,0,0.25)] hover:shadow-[0_8px_24px_rgba(255,140,0,0.35)]"
          >
            申请加入专委会
            <span className="inline-block transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center px-7 py-3 rounded-xl text-gray-700 font-semibold text-base bg-white border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200"
          >
            了解专委会
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-medium">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-gray-300 to-transparent relative overflow-hidden">
          <div className="absolute w-full h-3 bg-gray-500 animate-scroll-line" />
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-line {
          0% { top: -12px; }
          100% { top: 32px; }
        }
        .animate-scroll-line {
          animation: scroll-line 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}
