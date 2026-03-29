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

  const [members, total] = await Promise.all([
    prisma.opcMember.findMany({
      orderBy: { order: 'asc' },
      skip,
      take: pageSize,
    }),
    prisma.opcMember.count(),
  ])

  return Response.json({ members, total, page, pageSize })
}

export async function POST(request: NextRequest) {
  const admin = await getAdminFromRequest()
  if (!admin) return adminUnauthorizedResponse()

  try {
    const data = await request.json()
    const member = await prisma.opcMember.create({
      data: {
        name: data.name || '',
        avatar: data.avatar || '',
        title: data.title || '',
        quote: data.quote || '',
        bio: data.bio || '',
        photo: data.photo || '',
        skills: data.skills || '',
        currentWork: data.currentWork || '',
        category: data.category || 'AI工具',
        productName: data.productName || '',
        productLogo: data.productLogo || '',
        productDesc: data.productDesc || '',
        productDetail: data.productDetail || '',
        productImg: data.productImg || '',
        productStage: data.productStage || '',
        productLink: data.productLink || '',
        order: data.order || 0,
        visible: data.visible !== false,
      },
    })
    return Response.json({ member }, { status: 201 })
  } catch {
    return Response.json({ error: '创建失败' }, { status: 500 })
  }
}
