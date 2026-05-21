'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import CommunityForm, { type CommunityFormData } from '@/components/admin/CommunityForm'

function parseArray(v: unknown): string {
  if (Array.isArray(v)) return v.join('\n')
  if (typeof v === 'string') {
    try {
      const p = JSON.parse(v)
      return Array.isArray(p) ? p.join('\n') : v
    } catch {
      return v
    }
  }
  return ''
}

export default function EditCommunityPage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const [initial, setInitial] = useState<CommunityFormData | null>(null)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!id) return
    fetch(`/api/admin/communities/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error('not found')
        return res.json()
      })
      .then((data) => {
        const c = data.community
        setInitial({
          name: c.name || '',
          shortName: c.shortName || '',
          district: c.district || '海曙区',
          status: c.status || 'operating',
          spotlightLabel: c.spotlightLabel || '',
          spotlightColor: c.spotlightColor || 'blue',
          address: c.address || '',
          operator: c.operator || '',
          launchTime: c.launchTime || '',
          scale: c.scale || '',
          positioning: c.positioning || '',
          features: parseArray(c.features),
          highlights: parseArray(c.highlights),
          policy: c.policy || '',
          ecosystem: c.ecosystem || '',
          representatives: c.representatives || '',
          servicePackages: c.servicePackages || '',
          notes: c.notes || '',
          order: typeof c.order === 'number' ? c.order : 0,
          visible: c.visible !== false,
        })
      })
      .catch(() => setNotFound(true))
  }, [id])

  async function handleSubmit(data: CommunityFormData) {
    const res = await fetch(`/api/admin/communities/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        features: data.features.split('\n').map((s) => s.trim()).filter(Boolean),
        highlights: data.highlights.split('\n').map((s) => s.trim()).filter(Boolean),
      }),
    })
    if (res.ok) router.push('/admin/communities')
    else alert('保存失败')
  }

  if (notFound) {
    return <div className="text-gray-500">社区未找到</div>
  }

  if (!initial) {
    return <div className="text-gray-500">加载中...</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">编辑社区</h1>
      <CommunityForm initial={initial} submitLabel="保存修改" onSubmit={handleSubmit} />
    </div>
  )
}
