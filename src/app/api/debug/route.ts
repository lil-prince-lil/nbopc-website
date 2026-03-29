import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test 1: Direct libsql connection (no Prisma)
    const { createClient } = await import('@libsql/client')
    const client = createClient({
      url: process.env.TURSO_DATABASE_URL || 'missing',
      authToken: process.env.TURSO_AUTH_TOKEN,
    })

    const result = await client.execute('SELECT COUNT(*) as count FROM Admin')
    const directCount = result.rows[0]?.count

    // Test 2: Prisma with adapter
    const { PrismaLibSql } = await import('@prisma/adapter-libsql')
    const adapter = new PrismaLibSql({
      url: process.env.TURSO_DATABASE_URL || 'missing',
      authToken: process.env.TURSO_AUTH_TOKEN,
    })

    const { PrismaClient } = await import('@/generated/prisma/client')
    const prisma = new PrismaClient({ adapter })

    const prismaCount = await prisma.admin.count()
    await prisma.$disconnect()

    return NextResponse.json({ ok: true, directCount, prismaCount })
  } catch (e: unknown) {
    const error = e as Error
    return NextResponse.json({
      ok: false,
      name: error.name,
      error: error.message?.substring(0, 1000),
      envCheck: {
        TURSO_URL: process.env.TURSO_DATABASE_URL?.substring(0, 50),
        TURSO_TOKEN: process.env.TURSO_AUTH_TOKEN ? 'SET(' + process.env.TURSO_AUTH_TOKEN.length + ')' : 'MISSING',
        DATABASE_URL: process.env.DATABASE_URL?.substring(0, 30),
      }
    }, { status: 500 })
  }
}
