import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const member = await prisma.opcMember.findUnique({
    where: { id },
  })

  if (!member || !member.visible) {
    return NextResponse.json({ error: '成员未找到' }, { status: 404 })
  }

  return NextResponse.json({ data: member })
}
