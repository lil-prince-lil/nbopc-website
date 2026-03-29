import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Test: manually create HTTP client without using @libsql/client's URL parser
    const tursoUrl = (process.env.TURSO_DATABASE_URL || '').replace('libsql://', 'https://')
    const token = process.env.TURSO_AUTH_TOKEN || ''

    // Use Turso HTTP API directly
    const resp = await fetch(`${tursoUrl}/v2/pipeline`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        requests: [
          { type: 'execute', stmt: { sql: 'SELECT COUNT(*) as count FROM Admin' } },
          { type: 'close' },
        ],
      }),
    })

    if (!resp.ok) {
      const text = await resp.text()
      return NextResponse.json({ ok: false, status: resp.status, body: text.substring(0, 500) }, { status: 500 })
    }

    const data = await resp.json()
    const count = data?.results?.[0]?.response?.result?.rows?.[0]?.[0]?.value

    // Now test: can we parse the URL with globalThis.URL?
    let urlTest = ''
    try {
      new URL(tursoUrl)
      urlTest = 'URL parse OK'
    } catch (e: unknown) {
      urlTest = `URL parse failed: ${(e as Error).message}`
    }

    return NextResponse.json({ ok: true, count, urlTest, nodeVersion: process.version })
  } catch (e: unknown) {
    const error = e as Error
    return NextResponse.json({ ok: false, error: error.message?.substring(0, 500) }, { status: 500 })
  }
}
