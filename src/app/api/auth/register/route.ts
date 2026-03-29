import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { hashPassword, signToken } from '@/lib/auth'
import { USER_COOKIE_NAME } from '@/lib/user-auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { phone, password, name } = body

    // Validate phone
    if (!phone || !/^1\d{10}$/.test(phone)) {
      return NextResponse.json(
        { error: '请输入正确的11位手机号' },
        { status: 400 }
      )
    }

    // Validate password
    if (!password || password.length < 6) {
      return NextResponse.json(
        { error: '密码至少6位' },
        { status: 400 }
      )
    }

    // Validate name
    if (!name || !name.trim()) {
      return NextResponse.json(
        { error: '请输入姓名/昵称' },
        { status: 400 }
      )
    }

    // Check if phone already registered
    const existing = await prisma.user.findUnique({ where: { phone } })
    if (existing) {
      return NextResponse.json(
        { error: '该手机号已注册' },
        { status: 400 }
      )
    }

    // Create user
    const hashedPassword = await hashPassword(password)
    const user = await prisma.user.create({
      data: {
        phone,
        password: hashedPassword,
        name: name.trim(),
      },
    })

    // Generate token
    const token = await signToken({
      sub: user.id,
      role: 'user',
      name: user.name,
    })

    // Set cookie and return
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        phone: user.phone,
        name: user.name,
        avatar: user.avatar,
        createdAt: user.createdAt,
      },
    })

    response.cookies.set(USER_COOKIE_NAME, token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json(
      { error: '注册失败，请稍后重试' },
      { status: 500 }
    )
  }
}
