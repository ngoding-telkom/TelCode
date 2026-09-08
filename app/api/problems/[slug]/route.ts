import { NextResponse } from 'next/server'
import { getProblemDetail } from '@/services/problem.service'

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  try {
    const problem = await getProblemDetail(params.slug)
    return NextResponse.json({ data: problem })
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status: 404 })
  }
}
