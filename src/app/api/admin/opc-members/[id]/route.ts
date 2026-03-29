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
  const member = await prisma.opcMember.findUnique({ where: { id } })
  if (!member) return Response.json({ error: '未找到' }, { status: 404 })
  return Response.json({ member })
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
    const member = await prisma.opcMember.update({
      where: { id },
      data: {
        name: data.name,
        avatar: data.avatar,
        title: data.title,
        quote: data.quote,
        bio: data.bio,
        photo: data.photo,
        skills: data.skills,
        currentWork: data.currentWork,
        category: data.category,
        productName: data.productName,
        productLogo: data.productLogo,
        productDesc: data.productDesc,
        productDetail: data.productDetail,
        productImg: data.productImg,
        productStage: data.productStage,
        productLink: data.productLink,
        order: data.order,
        visible: data.visible,
      },
    })
    return Response.json({ member })
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
    await prisma.opcMember.delete({ where: { id } })
    return Response.json({ success: true })
  } catch {
    return Response.json({ error: '删除失败' }, { status: 500 })
  }
}
