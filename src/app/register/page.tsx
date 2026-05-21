'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({ phone: '', name: '', password: '', confirmPassword: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    if (!form.phone || !form.name || !form.password || !form.confirmPassword) {
      setError('请填写所有必填项')
      return
    }

    if (!/^1\d{10}$/.test(form.phone)) {
      setError('请输入正确的11位手机号')
      return
    }

    if (form.password.length < 6) {
      setError('密码至少6位')
      return
    }

    if (form.password !== form.confirmPassword) {
      setError('两次输入的密码不一致')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: form.phone, name: form.name, password: form.password }),
      })
      const data = await res.json()

      if (!res.ok) {
        setError(data.error || '注册失败')
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
            <div className="eyebrow mb-3">SIGN UP</div>
            <h1 className="text-2xl font-bold text-gray-900">创建账号</h1>
            <p className="text-gray-500 mt-2 text-sm">加入 NBOPC 赋能平台</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                手机号 <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="请输入手机号"
                value={form.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                maxLength={11}
                className={inputBase}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                姓名/昵称 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="请输入姓名或昵称"
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                className={inputBase}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                密码 <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="至少6位"
                value={form.password}
                onChange={(e) => updateField('password', e.target.value)}
                className={inputBase}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                确认密码 <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="请再次输入密码"
                value={form.confirmPassword}
                onChange={(e) => updateField('confirmPassword', e.target.value)}
                className={inputBase}
              />
            </div>

            <button type="submit" disabled={loading} className="w-full btn-accent !rounded-xl !py-2.5 disabled:opacity-50">
              {loading ? '注册中...' : '注册'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm">
            <Link href="/login" className="text-[#2857A4] hover:text-[#1E4580] font-medium transition-colors">
              已有账号？立即登录
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
