import { NextResponse } from 'next/server'

export async function GET() {
  const tursoUrl = process.env.TURSO_DATABASE_URL || ''
  const httpsUrl = tursoUrl.replace('libsql://', 'https://')

  try {
    // Direct HTTP request to Turso
    const resp = await fetch(`${httpsUrl}/v2/pipeline`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.TURSO_AUTH_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [
          { type: 'execute', stmt: { sql: 'SELECT COUNT(*) as count FROM Admin' } },
          { type: 'close' },
        ],
      }),
    })

    const data = await resp.json()
    const count = data?.results?.[0]?.response?.result?.rows?.[0]?.[0]?.value

    return NextResponse.json({
      ok: true,
      count,
      nodeVersion: process.version,
    })
  } catch (e: unknown) {
    const error = e as Error
    return NextResponse.json({
      ok: false,
      error: error.message?.substring(0, 500),
      nodeVersion: process.version,
    }, { status: 500 })
  }
}
