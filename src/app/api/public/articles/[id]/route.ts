import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const article = await prisma.article.findUnique({
    where: { id },
  })

  if (!article || !article.visible) {
    return NextResponse.json({ error: '文章未找到' }, { status: 404 })
  }

  return NextResponse.json({ data: article })
}
