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

  const [applications, total] = await Promise.all([
    prisma.application.findMany({
      orderBy: { createdAt: 'desc' },
      skip,
      take: pageSize,
    }),
    prisma.application.count(),
  ])

  return Response.json({ applications, total, page, pageSize })
}
