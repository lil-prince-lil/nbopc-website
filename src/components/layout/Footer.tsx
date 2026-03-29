'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SITE_NAME } from '@/lib/constants'

export default function Footer() {
  const [logo, setLogo] = useState('')

  useEffect(() => {
    fetch('/api/public/config')
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data?.data?.site_logo) setLogo(data.data.site_logo)
      })
      .catch(() => {})
  }, [])

  return (
    <footer className="bg-[#081020] border-t border-white/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              {logo && logo.startsWith('/') ? (
                <img src={logo} alt="NB OPC" className="h-8" />
              ) : (
                <span className="text-lg font-bold bg-gradient-to-r from-[#2857A4] to-[#1EAF8E] bg-clip-text text-transparent">
                  {SITE_NAME}
                </span>
              )}
            </Link>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed">
              让每一个 AI 原生创业者，在宁波找到根据地
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">导航</h3>
            <ul className="space-y-2.5">
              {[
                { label: '首页', href: '/' },
                { label: '活动', href: '/activities' },
                { label: 'OPC图谱', href: '/atlas' },
                { label: '资源', href: '/resources' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-[#1EAF8E] transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">更多</h3>
            <ul className="space-y-2.5">
              {[
                { label: '资讯', href: '/news' },
                { label: '关于我们', href: '/about' },
                { label: '加入我们', href: '/join' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-500 hover:text-[#1EAF8E] transition-colors">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">联系</h3>
            <ul className="space-y-2.5 text-sm text-gray-500">
              <li>contact@nbopc.org.cn</li>
              <li>微信公众号：NB OPC</li>
              <li>浙江省宁波市</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-600">
            &copy; 2026 NB OPC Community Inc.
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-600">
            <Link href="/about" className="hover:text-gray-400 transition-colors">关于</Link>
            <Link href="/join" className="hover:text-gray-400 transition-colors">隐私政策</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
