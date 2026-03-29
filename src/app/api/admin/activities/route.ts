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

  const [activities, total] = await Promise.all([
    prisma.activity.findMany({
      orderBy: { createdAt: 'desc' },
      skip,
      take: pageSize,
    }),
    prisma.activity.count(),
  ])

  return Response.json({ activities, total, page, pageSize })
}

export async function POST(request: NextRequest) {
  const admin = await getAdminFromRequest()
  if (!admin) return adminUnauthorizedResponse()

  try {
    const data = await request.json()
    const activity = await prisma.activity.create({
      data: {
        title: data.title || '',
        summary: data.summary || '',
        content: data.content || '',
        coverImage: data.coverImage || '',
        date: data.date || '',
        location: data.location || '',
        status: data.status || 'upcoming',
        tags: data.tags || '',
        visible: data.visible !== false,
      },
    })
    return Response.json({ activity }, { status: 201 })
  } catch {
    return Response.json({ error: '创建失败' }, { status: 500 })
  }
}
