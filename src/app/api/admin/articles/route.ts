import { NextRequest } from 'next/server'
import prisma from '@/lib/db'
import { getAdminFromRequest, adminUnauthorizedResponse } from '@/lib/admin-auth'

export async function GET(request: NextRequest) {
  const admin = await getAdminFromRequest()
  if (!admin) return adminUnauthorizedResponse()

  const { searchParams } = request.nextUrl
  const page = parseInt(searchParams.get('page') || '1')
  const pageSize = parseInt(searchParams.get('pageSize') || '20')
  const skip = (page - 1) * pageSize

  const [articles, total] = await Promise.all([
    prisma.article.findMany({
      orderBy: { createdAt: 'desc' },
      skip,
      take: pageSize,
    }),
    prisma.article.count(),
  ])

  return Response.json({ articles, total, page, pageSize })
}

export async function POST(request: NextRequest) {
  const admin = await getAdminFromRequest()
  if (!admin) return adminUnauthorizedResponse()

  try {
    const data = await request.json()
    const article = await prisma.article.create({
      data: {
        title: data.title || '',
        summary: data.summary || '',
        content: data.content || '',
        coverImage: data.coverImage || '',
        category: data.category || '资讯',
        author: data.author || 'NB OPC',
        tags: data.tags || '',
        visible: data.visible !== false,
      },
    })
    return Response.json({ article }, { status: 201 })
  } catch {
    return Response.json({ error: '创建失败' }, { status: 500 })
  }
}
