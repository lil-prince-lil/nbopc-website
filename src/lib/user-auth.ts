import { verifyToken } from '@/lib/auth'
import prisma from '@/lib/db'

const USER_COOKIE_NAME = 'user_token'

export async function getUserFromRequest(request: Request) {
  try {
    const cookieHeader = request.headers.get('cookie') || ''
    const tokenMatch = cookieHeader.match(new RegExp(`${USER_COOKIE_NAME}=([^;]+)`))
    if (!tokenMatch) return null

    const token = tokenMatch[1]
    const payload = await verifyToken(token)
    if (!payload) return null

    const user = await prisma.user.findUnique({
      where: { id: payload.sub },
      select: {
        id: true,
        phone: true,
        name: true,
        avatar: true,
        company: true,
        createdAt: true,
      },
    })

    return user
  } catch {
    return null
  }
}

export { USER_COOKIE_NAME }
