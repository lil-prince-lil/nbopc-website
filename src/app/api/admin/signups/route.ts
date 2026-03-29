import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { getAdminFromRequest, adminUnauthorizedResponse } from '@/lib/admin-auth'

export async function GET(request: NextRequest) {
  const admin = await getAdminFromRequest()
  if (!admin) return adminUnauthorizedResponse()

  const { searchParams } = new URL(request.url)
  const activityId = searchParams.get('activityId')
  const format = searchParams.get('format')

  if (!activityId) {
    return NextResponse.json({ error: '请指定活动ID' }, { status: 400 })
  }

  const signups = await prisma.activitySignup.findMany({
    where: { activityId },
    orderBy: { createdAt: 'desc' },
  })

  if (format === 'csv') {
    const header = '姓名,手机,邮箱,公司,报名时间'
    const rows = signups.map(s =>
      `"${s.name}","${s.phone}","${s.email}","${s.company}","${new Date(s.createdAt).toLocaleString('zh-CN')}"`
    )
    const csv = [header, ...rows].join('\n')
    return new Response('\uFEFF' + csv, {
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': `attachment; filename="signups-${activityId}.csv"`,
      },
    })
  }

  return NextResponse.json({ signups })
}
