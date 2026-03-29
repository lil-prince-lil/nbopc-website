'use client'

import { useState } from 'react'

interface SignupModalProps {
  activityId: string
  activityTitle: string
}

export default function SignupModal({ activityId, activityTitle }: SignupModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
  })
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({})
  const [submitting, setSubmitting] = useState(false)

  function handleOpen() {
    setIsOpen(true)
    setIsSuccess(false)
    setForm({ name: '', phone: '', email: '', company: '' })
    setErrors({})
  }

  function handleClose() {
    setIsOpen(false)
    setIsSuccess(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const newErrors: { name?: string; phone?: string } = {}
    if (!form.name.trim()) newErrors.name = '请输入姓名'
    if (!form.phone.trim()) newErrors.phone = '请输入手机号'
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setErrors({})
    setSubmitting(true)
    try {
      const res = await fetch(`/api/public/activities/${activityId}/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || '提交失败')
      }
      setIsSuccess(true)
    } catch (err: any) {
      alert(err.message || '提交失败，请稍后重试')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <button
        onClick={handleOpen}
        className="mt-10 inline-flex items-center gap-2 bg-gradient-to-r from-primary to-secondary text-white font-semibold px-8 py-3.5 rounded-xl hover:opacity-90 transition-opacity shadow-lg shadow-primary/25"
      >
        立即报名
        <svg
          className="w-5 h-5"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
          />
        </svg>
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          onClick={handleClose}
        >
          {/* 遮罩层 */}
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

          {/* 弹窗内容 */}
          <div
            className="relative bg-[#132238] border border-white/10 rounded-2xl shadow-2xl w-full max-w-md p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 关闭按钮 */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>

            {isSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-emerald-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m4.5 12.75 6 6 9-13.5"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  报名成功！
                </h3>
                <p className="text-gray-400">
                  我们会尽快与您联系确认
                </p>
                <button
                  onClick={handleClose}
                  className="mt-6 px-6 py-2.5 rounded-xl text-sm font-medium text-gray-400 border border-white/10 hover:bg-white/5 transition-colors"
                >
                  关闭
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-white mb-1">
                  活动报名
                </h3>
                <p className="text-sm text-gray-400 mb-6">{activityTitle}</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      姓名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className={`w-full px-4 py-2.5 rounded-xl border ${errors.name ? 'border-red-300 focus:ring-red-500' : 'border-white/10 focus:ring-primary'} bg-[#0F1D32] text-white focus:outline-none focus:ring-2 focus:ring-offset-0 text-sm transition-colors`}
                      placeholder="请输入您的姓名"
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-500">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      手机号 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className={`w-full px-4 py-2.5 rounded-xl border ${errors.phone ? 'border-red-300 focus:ring-red-500' : 'border-white/10 focus:ring-primary'} bg-[#0F1D32] text-white focus:outline-none focus:ring-2 focus:ring-offset-0 text-sm transition-colors`}
                      placeholder="请输入您的手机号"
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-500">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      邮箱
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#0F1D32] text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 text-sm transition-colors"
                      placeholder="请输入您的邮箱"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">
                      公司（可选）
                    </label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) =>
                        setForm({ ...form, company: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-[#0F1D32] text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-0 text-sm transition-colors"
                      placeholder="请输入您的公司名称"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-primary to-secondary hover:opacity-90 transition-opacity shadow-lg shadow-primary/25 disabled:opacity-50"
                  >
                    {submitting ? '提交中...' : '提交报名'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
