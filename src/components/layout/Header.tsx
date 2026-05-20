'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { NAV_ITEMS, SITE_NAME, ASSOCIATION_SITE } from '@/lib/constants'

interface UserInfo {
  id: string
  name: string
  phone: string
  avatar: string
}

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [user, setUser] = useState<UserInfo | null>(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [logo, setLogo] = useState('/logo.png')
  const dropdownRef = useRef<HTMLDivElement>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
    setDropdownOpen(false)
  }, [pathname])

  useEffect(() => {
    fetch('/api/public/config')
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (data?.data?.site_logo) setLogo(data.data.site_logo)
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data?.user || null))
      .catch(() => setUser(null))
  }, [pathname])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node))
        setDropdownOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    setUser(null)
    setDropdownOpen(false)
    router.push('/')
    router.refresh()
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled
        ? 'bg-[#0B1628]/95 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-white/5'
        : 'bg-[#0B1628]/70 backdrop-blur-md'
    }`}>
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo + 副标题 */}
          <Link href="/" className="flex items-center gap-3">
            {logo && logo.startsWith('/') ? (
              <>
                <img src={logo} alt="NBOPC" className="h-8" />
                <span className="hidden lg:flex flex-col leading-tight border-l border-white/15 pl-3">
                  <span className="text-xs font-medium text-gray-200">NBOPC 赋能平台</span>
                  <span className="text-[10px] text-gray-500">宁波市软件行业协会人工智能专委会</span>
                </span>
              </>
            ) : (
              <>
                {/* AI Brain SVG Icon */}
                <div className="relative w-8 h-8">
                  <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
                    <defs>
                      <linearGradient id="brainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2857A4" />
                        <stop offset="100%" stopColor="#1EAF8E" />
                      </linearGradient>
                    </defs>
                    <circle cx="16" cy="16" r="14" stroke="url(#brainGrad)" strokeWidth="1.5" fill="none" opacity="0.3"/>
                    <path d="M16 6c-2 0-3.5 1-4.5 2.5S10 11 10 13c0 1.5.5 2.5 1 3.5s1 2 1 3v3.5h8V19.5c0-1 .5-2 1-3s1-2 1-3.5c0-2-.5-3.5-1.5-4.5S18 6 16 6z" stroke="url(#brainGrad)" strokeWidth="1.5" fill="none"/>
                    <path d="M13 13.5c0-1.5 1.5-3 3-3s3 1.5 3 3" stroke="url(#brainGrad)" strokeWidth="1" fill="none" opacity="0.6"/>
                    <circle cx="14" cy="11" r="0.8" fill="#2857A4"/>
                    <circle cx="18" cy="11" r="0.8" fill="#1EAF8E"/>
                    <circle cx="16" cy="14" r="0.8" fill="#2857A4"/>
                    <line x1="14" y1="11" x2="16" y2="14" stroke="#2857A4" strokeWidth="0.5" opacity="0.5"/>
                    <line x1="18" y1="11" x2="16" y2="14" stroke="#1EAF8E" strokeWidth="0.5" opacity="0.5"/>
                  </svg>
                  {/* Glow effect */}
                  <div className="absolute inset-0 rounded-full bg-primary/20 blur-md" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-[#2857A4] to-[#1EAF8E] bg-clip-text text-transparent">
                  {SITE_NAME}
                </span>
                <span className="hidden sm:inline text-[10px] text-gray-500 font-medium tracking-wider">
                  ONE PERSON COMPANY
                </span>
              </>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
              return (
                <Link key={item.href} href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-[#1EAF8E] bg-[#1EAF8E]/10'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}>
                  {item.label}
                </Link>
              )
            })}
          </div>

          {/* Desktop Auth + 协会官网 */}
          <div className="hidden md:flex md:items-center md:gap-3">
            {/* 协会官网外链 */}
            <a
              href={ASSOCIATION_SITE.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-1 text-xs font-medium text-gray-400 hover:text-white transition-colors px-2 py-1 rounded border border-white/10 hover:border-white/30"
              title={ASSOCIATION_SITE.label}
            >
              协会官网
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button type="button" onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 transition-colors">
                  <span className="w-8 h-8 rounded-full bg-gradient-to-r from-[#2857A4] to-[#1EAF8E] flex items-center justify-center text-white text-sm font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <span className="text-sm font-medium text-gray-300 max-w-[80px] truncate">{user.name}</span>
                  <svg className={`w-4 h-4 text-gray-500 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-44 bg-[#1a2d4a] rounded-xl shadow-2xl border border-white/10 py-1 z-50">
                    <Link href="/profile" className="block px-4 py-2.5 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors">个人中心</Link>
                    <hr className="my-1 border-white/5" />
                    <button type="button" onClick={handleLogout} className="w-full text-left px-4 py-2.5 text-sm text-red-400 hover:bg-red-500/10 transition-colors">退出登录</button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link href="/login" className="text-sm font-medium text-gray-300 hover:text-white transition-colors px-3 py-2">委员登录</Link>
                <Link href="/register" className="text-sm font-medium text-white bg-gradient-to-r from-[#2857A4] to-[#1EAF8E] px-4 py-2 rounded-lg hover:opacity-90 transition-opacity shadow-lg shadow-[#2857A4]/20">申请入口</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 active:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? '关闭菜单' : '打开菜单'}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/*
        Mobile Menu — 下拉手风琴式
        - 永远渲染（避免 conditional render 引发的 hydration 问题）
        - 实色背景，不依赖 backdrop-blur / 透明度
        - 用 max-height + transition 实现平滑展开
        - 直接挂在 header 下方，不依赖额外的 fixed/inset 定位
      */}
      <div
        id="mobile-menu"
        aria-hidden={!mobileMenuOpen}
        className={`md:hidden overflow-hidden bg-[#0B1628] border-t border-white/5 transition-[max-height] duration-300 ease-out ${
          mobileMenuOpen ? 'max-h-[80vh] overflow-y-auto' : 'max-h-0'
        }`}
      >
        <nav className="px-4 py-3 flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'text-[#1EAF8E] bg-[#1EAF8E]/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5 active:bg-white/10'
                }`}
              >
                {item.label}
              </Link>
            )
          })}

          <div className="mt-2 pt-3 border-t border-white/10 flex flex-col gap-2">
            {/* 协会官网外链（移动菜单底部） */}
            <a
              href={ASSOCIATION_SITE.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 px-4 py-3 text-sm font-medium text-gray-400 rounded-lg border border-white/10 active:bg-white/10"
            >
              {ASSOCIATION_SITE.label}
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
              </svg>
            </a>

            {user ? (
              <>
                <Link
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-300 rounded-lg active:bg-white/10"
                >
                  <span className="w-8 h-8 rounded-full bg-gradient-to-r from-[#2857A4] to-[#1EAF8E] flex items-center justify-center text-white text-sm font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  {user.name}
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-4 py-3 text-center text-base font-medium text-red-400 rounded-lg active:bg-red-500/10"
                >
                  退出登录
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-3 text-center text-base font-medium text-gray-300 rounded-lg border border-white/10 active:bg-white/10"
                >
                  委员登录
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-3 text-center text-base font-medium text-white bg-gradient-to-r from-[#2857A4] to-[#1EAF8E] rounded-lg shadow-md shadow-[#2857A4]/20"
                >
                  申请入口
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  )
}
