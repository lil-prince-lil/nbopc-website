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
  const partner = await prisma.partner.findUnique({ where: { id } })
  if (!partner) return Response.json({ error: '未找到' }, { status: 404 })
  return Response.json({ partner })
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
    const partner = await prisma.partner.update({
      where: { id },
      data: {
        name: data.name,
        logo: data.logo,
        website: data.website,
        category: data.category,
        order: data.order,
        visible: data.visible,
      },
    })
    return Response.json({ partner })
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
    await prisma.partner.delete({ where: { id } })
    return Response.json({ success: true })
  } catch {
    return Response.json({ error: '删除失败' }, { status: 500 })
  }
}
