import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET() {
  const [opcCount, activityCount] = await Promise.all([
    prisma.opcMember.count({ where: { visible: true } }),
    prisma.activity.count({ where: { visible: true } }),
  ])

  return NextResponse.json({
    data: {
      opcCount,          // OPC图谱中的真实数量
      activityCount: 210 + activityCount,  // 210（历史活动）+ 数据库中的活动数
      partnerCount: 20,  // 固定值 20+
      enterpriseCount: 400,  // 固定值 400+
    },
  })
}
