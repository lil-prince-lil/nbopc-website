import { NextRequest } from 'next/server'
import prisma from '@/lib/db'
import { getAdminFromRequest, adminUnauthorizedResponse } from '@/lib/admin-auth'

export async function GET() {
  const admin = await getAdminFromRequest()
  if (!admin) return adminUnauthorizedResponse()

  const configs = await prisma.siteConfig.findMany()
  const settings: Record<string, string> = {}
  for (const c of configs) {
    settings[c.key] = c.value
  }
  return Response.json({ settings })
}

export async function PUT(request: NextRequest) {
  const admin = await getAdminFromRequest()
  if (!admin) return adminUnauthorizedResponse()

  try {
    const { settings } = await request.json() as { settings: Record<string, string> }

    for (const [key, value] of Object.entries(settings)) {
      await prisma.siteConfig.upsert({
        where: { key },
        update: { value },
        create: { key, value },
      })
    }

    return Response.json({ success: true })
  } catch {
    return Response.json({ error: '保存失败' }, { status: 500 })
  }
}
