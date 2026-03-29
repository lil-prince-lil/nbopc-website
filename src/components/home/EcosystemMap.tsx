'use client'

import { useScrollReveal } from '@/hooks/useScrollReveal'

const nodes = [
  { label: 'AI 大模型 API', detail: 'DeepSeek · 通义千问 · Kimi · Claude', icon: '/images/icons/icon-ai-model.png', angle: 0 },
  { label: '云服务资源', detail: '移动云 · 华为云 · 腾讯云', icon: '/images/icons/icon-cloud.png', angle: 60 },
  { label: '数据集', detail: '宁波大数据交易中心 · TiDB', icon: '/images/icons/icon-data.png', angle: 120 },
  { label: '政府政策', detail: '宁波市 OPC 专项扶持政策', icon: '/images/icons/icon-policy.png', angle: 180 },
  { label: '产业对接', detail: '制造业 · 外贸 · 跨境电商', icon: '/images/icons/icon-industry.png', angle: 240 },
  { label: '社区工具链', detail: 'OPC 自研工具 · 开源工具', icon: '/images/icons/icon-tools.png', angle: 300 },
]

export default function EcosystemMap() {
  const sectionRef = useScrollReveal()

  return (
    <section id="ecosystem" className="relative py-20 bg-[#0F1D32] overflow-hidden">
      {/* Background ecosystem image */}
      <div className="absolute inset-0 opacity-15">
        <img src="/images/ecosystem.png" alt="" className="w-full h-full object-cover" />
      </div>
      <div ref={sectionRef} className="relative max-w-6xl mx-auto px-6">
        <div className="reveal flex items-center justify-between mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">NB OPC 资源生态</h2>
            <p className="text-gray-400 mt-2">全方位的资源支撑，助力每一位 OPC 创业者</p>
          </div>
        </div>

        {/* Desktop: circular layout */}
        <div className="reveal hidden md:block">
          <div className="relative w-[600px] h-[600px] mx-auto">
            {/* Connection lines + pulse */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 600">
              {nodes.map((n, i) => {
                const rad = (n.angle * Math.PI) / 180
                const x = 300 + Math.cos(rad) * 220
                const y = 300 + Math.sin(rad) * 220
                return (
                  <g key={i}>
                    <line
                      x1="300" y1="300" x2={x} y2={y}
                      stroke="#2857A4" strokeWidth="1" opacity="0.2"
                    />
                    <circle r="4" fill="#2857A4" opacity="0.6">
                      <animateMotion
                        dur={`${3 + i * 0.5}s`}
                        repeatCount="indefinite"
                        path={`M300,300 L${x},${y}`}
                      />
                    </circle>
                  </g>
                )
              })}
            </svg>

            {/* Center node */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg z-10">
              <span className="text-white font-bold text-lg">NB OPC</span>
              {/* Pulse ring */}
              <span
                className="absolute inset-0 rounded-full border-2 border-primary opacity-0"
                style={{
                  animation: 'ecosystemPulse 2.5s ease-out infinite',
                }}
              />
              <span
                className="absolute inset-0 rounded-full border-2 border-primary opacity-0"
                style={{
                  animation: 'ecosystemPulse 2.5s ease-out infinite 1.25s',
                }}
              />
            </div>

            {/* Surrounding nodes */}
            {nodes.map((n) => {
              const rad = (n.angle * Math.PI) / 180
              const x = 300 + Math.cos(rad) * 220
              const y = 300 + Math.sin(rad) * 220
              return (
                <div
                  key={n.label}
                  className="absolute w-40 -translate-x-1/2 -translate-y-1/2 text-center group"
                  style={{ left: x, top: y }}
                >
                  <div className="w-16 h-16 rounded-2xl bg-[#132238] border border-white/10 mx-auto mb-2 flex items-center justify-center group-hover:border-[#1EAF8E]/30 group-hover:shadow-lg group-hover:shadow-[#2857A4]/10 group-hover:scale-110 transition-all duration-300">
                    <img src={n.icon} alt={n.label} className="w-10 h-10 object-contain" />
                  </div>
                  <h4 className="font-semibold text-white text-sm">{n.label}</h4>
                  <p className="text-xs text-gray-400 mt-0.5 leading-snug">{n.detail}</p>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile: grid layout */}
        <div className="md:hidden">
          {/* Center */}
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">NB OPC</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {nodes.map((n) => (
              <div key={n.label} className="bg-[#132238] border border-white/10 rounded-xl p-4 text-center">
                <img src={n.icon} alt={n.label} className="w-10 h-10 object-contain mx-auto" />
                <h4 className="font-semibold text-white text-sm mt-2">{n.label}</h4>
                <p className="text-xs text-gray-400 mt-1 leading-snug">{n.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes ecosystemPulse {
          0% { transform: scale(1); opacity: 0.6; }
          100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </section>
  )
}
