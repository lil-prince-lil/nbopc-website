import { NextResponse } from 'next/server'
import { createClient } from '@libsql/client/http'

export async function GET() {
  try {
    const client = createClient({
      url: process.env.TURSO_DATABASE_URL!.replace('libsql://', 'https://'),
      authToken: process.env.TURSO_AUTH_TOKEN,
    })

    const result = await client.execute('SELECT COUNT(*) as count FROM Admin')

    return NextResponse.json({
      ok: true,
      count: result.rows[0]?.count,
    })
  } catch (e: unknown) {
    const error = e as Error
    return NextResponse.json({
      ok: false,
      error: error.message?.substring(0, 500),
    }, { status: 500 })
  }
}
