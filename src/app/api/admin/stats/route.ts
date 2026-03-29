import prisma from '@/lib/db'
import { getAdminFromRequest, adminUnauthorizedResponse } from '@/lib/admin-auth'

export async function GET() {
  const admin = await getAdminFromRequest()
  if (!admin) return adminUnauthorizedResponse()

  const [articles, activities, opcMembers, users, applications] = await Promise.all([
    prisma.article.count(),
    prisma.activity.count(),
    prisma.opcMember.count(),
    prisma.user.count(),
    prisma.application.count(),
  ])

  return Response.json({ articles, activities, opcMembers, users, applications })
}
