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
    <section id="partners" className="py-20 bg-[#0B1628]">
      <div ref={sectionRef} className="max-w-6xl mx-auto px-6">
        <div className="reveal mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">合作伙伴与背书</h2>
        </div>

        {loading ? (
          <div className="flex flex-wrap justify-center gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-24 w-40 rounded-xl bg-[#132238]/50 border border-white/5 animate-pulse" />
            ))}
          </div>
        ) : partners.length === 0 ? (
          <div className="text-center py-12 text-gray-400">暂无合作伙伴</div>
        ) : (
          <div className="reveal flex flex-wrap justify-center gap-6">
            {partners.map((p) => (
              <div
                key={p.id}
                className="group flex items-center justify-center h-24 rounded-xl bg-[#132238]/50 border border-white/5 px-8 transition-all duration-300 hover:border-[#1EAF8E]/30"
              >
                {p.logo ? (
                  <img src={p.logo} alt={p.name} className="h-10 object-contain opacity-60 group-hover:opacity-100 transition-opacity" />
                ) : (
                  <span className="text-sm font-medium text-gray-500 group-hover:text-[#1EAF8E] transition-colors duration-300 text-center leading-snug">
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
