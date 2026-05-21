import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

function parseArray(v: string): string[] {
  if (!v) return []
  try {
    const parsed = JSON.parse(v)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export async function GET() {
  const rows = await prisma.community.findMany({
    where: { visible: true },
    orderBy: { order: 'asc' },
  })
  const data = rows.map((c) => ({
    id: c.id,
    name: c.name,
    shortName: c.shortName,
    district: c.district,
    status: c.status,
    spotlightLabel: c.spotlightLabel,
    spotlightColor: c.spotlightColor,
    address: c.address,
    operator: c.operator,
    launchTime: c.launchTime,
    scale: c.scale,
    positioning: c.positioning,
    features: parseArray(c.features),
    highlights: parseArray(c.highlights),
    policy: c.policy,
    ecosystem: c.ecosystem,
    representatives: c.representatives,
    servicePackages: c.servicePackages,
    notes: c.notes,
  }))
  return NextResponse.json({ data })
}
