'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    phone: '',
    name: '',
    password: '',
    confirmPassword: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  function updateField(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')

    // Validation
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
        body: JSON.stringify({
          phone: form.phone,
          name: form.name,
          password: form.password,
        }),
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

  return (
    <div className="min-h-screen bg-[#0B1628] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="bg-[#132238] border border-white/10 rounded-2xl shadow-lg p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              创建账号
            </h1>
            <p className="text-gray-400 mt-2 text-sm">加入 NB OPC 社区</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1.5">
                手机号 <span className="text-red-500">*</span>
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="请输入手机号"
                value={form.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                maxLength={11}
                className="w-full px-4 py-2.5 border border-white/10 bg-[#0F1D32] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm"
              />
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1.5">
                姓名/昵称 <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                placeholder="请输入姓名或昵称"
                value={form.name}
                onChange={(e) => updateField('name', e.target.value)}
                className="w-full px-4 py-2.5 border border-white/10 bg-[#0F1D32] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1.5">
                密码 <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                type="password"
                placeholder="至少6位"
                value={form.password}
                onChange={(e) => updateField('password', e.target.value)}
                className="w-full px-4 py-2.5 border border-white/10 bg-[#0F1D32] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm"
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-1.5">
                确认密码 <span className="text-red-500">*</span>
              </label>
              <input
                id="confirmPassword"
                type="password"
                placeholder="请再次输入密码"
                value={form.confirmPassword}
                onChange={(e) => updateField('confirmPassword', e.target.value)}
                className="w-full px-4 py-2.5 border border-white/10 bg-[#0F1D32] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors text-sm"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 text-white font-medium bg-gradient-to-r from-primary to-secondary rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 text-sm"
            >
              {loading ? '注册中...' : '注册'}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 text-center text-sm">
            <Link href="/login" className="text-primary hover:text-primary/80 font-medium transition-colors">
              已有账号？立即登录
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
