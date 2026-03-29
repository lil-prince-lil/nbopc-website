import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  const where: Record<string, unknown> = { visible: true }
  if (category && category !== '全部') where.category = category

  const members = await prisma.opcMember.findMany({
    where,
    orderBy: { order: 'asc' },
  })
  return NextResponse.json({ data: members })
}
