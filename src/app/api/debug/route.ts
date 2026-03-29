import { NextResponse } from 'next/server'
import { createClient } from '@libsql/client/web'

export async function GET() {
  try {
    const client = createClient({
      url: process.env.TURSO_DATABASE_URL || 'missing',
      authToken: process.env.TURSO_AUTH_TOKEN,
    })

    const result = await client.execute('SELECT COUNT(*) as count FROM Admin')
    const directCount = result.rows[0]?.count

    return NextResponse.json({ ok: true, directCount })
  } catch (e: unknown) {
    const error = e as Error
    return NextResponse.json({
      ok: false,
      name: error.name,
      error: error.message?.substring(0, 500),
    }, { status: 500 })
  }
}
