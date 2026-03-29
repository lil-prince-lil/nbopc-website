import { cookies } from 'next/headers'
import { verifyToken } from '@/lib/auth'

const ADMIN_TOKEN_COOKIE = 'admin_token'

export interface AdminInfo {
  id: string
  name: string
  role: string
}

export async function getAdminFromRequest(): Promise<AdminInfo | null> {
  const cookieStore = await cookies()
  const tokenCookie = cookieStore.get(ADMIN_TOKEN_COOKIE)
  if (!tokenCookie?.value) return null

  const payload = await verifyToken(tokenCookie.value)
  if (!payload || payload.role !== 'admin') return null

  return {
    id: payload.sub,
    name: payload.name,
    role: payload.role,
  }
}

export async function requireAdmin(): Promise<AdminInfo> {
  const admin = await getAdminFromRequest()
  if (!admin) {
    throw new Error('Unauthorized')
  }
  return admin
}

export function adminUnauthorizedResponse() {
  return Response.json({ error: '未授权，请先登录' }, { status: 401 })
}
