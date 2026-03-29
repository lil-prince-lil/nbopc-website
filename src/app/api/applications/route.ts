import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, email, company, position, reason, type } = body

    if (!name || !name.trim()) {
      return NextResponse.json({ error: '请输入姓名' }, { status: 400 })
    }

    if (!phone || !/^1\d{10}$/.test(phone)) {
      return NextResponse.json({ error: '请输入正确的11位手机号' }, { status: 400 })
    }

    const application = await prisma.application.create({
      data: {
        name: name.trim(),
        phone,
        email: email || '',
        company: company || '',
        position: position || '',
        reason: reason || '',
        type: type || '个人',
      },
    })

    return NextResponse.json({
      success: true,
      message: '申请已提交，我们会尽快审核',
      id: application.id,
    })
  } catch (error) {
    console.error('Application submit error:', error)
    return NextResponse.json(
      { error: '提交失败，请稍后重试' },
      { status: 500 }
    )
  }
}
