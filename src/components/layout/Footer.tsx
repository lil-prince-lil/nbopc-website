'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SITE_NAME, ASSOCIATION_SITE } from '@/lib/constants'

export default function Footer() {
  const [logo, setLogo] = useState('/logo.png')

  useEffect(() => {
    fetch('/api/public/config')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data?.data?.site_logo) setLogo(data.data.site_logo)
      })
      .catch(() => {})
  }, [])

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center gap-2">
              {logo && logo.startsWith('/') ? (
                <img src={logo} alt="NBOPC" className="h-8" />
              ) : (
                <span className="text-lg font-bold text-gray-900">{SITE_NAME}</span>
              )}
            </Link>
            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              宁波市软件行业协会人工智能专委会官方平台
            </p>
            <p className="mt-1.5 text-xs text-gray-500 leading-relaxed">
              聚焦外贸与制造场景的 AI 应用孵化枢纽
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="eyebrow mb-4">导航</h3>
            <ul className="space-y-2.5">
              {[
                { label: '首页', href: '/' },
                { label: '活动', href: '/activities' },
                { label: '专委会图谱', href: '/communities' },
                { label: '赋能资源', href: '/resources' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-600 hover:text-[#2857A4] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More */}
          <div>
            <h3 className="eyebrow mb-4">更多</h3>
            <ul className="space-y-2.5">
              {[
                { label: '专委会动态', href: '/news' },
                { label: '关于专委会', href: '/about' },
                { label: '加入专委会', href: '/join' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-gray-600 hover:text-[#2857A4] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href={ASSOCIATION_SITE.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-[#2857A4] transition-colors"
                >
                  宁波市软件行业协会官网
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="eyebrow mb-4">联系</h3>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li>contact@nbopc.org.cn</li>
              <li>微信公众号：NB OPC</li>
              <li>浙江省宁波市</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-gray-500 text-center sm:text-left">
            &copy; 2026 宁波市软件行业协会人工智能专委会 版权所有 ｜ NBOPC 赋能平台
          </p>
          <div className="flex items-center gap-4 text-xs text-gray-500">
            <Link href="/about" className="hover:text-gray-700 transition-colors">
              关于
            </Link>
            <Link href="/join" className="hover:text-gray-700 transition-colors">
              隐私政策
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
