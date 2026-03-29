import { NextResponse } from 'next/server'

export async function GET() {
  const tursoUrl = process.env.TURSO_DATABASE_URL || ''

  try {
    // Test URL parsing
    let parseResult = 'not tested'
    try {
      const u = new URL(tursoUrl)
      parseResult = `OK: protocol=${u.protocol} host=${u.host}`
    } catch (e: unknown) {
      const err = e as Error
      parseResult = `FAIL: ${err.message}`
    }

    // Try with https:// instead of libsql://
    const httpsUrl = tursoUrl.replace('libsql://', 'https://')

    const { createClient } = await import('@libsql/client/web')
    const client = createClient({
      url: httpsUrl,
      authToken: process.env.TURSO_AUTH_TOKEN,
    })

    const result = await client.execute('SELECT COUNT(*) as count FROM Admin')

    return NextResponse.json({
      ok: true,
      count: result.rows[0]?.count,
      parseResult,
      nodeVersion: process.version,
      urlLength: tursoUrl.length,
      urlPreview: tursoUrl.substring(0, 60),
    })
  } catch (e: unknown) {
    const error = e as Error
    return NextResponse.json({
      ok: false,
      error: error.message?.substring(0, 500),
      nodeVersion: process.version,
      urlLength: tursoUrl.length,
      urlHex: Buffer.from(tursoUrl.substring(0, 10)).toString('hex'),
    }, { status: 500 })
  }
}
