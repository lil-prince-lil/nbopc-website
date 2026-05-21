'use client'

import { useState, useEffect } from 'react'
import type { FormEvent } from 'react'

interface FaqItem { question: string; answer: string }

/* ─── Hero ─── */
function HeroBanner() {
  return (
    <section className="relative flex items-center justify-center h-[40vh] min-h-[320px] bg-white border-b border-gray-100 overflow-hidden">
      <div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(40, 87, 164, 0.06), transparent 70%), radial-gradient(ellipse 40% 30% at 80% 90%, rgba(255, 140, 0, 0.05), transparent 60%)',
        }}
      />
      <div className="relative z-10 text-center px-6">
        <div className="eyebrow mb-4">JOIN</div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">加入专委会</h1>
        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto">
          宁波市软件行业协会人工智能专委会委员申请入口
        </p>
      </div>
    </section>
  )
}

/* ─── Checkmark Icon ─── */
function CheckIcon({ accent = false }: { accent?: boolean }) {
  return (
    <svg
      className={`w-5 h-5 ${accent ? 'text-[#FF8C00]' : 'text-[#2857A4]'} flex-shrink-0 mt-0.5`}
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  )
}

/* ─── 委员类型与权益 (3 张卡片) ─── */
const MEMBER_TIERS = [
  {
    tier: '一类委员',
    title: 'AI 企业代表',
    audience: '企业老板 / 技术负责人，以个人身份代表企业入会',
    benefits: ['参与专委会活动', '优先路演机会', '产业资源对接', '专委会决议表决权'],
    color: 'blue' as const,
  },
  {
    tier: '二类委员',
    title: 'AI OPC 项目个人',
    audience: '拥有 AI 项目（有运营主体）的 OPC 创业者',
    benefits: ['参与专委会活动', '优先路演机会', '产业资源对接', '专委会决议表决权'],
    color: 'green' as const,
  },
  {
    tier: '三类委员',
    title: '生态赋能成员',
    audience: '灯塔智库、价值合伙人、护航天团等六大生态角色',
    benefits: ['参与生态协同', '对接项目资源', '品牌官方背书', '定向合作机会'],
    color: 'orange' as const,
  },
]

const TIER_STYLES = {
  blue: { bg: 'bg-[#2857A4]/5', border: 'border-[#2857A4]/30', text: 'text-[#2857A4]', icon: 'bg-[#2857A4]' },
  green: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', icon: 'bg-emerald-600' },
  orange: { bg: 'bg-[#FF8C00]/5', border: 'border-[#FF8C00]/30', text: 'text-[#FF8C00]', icon: 'bg-[#FF8C00]' },
}

function MemberTypes() {
  return (
    <section className="py-20 px-6 bg-gray-50 border-b border-gray-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">委员类型与权益</h2>
        <p className="text-gray-500 text-center mb-12 max-w-xl mx-auto">
          根据你的身份选择委员类型，享受专委会全方位赋能服务
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {MEMBER_TIERS.map((m) => {
            const s = TIER_STYLES[m.color]
            const accent = m.color === 'orange'
            return (
              <div key={m.tier} className="card-soft p-7 flex flex-col">
                <div className={`w-12 h-12 rounded-xl ${s.icon} flex items-center justify-center text-white font-bold mb-5`}>
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                  </svg>
                </div>
                <span
                  className={`inline-block px-3 py-0.5 rounded-full text-xs font-medium ${s.text} ${s.bg} border ${s.border} w-fit mb-3`}
                >
                  {m.tier}
                </span>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{m.title}</h3>
                <p className="text-sm text-gray-500 mb-5 leading-relaxed">{m.audience}</p>
                <ul className="space-y-2.5 mt-auto">
                  {m.benefits.map((b) => (
                    <li key={b} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <CheckIcon accent={accent} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ─── 委员入会申请 ─── */
type MemberTierKey = 'tier1' | 'tier2' | 'tier3'
const TIER_LABELS: Record<MemberTierKey, string> = {
  tier1: '一类委员（AI 企业代表）',
  tier2: '二类委员（AI OPC 项目个人）',
  tier3: '三类委员（生态赋能成员）',
}

function ApplicationForm() {
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    role: '',
    tier: '' as MemberTierKey | '',
    referrer: '',
    reason: '',
    agree: false,
  })

  function validate() {
    const e: Record<string, string> = {}
    if (!formData.name.trim()) e.name = '请输入姓名'
    if (!formData.phone.trim()) e.phone = '请输入联系电话'
    else if (!/^1[3-9]\d{9}$/.test(formData.phone.trim())) e.phone = '请输入正确的手机号格式'
    if (!formData.email.trim()) e.email = '请输入电子邮箱'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) e.email = '请输入正确的邮箱格式'
    if (!formData.tier) e.tier = '请选择申请的委员类型'
    if (!formData.referrer.trim()) e.referrer = '请填写推荐人（主任委员或 2 名以上在任委员）'
    if (!formData.reason.trim()) e.reason = '请填写入会申请说明'
    if (!formData.agree) e.agree = '请阅读并同意工作条例'
    return e
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const next = validate()
    if (Object.keys(next).length > 0) {
      setErrors(next)
      return
    }
    setErrors({})
    setSubmitted(true)
  }

  function update<K extends keyof typeof formData>(field: K, value: typeof formData[K]) {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field as string]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field as string]
        return next
      })
    }
  }

  if (submitted) {
    return (
      <section className="py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 bg-emerald-50 ring-2 ring-emerald-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-emerald-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">入会申请已提交</h2>
          <p className="text-gray-600 text-base leading-relaxed max-w-md mx-auto">
            专委会秘书处将在 3-5 个工作日内完成初审。
            <br />
            初审通过后，将通知您缴纳对应会费，会费缴纳完成并公示后，您将正式成为专委会委员。
          </p>
        </div>
      </section>
    )
  }

  const inputBase =
    'w-full rounded-xl border bg-white text-gray-900 px-4 py-2.5 text-sm outline-none transition-all focus:border-[#2857A4] focus:ring-2 focus:ring-[#2857A4]/15 placeholder:text-gray-400'

  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">委员入会申请</h2>
        <p className="text-gray-500 text-center mb-10 leading-relaxed">
          填写以下信息，提交专委会委员入会申请。
          <br className="hidden sm:block" />
          申请需经专委会审核通过，并缴纳对应会费后，方可正式成为委员。
        </p>

        <form onSubmit={handleSubmit} className="card-soft p-6 sm:p-10 space-y-6">
          {/* 姓名 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              姓名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => update('name', e.target.value)}
              placeholder="请填写您的真实姓名"
              className={`${inputBase} ${errors.name ? 'border-red-300' : 'border-gray-200'}`}
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* 联系电话 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              联系电话 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => update('phone', e.target.value)}
              placeholder="请填写您的常用手机号"
              className={`${inputBase} ${errors.phone ? 'border-red-300' : 'border-gray-200'}`}
            />
            {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
          </div>

          {/* 邮箱 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              电子邮箱 <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => update('email', e.target.value)}
              placeholder="请填写您的工作邮箱"
              className={`${inputBase} ${errors.email ? 'border-red-300' : 'border-gray-200'}`}
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* 单位 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">所属单位 / 项目主体</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => update('company', e.target.value)}
              placeholder="请填写您所在的企业、机构或项目主体名称"
              className={`${inputBase} border-gray-200`}
            />
          </div>

          {/* 职务 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">职务 / 角色</label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => update('role', e.target.value)}
              placeholder="例如：企业负责人、技术负责人、项目创始人"
              className={`${inputBase} border-gray-200`}
            />
          </div>

          {/* 委员类型（单选） */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              委员类型 <span className="text-red-500">*</span>
            </label>
            <div className="space-y-2.5">
              {(Object.keys(TIER_LABELS) as MemberTierKey[]).map((key) => (
                <label
                  key={key}
                  className={`flex items-center gap-3 cursor-pointer rounded-xl border px-4 py-3 transition-all ${
                    formData.tier === key
                      ? 'border-[#2857A4] bg-[#2857A4]/5 ring-1 ring-[#2857A4]/20'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="radio"
                    name="tier"
                    value={key}
                    checked={formData.tier === key}
                    onChange={() => update('tier', key)}
                    className="w-4 h-4 accent-[#2857A4]"
                  />
                  <span className={`text-sm ${formData.tier === key ? 'text-[#2857A4] font-medium' : 'text-gray-700'}`}>
                    {TIER_LABELS[key]}
                  </span>
                </label>
              ))}
            </div>
            {errors.tier && <p className="text-red-500 text-xs mt-1">{errors.tier}</p>}
          </div>

          {/* 推荐人 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              推荐人 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.referrer}
              onChange={(e) => update('referrer', e.target.value)}
              placeholder="需由主任委员或 2 名以上在任委员书面提名推荐"
              className={`${inputBase} ${errors.referrer ? 'border-red-300' : 'border-gray-200'}`}
            />
            {errors.referrer && <p className="text-red-500 text-xs mt-1">{errors.referrer}</p>}
          </div>

          {/* 入会申请说明 */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              入会申请说明 <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.reason}
              onChange={(e) => update('reason', e.target.value)}
              rows={4}
              placeholder="请简要介绍您的企业 / 项目 / 生态角色，以及加入专委会的申请理由"
              className={`${inputBase} resize-none ${errors.reason ? 'border-red-300' : 'border-gray-200'}`}
            />
            {errors.reason && <p className="text-red-500 text-xs mt-1">{errors.reason}</p>}
          </div>

          {/* 条例同意 */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.agree}
                onChange={(e) => update('agree', e.target.checked)}
                className="w-4 h-4 mt-0.5 accent-[#2857A4] shrink-0"
              />
              <span className="text-sm text-gray-700 leading-relaxed">
                我已阅读并同意遵守
                <span className="text-[#2857A4]">《宁波市软件行业协会人工智能专委会工作条例》</span>
                <span className="text-red-500"> *</span>
              </span>
            </label>
            {errors.agree && <p className="text-red-500 text-xs mt-1">{errors.agree}</p>}
          </div>

          {/* 提交 */}
          <button type="submit" className="w-full btn-accent !rounded-xl !py-3">
            提交入会申请
          </button>

          <p className="text-xs text-gray-500 leading-relaxed text-center pt-2 border-t border-gray-100">
            提交申请后，专委会秘书处将在 3-5 个工作日内完成初审。
            初审通过后，将通知您缴纳对应会费，会费缴纳完成并公示后，您将正式成为专委会委员，享有委员权利与义务。
          </p>
        </form>
      </div>
    </section>
  )
}

/* ─── 委员 FAQ ─── */
const faqData: { q: string; a: string }[] = [
  {
    q: '什么是宁波市软件行业协会人工智能专委会？',
    a: '市软件协会二级专委会，官方 AI OPC 服务平台，服务 AI 创业、推动产业发展。',
  },
  {
    q: '成为专委会委员需要缴纳会费吗？',
    a: '需要。一类 / 二类 200 元 / 年；三类分 800 / 2000 / 8000 元 / 年三档。',
  },
  {
    q: '申请成为委员需要满足哪些条件？',
    a: '遵守章程条例；获主任或 2 名委员推荐；提交申请并缴费。',
  },
  {
    q: '专委会委员有哪些权利和义务？',
    a: '权利：参加活动、优先路演、资源对接、表决、官方背书。义务：缴费、年参会 ≥ 3 次、维护形象、推荐资源。',
  },
  {
    q: '专委会能提供哪些赋能资源？',
    a: '智库咨询、资本对接、法务合规、活动运营、算力数据、媒体宣传。',
  },
  {
    q: '专委会活动如何参与？',
    a: '官网 / 委员群报名；年参会不少于 3 次，无故缺席 3 次将取消资格。',
  },
  {
    q: '非宁波地区的机构 / 个人可以申请吗？',
    a: '可以，符合条件即可申请入会。',
  },
  {
    q: '如何联系专委会秘书处？',
    a: '邮箱：contact@nbopc.org.cn；地址：宁波市高新区创苑路 750 号宁波软件园 A 座 203。',
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
    <div className="card-soft overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50/60 transition-colors cursor-pointer"
      >
        <span className="font-medium text-gray-900 pr-4">{question}</span>
        <svg
          className={`w-5 h-5 text-[#2857A4] flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <p className="px-6 pb-4 text-gray-600 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  )
}

function FAQSection({ dynamicFaq }: { dynamicFaq?: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)
  const items =
    dynamicFaq && dynamicFaq.length > 0
      ? dynamicFaq.map((f) => ({ q: f.question, a: f.answer }))
      : faqData

  return (
    <section className="py-20 px-6 bg-gray-50 border-y border-gray-100">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">委员 FAQ</h2>
        <p className="text-gray-500 text-center mb-12">关于专委会与委员申请，你可能想知道的</p>
        <div className="space-y-3">
          {items.map((item, idx) => (
            <AccordionItem
              key={idx}
              question={item.q}
              answer={item.a}
              isOpen={openIndex === idx}
              onToggle={() => setOpenIndex((prev) => (prev === idx ? null : idx))}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── 生态合作对接 ─── */
function PartnerContact() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-4xl mx-auto text-center">
        <div className="eyebrow mb-4">CONTACT</div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">生态合作对接</h2>
        <p className="text-gray-500 text-lg mb-10 max-w-2xl mx-auto">
          如果您是生态机构、投资方或服务方，希望加入专委会六大赋能生态，请联系我们
        </p>
        <div className="flex flex-col sm:flex-row items-stretch justify-center gap-6">
          {/* 邮箱 */}
          <div className="card-soft px-8 py-6 text-center flex-1 max-w-xs mx-auto sm:mx-0">
            <div className="w-12 h-12 bg-[#2857A4]/5 border border-[#2857A4]/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-[#2857A4]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
              </svg>
            </div>
            <p className="text-gray-500 text-sm mb-1">秘书处邮箱</p>
            <a
              href="mailto:contact@nbopc.org.cn"
              className="text-gray-900 font-semibold hover:text-[#2857A4] transition-colors"
            >
              contact@nbopc.org.cn
            </a>
          </div>

          {/* 地址 */}
          <div className="card-soft px-8 py-6 text-center flex-1 max-w-xs mx-auto sm:mx-0">
            <div className="w-12 h-12 bg-[#FF8C00]/5 border border-[#FF8C00]/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-[#FF8C00]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            </div>
            <p className="text-gray-500 text-sm mb-1">秘书处地址</p>
            <p className="text-gray-900 font-semibold text-sm leading-relaxed">
              宁波市高新区创苑路 750 号
              <br />
              宁波软件园 A 座 203
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Page ─── */
export default function JoinPage() {
  const [faq, setFaq] = useState<FaqItem[]>([])

  useEffect(() => {
    fetch('/api/public/config')
      .then((res) => res.json())
      .then((data) => {
        const c = data.data || {}
        try {
          if (c.join_faq) setFaq(JSON.parse(c.join_faq))
        } catch {}
      })
      .catch(() => {})
  }, [])

  return (
    <>
      <HeroBanner />
      <MemberTypes />
      <ApplicationForm />
      <FAQSection dynamicFaq={faq.length > 0 ? faq : undefined} />
      <PartnerContact />
    </>
  )
}
