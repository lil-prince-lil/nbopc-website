import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const activity = await prisma.activity.findUnique({
    where: { id },
  })

  if (!activity || !activity.visible) {
    return NextResponse.json({ error: '活动未找到' }, { status: 404 })
  }

  return NextResponse.json({ data: activity })
}
