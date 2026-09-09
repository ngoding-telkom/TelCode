import { NextResponse } from 'next/server'
import { findAllLanguages } from '@/repositories/languages.repository'

export async function GET() {
  try {
    const data = await findAllLanguages()
    return NextResponse.json({ data })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
