import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const { PrismaLibSql } = await import('@prisma/adapter-libsql')
    const adapter = new PrismaLibSql({
      url: process.env.TURSO_DATABASE_URL || 'missing',
      authToken: process.env.TURSO_AUTH_TOKEN,
    })

    const { PrismaClient } = await import('@/generated/prisma/client')
    const prisma = new PrismaClient({ adapter })

    const count = await prisma.admin.count()
    await prisma.$disconnect()

    return NextResponse.json({ ok: true, adminCount: count })
  } catch (e: unknown) {
    const error = e as Error
    return NextResponse.json({
      ok: false,
      name: error.name,
      error: error.message?.substring(0, 1000),
      stack: error.stack?.substring(0, 500),
      envCheck: {
        TURSO_URL: process.env.TURSO_DATABASE_URL?.substring(0, 30),
        TURSO_TOKEN: process.env.TURSO_AUTH_TOKEN ? 'SET' : 'MISSING',
        DATABASE_URL: process.env.DATABASE_URL?.substring(0, 30),
      }
    }, { status: 500 })
  }
}
