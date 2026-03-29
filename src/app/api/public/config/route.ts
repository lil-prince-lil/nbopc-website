import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET() {
  const configs = await prisma.siteConfig.findMany()
  const configMap: Record<string, string> = {}
  configs.forEach(c => { configMap[c.key] = c.value })
  return NextResponse.json({ data: configMap })
}
