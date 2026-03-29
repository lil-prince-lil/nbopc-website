import { NextRequest } from 'next/server'
import prisma from '@/lib/db'
import { getAdminFromRequest, adminUnauthorizedResponse } from '@/lib/admin-auth'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getAdminFromRequest()
  if (!admin) return adminUnauthorizedResponse()

  const { id } = await params
  const activity = await prisma.activity.findUnique({ where: { id } })
  if (!activity) return Response.json({ error: '未找到' }, { status: 404 })
  return Response.json({ activity })
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
    const activity = await prisma.activity.update({
      where: { id },
      data: {
        title: data.title,
        summary: data.summary,
        content: data.content,
        coverImage: data.coverImage,
        date: data.date,
        location: data.location,
        status: data.status,
        tags: data.tags,
        visible: data.visible,
      },
    })
    return Response.json({ activity })
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
    await prisma.activity.delete({ where: { id } })
    return Response.json({ success: true })
  } catch {
    return Response.json({ error: '删除失败' }, { status: 500 })
  }
}
