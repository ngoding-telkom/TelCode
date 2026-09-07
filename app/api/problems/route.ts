import { NextResponse } from 'next/server'
import { listProblems } from '@/services/problem.services.ts'

export async function GET() {
  try {
    const problems = await listProblems()
    return NextResponse.json({ data: problems })
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
