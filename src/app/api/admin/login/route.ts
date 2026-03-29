import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import prisma from '@/lib/db'
import { verifyPassword, signToken } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    if (!username || !password) {
      return Response.json({ error: '请输入用户名和密码' }, { status: 400 })
    }

    const admin = await prisma.admin.findUnique({
      where: { username },
    })

    if (!admin) {
      return Response.json({ error: '用户名或密码错误' }, { status: 401 })
    }

    const valid = await verifyPassword(password, admin.password)
    if (!valid) {
      return Response.json({ error: '用户名或密码错误' }, { status: 401 })
    }

    const token = await signToken({
      sub: admin.id,
      role: 'admin',
      name: admin.name,
    })

    const cookieStore = await cookies()
    cookieStore.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return Response.json({
      success: true,
      admin: { id: admin.id, name: admin.name, role: admin.role },
    })
  } catch {
    return Response.json({ error: '服务器错误' }, { status: 500 })
  }
}
