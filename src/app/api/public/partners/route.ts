import { NextResponse } from 'next/server'
import prisma from '@/lib/db'

export async function GET() {
  const partners = await prisma.partner.findMany({
    where: { visible: true },
    orderBy: { order: 'asc' },
  })
  return NextResponse.json({ data: partners })
}
