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

  const [partners, total] = await Promise.all([
    prisma.partner.findMany({
      orderBy: { order: 'asc' },
      skip,
      take: pageSize,
    }),
    prisma.partner.count(),
  ])

  return Response.json({ partners, total, page, pageSize })
}

export async function POST(request: NextRequest) {
  const admin = await getAdminFromRequest()
  if (!admin) return adminUnauthorizedResponse()

  try {
    const data = await request.json()
    const partner = await prisma.partner.create({
      data: {
        name: data.name || '',
        logo: data.logo || '',
        website: data.website || '',
        category: data.category || '合作伙伴',
        order: data.order || 0,
        visible: data.visible !== false,
      },
    })
    return Response.json({ partner }, { status: 201 })
  } catch {
    return Response.json({ error: '创建失败' }, { status: 500 })
  }
}
