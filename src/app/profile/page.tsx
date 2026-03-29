'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface UserInfo {
  id: string
  phone: string
  name: string
  avatar: string
  company: string
  createdAt: string
}

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState<UserInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [showEditTip, setShowEditTip] = useState(false)
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    fetch('/api/auth/me')
      .then((res) => {
        if (!res.ok) {
          router.push('/login')
          return null
        }
        return res.json()
      })
      .then((data) => {
        if (data?.user) {
          setUser(data.user)
        }
      })
      .catch(() => {
        router.push('/login')
      })
      .finally(() => setLoading(false))
  }, [router])

  async function handleLogout() {
    setLoggingOut(true)
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/')
      router.refresh()
    } catch {
      setLoggingOut(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1628] flex items-center justify-center">
        <div className="text-gray-400 text-sm">加载中...</div>
      </div>
    )
  }

  if (!user) return null

  const maskedPhone = user.phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
  const createdDate = new Date(user.createdAt).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  return (
    <div className="min-h-screen bg-[#0B1628] pt-24 pb-12 px-4">
      <div className="max-w-lg mx-auto">
        <div className="bg-[#132238] border border-white/10 rounded-2xl shadow-lg overflow-hidden">
          {/* Banner */}
          <div className="h-28 bg-gradient-to-r from-primary to-secondary" />

          {/* Avatar & Name */}
          <div className="px-8 -mt-12">
            <div className="w-24 h-24 rounded-full bg-[#132238] border-4 border-[#132238] shadow-md flex items-center justify-center text-3xl font-bold text-primary bg-primary/10">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>

          {/* Info */}
          <div className="px-8 pt-4 pb-8">
            <h1 className="text-xl font-bold text-white">{user.name}</h1>
            {user.company && (
              <p className="text-sm text-gray-400 mt-1">{user.company}</p>
            )}

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <span className="text-sm text-gray-500">手机号</span>
                <span className="text-sm text-white">{maskedPhone}</span>
              </div>
              <div className="flex items-center justify-between py-3 border-b border-white/10">
                <span className="text-sm text-gray-500">注册时间</span>
                <span className="text-sm text-white">{createdDate}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 space-y-3">
              <button
                type="button"
                onClick={() => setShowEditTip(true)}
                className="w-full py-2.5 text-sm font-medium border border-white/10 text-gray-300 rounded-lg hover:bg-white/5 transition-colors"
              >
                编辑个人信息
              </button>

              {showEditTip && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm rounded-lg text-center">
                  功能开发中，敬请期待
                </div>
              )}

              <button
                type="button"
                onClick={handleLogout}
                disabled={loggingOut}
                className="w-full py-2.5 text-sm font-medium text-red-400 border border-red-500/20 rounded-lg hover:bg-red-500/10 transition-colors disabled:opacity-50"
              >
                {loggingOut ? '退出中...' : '退出登录'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
