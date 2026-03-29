import { NextResponse } from 'next/server'
import { USER_COOKIE_NAME } from '@/lib/user-auth'

export async function POST() {
  const response = NextResponse.json({ success: true })
  response.cookies.set(USER_COOKIE_NAME, '', {
    path: '/',
    httpOnly: true,
    sameSite: 'lax',
    maxAge: 0,
  })
  return response
}
