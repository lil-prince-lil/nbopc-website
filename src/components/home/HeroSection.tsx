'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial states
      gsap.set('.hero-title', { opacity: 0, y: 60 })
      gsap.set('.hero-tags', { opacity: 0, y: 40 })
      gsap.set('.hero-cta', { opacity: 0, y: 30 })
      gsap.set('.hero-scroll', { opacity: 0 })

      // Staggered entrance animation
      const tl = gsap.timeline({ delay: 0.5 })
      tl.to('.hero-title', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' })
        .to('.hero-tags', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', stagger: 0.15 }, '-=0.5')
        .to('.hero-cta', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.4')
        .to('.hero-scroll', { opacity: 1, duration: 0.6 }, '-=0.2')
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/images/hero-bg.png"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B1628]/75 via-[#0B1628]/40 to-[#0B1628]/95" />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-10">
          让每一个 AI 原生创业者
          <br />
          <span className="bg-gradient-to-r from-[#2857A4] via-[#1EAF8E] to-[#2857A4] bg-clip-text text-transparent">
            在宁波找到根据地
          </span>
        </h1>

        <div className="flex flex-col items-center gap-3 mb-12">
          <span className="hero-tags inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-sky-200/90 bg-white/[0.06] backdrop-blur-sm border border-white/[0.08]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2857A4] animate-pulse" />
            宁波首个 AI Native OPC 孵化社区
          </span>
          <span className="hero-tags inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-sky-200/90 bg-white/[0.06] backdrop-blur-sm border border-white/[0.08]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1EAF8E] animate-pulse" />
            市级 OPC 社区官方平台
          </span>
          <span className="hero-tags inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-sky-200/90 bg-white/[0.06] backdrop-blur-sm border border-white/[0.08]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#1EAF8E] animate-pulse" />
            宁波软件行业协会人工智能应用专委会主管运营
          </span>
        </div>

        <div className="hero-cta flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/join"
            className="group px-8 py-3.5 rounded-full text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#2857A4]/25 bg-gradient-to-r from-[#2857A4] to-[#1EAF8E]"
          >
            申请入驻
            <span className="inline-block ml-1 transition-transform group-hover:translate-x-1">→</span>
          </Link>
          <Link
            href="/about"
            className="px-8 py-3.5 rounded-full text-white/80 font-semibold text-lg border border-white/20 hover:bg-white/5 hover:border-white/40 transition-all duration-300 hover:scale-105"
          >
            了解社区
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-[10px] uppercase tracking-[0.3em] text-white/30 font-medium">Scroll</span>
        <div className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent relative overflow-hidden">
          <div className="absolute w-full h-3 bg-white/80 animate-scroll-line" />
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
