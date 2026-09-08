import { NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/middlewares/auth.middleware'
import { submitSolution, listUserSubmissions } from '@/services/submission.service'

export async function POST(req: Request) {
  try {
    const user = await getAuthenticatedUser(req)
    const { problemId, languageId, code } = await req.json()
    const result = await submitSolution(user.id, problemId, languageId, code)
    return NextResponse.json({ data: result })
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status: 400 })
  }
}

export async function GET(req: Request) {
  try {
    const user = await getAuthenticatedUser(req)
    const problemId = new URL(req.url).searchParams.get('problemId') ?? undefined
    const submissions = await listUserSubmissions(user.id, problemId)
    return NextResponse.json({ data: submissions })
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status: 400 })
  }
}
