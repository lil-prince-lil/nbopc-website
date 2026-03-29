import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status') // 'upcoming' | 'ended' | null (all)

  const where: Record<string, unknown> = { visible: true }
  if (status) where.status = status

  const activities = await prisma.activity.findMany({
    where,
    orderBy: { date: 'desc' },
  })
  return NextResponse.json({ data: activities })
}
