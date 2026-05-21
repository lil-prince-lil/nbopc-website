'use client'

import { useState } from 'react'

interface SignupModalProps {
  activityId: string
  activityTitle: string
}

export default function SignupModal({ activityId, activityTitle }: SignupModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [form, setForm] = useState({ name: '', phone: '', email: '', company: '' })
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

  const inputBase =
    'w-full px-4 py-2.5 rounded-xl border bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#2857A4]/15 text-sm transition-all'

  return (
    <>
      <button
        type="button"
        onClick={handleOpen}
        className="mt-10 btn-accent inline-flex items-center gap-2 !rounded-xl !px-7 !py-3 !text-base"
      >
        立即报名
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={handleClose}>
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" />

          <div
            className="relative bg-white border border-gray-100 rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.15)] w-full max-w-md p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-lg text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors flex items-center justify-center"
              aria-label="关闭"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>

            {isSuccess ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-emerald-50 ring-2 ring-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">报名成功！</h3>
                <p className="text-gray-500">我们会尽快与您联系确认</p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="btn-secondary mt-6 !rounded-xl"
                >
                  关闭
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-gray-900 mb-1">活动报名</h3>
                <p className="text-sm text-gray-500 mb-6">{activityTitle}</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      姓名 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={`${inputBase} ${errors.name ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:border-[#2857A4]'}`}
                      placeholder="请输入您的姓名"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      手机号 <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={`${inputBase} ${errors.phone ? 'border-red-300 focus:ring-red-200' : 'border-gray-200 focus:border-[#2857A4]'}`}
                      placeholder="请输入您的手机号"
                    />
                    {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">邮箱</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={`${inputBase} border-gray-200 focus:border-[#2857A4]`}
                      placeholder="请输入您的邮箱"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">公司（可选）</label>
                    <input
                      type="text"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      className={`${inputBase} border-gray-200 focus:border-[#2857A4]`}
                      placeholder="请输入您的公司名称"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full btn-accent !rounded-xl !py-3 disabled:opacity-50"
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
