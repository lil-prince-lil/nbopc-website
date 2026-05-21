'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showForgotTip, setShowForgotTip] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!phone || !password) {
      setError('请填写手机号和密码')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || '登录失败')
        return
      }

      router.push('/')
      router.refresh()
    } catch {
      setError('网络错误，请稍后重试')
    } finally {
      setLoading(false)
    }
  }

  const inputBase =
    'w-full px-4 py-2.5 rounded-xl border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2857A4]/15 focus:border-[#2857A4] text-sm transition-all border-gray-200'

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="card-soft p-8">
          <div className="text-center mb-8">
            <div className="eyebrow mb-3">SIGN IN</div>
            <h1 className="text-2xl font-bold text-gray-900">委员登录</h1>
            <p className="text-gray-500 mt-2 text-sm">登录您的 NBOPC 赋能平台账号</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1.5">
                手机号
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="请输入手机号"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={11}
                className={inputBase}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                密码
              </label>
              <input
                id="password"
                type="password"
                placeholder="请输入密码"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={inputBase}
              />
            </div>

            <button type="submit" disabled={loading} className="w-full btn-primary !rounded-xl !py-2.5 disabled:opacity-50">
              {loading ? '登录中...' : '登录'}
            </button>
          </form>

          <div className="mt-6 flex items-center justify-between text-sm">
            <button
              type="button"
              onClick={() => setShowForgotTip(!showForgotTip)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              忘记密码？
            </button>
            <Link href="/register" className="text-[#2857A4] hover:text-[#1E4580] font-medium transition-colors">
              还没有账号？立即注册
            </Link>
          </div>

          {showForgotTip && (
            <div className="mt-3 p-3 bg-amber-50 border border-amber-200 text-amber-700 text-sm rounded-xl">
              请联系管理员重置密码
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
