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
  const application = await prisma.application.findUnique({ where: { id } })
  if (!application) return Response.json({ error: '未找到' }, { status: 404 })
  return Response.json({ application })
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
    if (!['approved', 'rejected', 'pending'].includes(data.status)) {
      return Response.json({ error: '无效状态' }, { status: 400 })
    }
    const application = await prisma.application.update({
      where: { id },
      data: { status: data.status },
    })
    return Response.json({ application })
  } catch {
    return Response.json({ error: '更新失败' }, { status: 500 })
  }
}
