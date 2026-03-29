import { NextResponse } from 'next/server'
import prisma from '@/lib/db'
import { verifyPassword, signToken } from '@/lib/auth'
import { USER_COOKIE_NAME } from '@/lib/user-auth'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { phone, password } = body

    if (!phone || !password) {
      return NextResponse.json(
        { error: '请输入手机号和密码' },
        { status: 400 }
      )
    }

    // Find user
    const user = await prisma.user.findUnique({ where: { phone } })
    if (!user) {
      return NextResponse.json(
        { error: '手机号或密码错误' },
        { status: 401 }
      )
    }

    // Verify password
    const valid = await verifyPassword(password, user.password)
    if (!valid) {
      return NextResponse.json(
        { error: '手机号或密码错误' },
        { status: 401 }
      )
    }

    // Generate token
    const token = await signToken({
      sub: user.id,
      role: 'user',
      name: user.name,
    })

    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        phone: user.phone,
        name: user.name,
        avatar: user.avatar,
        company: user.company,
        createdAt: user.createdAt,
      },
    })

    response.cookies.set(USER_COOKIE_NAME, token, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json(
      { error: '登录失败，请稍后重试' },
      { status: 500 }
    )
  }
}
