import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const data = await request.json()

  if (!data.name || !data.phone) {
    return NextResponse.json({ error: '姓名和手机号为必填' }, { status: 400 })
  }

  const signup = await prisma.activitySignup.create({
    data: {
      activityId: id,
      name: data.name,
      phone: data.phone,
      email: data.email || '',
      company: data.company || '',
    },
  })

  return NextResponse.json({ data: signup })
}
