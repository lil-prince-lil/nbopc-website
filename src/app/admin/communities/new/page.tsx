'use client'

import { useRouter } from 'next/navigation'
import CommunityForm, { EMPTY_COMMUNITY, type CommunityFormData } from '@/components/admin/CommunityForm'

export default function NewCommunityPage() {
  const router = useRouter()

  async function handleSubmit(data: CommunityFormData) {
    const res = await fetch('/api/admin/communities', {
      method: 'POST',
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

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">新增社区</h1>
      <CommunityForm initial={EMPTY_COMMUNITY} submitLabel="保存" onSubmit={handleSubmit} />
    </div>
  )
}
