import { NextResponse } from 'next/server'
import { getAuthenticatedUser, UnauthorizedError } from '@/middlewares/auth.middleware'
import { getSubmissionDetail } from '@/services/submission.service'

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const user = await getAuthenticatedUser(req)
    const { id } = await params
    const detail = await getSubmissionDetail(id, user.id)
    return NextResponse.json({ data: detail })
  } catch (err) {
    const status = err instanceof UnauthorizedError ? 401 : 404
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status })
  }
}
