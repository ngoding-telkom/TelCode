import { NextResponse } from 'next/server'
import { getAuthenticatedUser, UnauthorizedError } from '@/middlewares/auth.middleware'
import { submitSolution, listUserSubmissions } from '@/services/submission.service'

export async function POST(req: Request) {
  try {
    const user = await getAuthenticatedUser(req)
    const { problemId, languageId, code } = await req.json()
    const result = await submitSolution(user.id, problemId, languageId, code)
    return NextResponse.json({ data: result })
  } catch (err) {
    const status = err instanceof UnauthorizedError ? 401 : 400
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status })
  }
}

export async function GET(req: Request) {
  try {
    const user = await getAuthenticatedUser(req)
    const problemId = new URL(req.url).searchParams.get('problemId') ?? undefined
    const submissions = await listUserSubmissions(user.id, problemId)
    return NextResponse.json({ data: submissions })
  } catch (err) {
    const status = err instanceof UnauthorizedError ? 401 : 400
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status })
  }
}
