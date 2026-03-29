import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const hasUrl = !!process.env.TURSO_DATABASE_URL
    const hasToken = !!process.env.TURSO_AUTH_TOKEN
    const dbUrl = process.env.DATABASE_URL

    // Try to import and create adapter
    const { PrismaLibSql } = await import('@prisma/adapter-libsql')
    const adapter = new PrismaLibSql({
      url: process.env.TURSO_DATABASE_URL || '',
      authToken: process.env.TURSO_AUTH_TOKEN,
    })

    const { PrismaClient } = await import('@/generated/prisma/client')
    const prisma = new PrismaClient({ adapter })

    const count = await prisma.admin.count()
    await prisma.$disconnect()

    return NextResponse.json({
      ok: true,
      hasUrl,
      hasToken,
      dbUrl: dbUrl?.substring(0, 20),
      adminCount: count
    })
  } catch (e: unknown) {
    const error = e as Error
    return NextResponse.json({
      ok: false,
      error: error.message?.substring(0, 500),
      hasUrl: !!process.env.TURSO_DATABASE_URL,
      hasToken: !!process.env.TURSO_AUTH_TOKEN,
      dbUrl: process.env.DATABASE_URL?.substring(0, 20),
    }, { status: 500 })
  }
}
