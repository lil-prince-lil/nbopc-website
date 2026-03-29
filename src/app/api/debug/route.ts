import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const tursoUrl = process.env.TURSO_DATABASE_URL || ''

    // Test 1: Parse with @libsql/core URI parser
    let uriResult = ''
    try {
      const { parseUri } = await import('@libsql/core/uri')
      const parsed = parseUri(tursoUrl)
      uriResult = `scheme=${parsed.scheme} host=${parsed.authority?.host} path=${parsed.path}`
    } catch (e: unknown) {
      uriResult = `FAIL: ${(e as Error).message}`
    }

    // Test 2: expandConfig
    let configResult = ''
    try {
      const { expandConfig } = await import('@libsql/core/config')
      const config = expandConfig({ url: tursoUrl, authToken: process.env.TURSO_AUTH_TOKEN }, true)
      configResult = `scheme=${config.scheme} authority=${JSON.stringify(config.authority)}`
    } catch (e: unknown) {
      configResult = `FAIL: ${(e as Error).message}`
    }

    // Test 3: createClient
    let clientResult = ''
    try {
      const { createClient } = await import('@libsql/client')
      const c = createClient({ url: tursoUrl, authToken: process.env.TURSO_AUTH_TOKEN })
      const r = await c.execute('SELECT 1 as test')
      clientResult = `OK: ${JSON.stringify(r.rows[0])}`
    } catch (e: unknown) {
      clientResult = `FAIL: ${(e as Error).message}`
    }

    return NextResponse.json({ uriResult, configResult, clientResult })
  } catch (e: unknown) {
    return NextResponse.json({ error: (e as Error).message?.substring(0, 500) }, { status: 500 })
  }
}
