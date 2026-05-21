'use client'

import { useEffect, useState } from 'react'
import { useScrollReveal } from '@/hooks/useScrollReveal'

interface Partner {
  id: string
  name: string
  logo: string
  website: string
}

export default function PartnersWall() {
  const sectionRef = useScrollReveal()
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/public/partners')
      .then((res) => res.json())
      .then((json) => setPartners(json.data || []))
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="partners" className="py-20 bg-gray-50">
      <div ref={sectionRef} className="max-w-6xl mx-auto px-6">
        <div className="reveal mb-10 text-center">
          <div className="eyebrow mb-3">PARTNERS</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">专委会合作伙伴与支持单位</h2>
        </div>

        {loading ? (
          <div className="flex flex-wrap justify-center gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-24 w-40 rounded-xl bg-white border border-gray-100 animate-pulse" />
            ))}
          </div>
        ) : partners.length === 0 ? (
          <div className="text-center py-12 text-gray-500">暂无合作伙伴</div>
        ) : (
          <div className="reveal flex flex-wrap justify-center gap-6">
            {partners.map((p) => (
              <div
                key={p.id}
                className="group flex items-center justify-center h-24 rounded-xl bg-white border border-gray-100 px-8 transition-all duration-200 hover:border-[#2857A4]/30 hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)]"
              >
                {p.logo ? (
                  <img
                    src={p.logo}
                    alt={p.name}
                    className="h-10 object-contain opacity-70 group-hover:opacity-100 transition-opacity"
                  />
                ) : (
                  <span className="text-sm font-medium text-gray-600 group-hover:text-[#2857A4] transition-colors text-center leading-snug">
                    {p.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
