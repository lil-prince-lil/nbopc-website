'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const children = el.querySelectorAll('.reveal')
    if (children.length === 0) return

    const ctx = gsap.context(() => {
      children.forEach((child, i) => {
        gsap.fromTo(
          child,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: child,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        )
      })
    }, el)

    return () => ctx.revert()
  }, [])

  return ref
}
