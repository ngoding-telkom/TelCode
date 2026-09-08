import { NextResponse } from 'next/server'
import { findAllTags } from '@/repositories/tag.repository'

export async function GET() {
  try {
    const data = await findAllTags()
    return NextResponse.json({ data })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
