import { NextRequest } from 'next/server'
import prisma from '@/lib/db'
import { getAdminFromRequest, adminUnauthorizedResponse } from '@/lib/admin-auth'

// 把可能是数组或换行字符串的输入统一转成 JSON 数组字符串
function toJsonArray(input: unknown): string {
  if (Array.isArray(input)) {
    return JSON.stringify(input.map((s) => String(s).trim()).filter(Boolean))
  }
  if (typeof input === 'string') {
    const arr = input
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean)
    return JSON.stringify(arr)
  }
  return JSON.stringify([])
}

export async function GET() {
  const admin = await getAdminFromRequest()
  if (!admin) return adminUnauthorizedResponse()

  const communities = await prisma.community.findMany({
    orderBy: { order: 'asc' },
  })
  return Response.json({ communities, total: communities.length })
}

export async function POST(request: NextRequest) {
  const admin = await getAdminFromRequest()
  if (!admin) return adminUnauthorizedResponse()

  try {
    const data = await request.json()
    const community = await prisma.community.create({
      data: {
        name: data.name || '',
        shortName: data.shortName || '',
        district: data.district || '',
        status: data.status || 'operating',
        spotlightLabel: data.spotlightLabel || '',
        spotlightColor: data.spotlightColor || 'blue',
        address: data.address || '',
        operator: data.operator || '',
        launchTime: data.launchTime || '',
        scale: data.scale || '',
        positioning: data.positioning || '',
        features: toJsonArray(data.features),
        highlights: toJsonArray(data.highlights),
        policy: data.policy || '',
        ecosystem: data.ecosystem || '',
        representatives: data.representatives || '',
        servicePackages: data.servicePackages || '',
        notes: data.notes || '',
        order: typeof data.order === 'number' ? data.order : 0,
        visible: data.visible !== false,
      },
    })
    return Response.json({ community }, { status: 201 })
  } catch {
    return Response.json({ error: '创建失败' }, { status: 500 })
  }
}
