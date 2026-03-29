'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'

/* ─── Hero ─── */
function HeroBanner() {
  return (
    <section className="relative flex items-center justify-center h-[40vh] min-h-[320px] bg-gradient-to-br from-dark via-slate-900 to-primary/80 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-56 h-56 bg-secondary/20 rounded-full blur-3xl" />
      <div className="relative z-10 text-center px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          加入我们
        </h1>
        <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto">
          无论你是独立开发者、设计师还是创业者，NB OPC 欢迎每一位 AI 原生创业者
        </p>
      </div>
    </section>
  )
}

/* ─── Checkmark Icon ─── */
function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 text-primary flex-shrink-0 mt-0.5"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  )
}

/* ─── 入驻方式说明 ─── */
const personalBenefits = [
  '社区资源对接',
  '线上线下活动优先参与',
  'AI API 资源补贴',
  '产业客户对接',
  'OPC图谱展示位',
  '管理后台使用权限',
]

const enterpriseBenefits = [
  '社区资源对接',
  '线上线下活动优先参与',
  'AI API 资源补贴',
  '产业客户对接',
  'OPC图谱展示位',
  '管理后台使用权限',
]

function ResidencyTypes() {
  return (
    <section className="py-20 px-6 bg-[#0F1D32]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">
          入驻方式
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
          根据你的身份选择适合的入驻类型，享受社区全方位支持
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          {/* 个人 OPC 入驻 */}
          <div className="relative rounded-2xl p-[2px] bg-gradient-to-br from-primary to-secondary">
            <div className="bg-[#132238] rounded-2xl p-8 h-full">
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-5">
                <svg
                  className="w-6 h-6 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                个人 OPC 入驻
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                适合独立创业者、自由职业者、AI工具开发者
              </p>
              <ul className="space-y-3">
                {personalBenefits.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-300">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 企业/团队入驻 */}
          <div className="relative rounded-2xl p-[2px] bg-gradient-to-br from-secondary to-accent">
            <div className="bg-[#132238] rounded-2xl p-8 h-full">
              <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-5">
                <svg
                  className="w-6 h-6 text-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                企业/团队入驻
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                适合小团队、工作室、初创企业
              </p>
              <ul className="space-y-3">
                {enterpriseBenefits.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-300">
                    <CheckIcon />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── 入驻申请表单 ─── */
function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    role: '',
    type: '个人',
    reason: '',
  })

  function validate() {
    const newErrors: Record<string, string> = {}
    if (!formData.name.trim()) {
      newErrors.name = '请输入姓名'
    }
    if (!formData.phone.trim()) {
      newErrors.phone = '请输入手机号'
    } else if (!/^1[3-9]\d{9}$/.test(formData.phone.trim())) {
      newErrors.phone = '请输入正确的手机号格式'
    }
    return newErrors
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setErrors({})
    setSubmitted(true)
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[name]
        return next
      })
    }
  }

  if (submitted) {
    return (
      <section className="py-20 px-6 bg-[#0B1628]">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-10 h-10 text-green-600"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">申请已提交</h2>
          <p className="text-gray-400 text-lg">
            我们会尽快与您联系！
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 px-6 bg-[#0B1628]">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">
          入驻申请
        </h2>
        <p className="text-gray-400 text-center mb-12">
          填写以下信息，开启你的 AI 创业之旅
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-[#132238] rounded-2xl shadow-lg border border-white/10 p-8 md:p-10 space-y-6"
        >
          {/* 姓名 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              姓名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="请输入你的姓名"
              className={`w-full rounded-lg border bg-[#0F1D32] text-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                errors.name ? 'border-red-400' : 'border-white/10'
              }`}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* 手机号 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              手机号 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="请输入你的手机号"
              className={`w-full rounded-lg border bg-[#0F1D32] text-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 ${
                errors.phone ? 'border-red-400' : 'border-white/10'
              }`}
            />
            {errors.phone && (
              <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* 邮箱 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              邮箱
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="请输入你的邮箱"
              className="w-full rounded-lg border border-white/10 bg-[#0F1D32] text-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* 公司/组织名称 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              公司/组织名称
            </label>
            <input
              type="text"
              name="company"
              value={formData.company}
              onChange={handleChange}
              placeholder="请输入公司或组织名称（个人可留空）"
              className="w-full rounded-lg border border-white/10 bg-[#0F1D32] text-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* 职位/角色 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              职位/角色
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="例如：全栈开发者、产品经理、设计师"
              className="w-full rounded-lg border border-white/10 bg-[#0F1D32] text-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          {/* 申请类型 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              申请类型
            </label>
            <div className="flex gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="个人"
                  checked={formData.type === '个人'}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary accent-primary"
                />
                <span className="text-sm text-gray-700">个人入驻</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="企业"
                  checked={formData.type === '企业'}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary accent-primary"
                />
                <span className="text-sm text-gray-700">企业/团队入驻</span>
              </label>
            </div>
          </div>

          {/* 申请理由 */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              申请理由/自我介绍
            </label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              rows={4}
              placeholder="简单介绍自己或项目，让我们更好地了解你"
              className="w-full rounded-lg border border-white/10 bg-[#0F1D32] text-white px-4 py-2.5 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none"
            />
          </div>

          {/* 提交按钮 */}
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-semibold text-sm hover:opacity-90 transition-opacity cursor-pointer"
          >
            提交申请
          </button>
        </form>
      </div>
    </section>
  )
}

/* ─── FAQ 手风琴 ─── */
const faqData = [
  {
    q: '什么是 OPC？',
    a: 'OPC 是 One Person Company 的缩写，指借助 AI 工具独立运营的一人公司。',
  },
  {
    q: '入驻 NB OPC 社区需要付费吗？',
    a: '目前社区入驻完全免费，我们致力于为AI创业者提供零门槛的支持。',
  },
  {
    q: '我没有产品，可以入驻吗？',
    a: '当然可以！只要你对AI创业感兴趣，正在探索或已经在实践，都欢迎加入。',
  },
  {
    q: '入驻后有什么义务吗？',
    a: '我们鼓励成员积极参与社区活动、分享经验，但没有强制义务。',
  },
  {
    q: '如何获取 AI API 资源补贴？',
    a: '入驻成员可以通过社区平台申请AI大模型API额度补贴，具体方案将在二期上线。',
  },
  {
    q: '社区活动一般在哪里举办？',
    a: '主要在宁波市区各区域，也有线上活动。具体地点会在活动详情中公布。',
  },
  {
    q: '我在外地，可以远程参与吗？',
    a: '可以！我们有线上活动和远程协作机制，欢迎全国各地的创业者加入。',
  },
  {
    q: '如何联系我们？',
    a: '邮箱：contact@nbopc.org.cn，或扫码添加社区微信群。',
  },
]

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string
  answer: string
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-white/5 transition-colors cursor-pointer"
      >
        <span className="font-medium text-white pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-primary flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-6 pb-4 text-gray-400 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  )
}

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-20 px-6 bg-[#0F1D32]">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-4 text-center">
          常见问题
        </h2>
        <p className="text-gray-400 text-center mb-12">
          关于 NB OPC 社区，你可能想知道的
        </p>
        <div className="space-y-3">
          {faqData.map((item, idx) => (
            <AccordionItem
              key={idx}
              question={item.q}
              answer={item.a}
              isOpen={openIndex === idx}
              onToggle={() =>
                setOpenIndex((prev) => (prev === idx ? null : idx))
              }
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── 合作伙伴联系入口 ─── */
function PartnerContact() {
  return (
    <section className="py-20 px-6 bg-gradient-to-br from-dark via-slate-900 to-primary/80">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          寻求合作
        </h2>
        <p className="text-slate-300 text-lg mb-10 max-w-2xl mx-auto">
          如果您是企业、机构或投资方，希望与 NB OPC 社区建立合作，请联系我们
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
          {/* 邮箱 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-6 text-center">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                />
              </svg>
            </div>
            <p className="text-slate-400 text-sm mb-1">联系邮箱</p>
            <a
              href="mailto:contact@nbopc.org.cn"
              className="text-white font-semibold hover:text-accent transition-colors"
            >
              contact@nbopc.org.cn
            </a>
          </div>

          {/* 微信二维码占位 */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-8 py-6 text-center">
            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0 1 3.75 9.375v-4.5ZM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5ZM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 0 1-1.125-1.125v-4.5Z"
                />
              </svg>
            </div>
            <p className="text-slate-400 text-sm mb-1">社区微信群</p>
            <div className="w-28 h-28 bg-white/20 rounded-lg mx-auto mt-2 flex items-center justify-center text-xs text-slate-400">
              二维码占位
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Page ─── */
export default function JoinPage() {
  return (
    <>
      <HeroBanner />
      <ResidencyTypes />
      <ApplicationForm />
      <FAQSection />
      <PartnerContact />
    </>
  )
}
