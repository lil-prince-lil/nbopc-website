import { NextResponse } from 'next/server'
import { PrismaLibSql } from '@prisma/adapter-libsql'
import { PrismaClient } from '@/generated/prisma/client'

export async function GET() {
  try {
    // Use https:// URL for Vercel compatibility
    const url = (process.env.TURSO_DATABASE_URL || '').replace('libsql://', 'https://')

    const adapter = new PrismaLibSql({
      url,
      authToken: process.env.TURSO_AUTH_TOKEN,
    })

    const prisma = new PrismaClient({ adapter })
    const count = await prisma.admin.count()
    await prisma.$disconnect()

    return NextResponse.json({ ok: true, count })
  } catch (e: unknown) {
    const error = e as Error
    return NextResponse.json({
      ok: false,
      error: error.message?.substring(0, 500),
      name: error.name,
    }, { status: 500 })
  }
}
