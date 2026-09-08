import { NextResponse } from 'next/server'
import { getAuthenticatedUser } from '@/middlewares/auth.middleware'
import { getSubmissionDetail } from '@/services/submission.service'

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const user = await getAuthenticatedUser(req)
    const detail = await getSubmissionDetail(params.id, user.id)
    return NextResponse.json({ data: detail })
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status: 404 })
  }
}
