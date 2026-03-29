import { getAdminFromRequest, adminUnauthorizedResponse } from '@/lib/admin-auth'

export async function GET() {
  const admin = await getAdminFromRequest()
  if (!admin) return adminUnauthorizedResponse()
  return Response.json({ admin })
}
