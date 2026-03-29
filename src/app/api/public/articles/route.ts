import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const category = searchParams.get('category')

  const where: Record<string, unknown> = { visible: true }
  if (category) where.category = category

  const articles = await prisma.article.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json({ data: articles })
}
