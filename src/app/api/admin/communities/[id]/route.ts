import { NextRequest } from 'next/server'
import prisma from '@/lib/db'
import { getAdminFromRequest, adminUnauthorizedResponse } from '@/lib/admin-auth'

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

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminFromRequest()
  if (!admin) return adminUnauthorizedResponse()

  const { id } = await params
  const community = await prisma.community.findUnique({ where: { id } })
  if (!community) return Response.json({ error: '未找到' }, { status: 404 })
  return Response.json({ community })
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminFromRequest()
  if (!admin) return adminUnauthorizedResponse()

  const { id } = await params
  try {
    const data = await request.json()
    const community = await prisma.community.update({
      where: { id },
      data: {
        name: data.name,
        shortName: data.shortName,
        district: data.district,
        status: data.status,
        spotlightLabel: data.spotlightLabel,
        spotlightColor: data.spotlightColor,
        address: data.address,
        operator: data.operator,
        launchTime: data.launchTime,
        scale: data.scale,
        positioning: data.positioning,
        features: toJsonArray(data.features),
        highlights: toJsonArray(data.highlights),
        policy: data.policy,
        ecosystem: data.ecosystem,
        representatives: data.representatives,
        servicePackages: data.servicePackages,
        notes: data.notes,
        order: data.order,
        visible: data.visible,
      },
    })
    return Response.json({ community })
  } catch {
    return Response.json({ error: '更新失败' }, { status: 500 })
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminFromRequest()
  if (!admin) return adminUnauthorizedResponse()

  const { id } = await params
  try {
    await prisma.community.delete({ where: { id } })
    return Response.json({ success: true })
  } catch {
    return Response.json({ error: '删除失败' }, { status: 500 })
  }
}
