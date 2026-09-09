import { NextResponse } from 'next/server'
import { getAuthenticatedUser, UnauthorizedError } from '@/middlewares/auth.middleware'
import { findProfileById } from '@/repositories/profile.repository'

export async function GET(req: Request) {
  try {
    const user = await getAuthenticatedUser(req)
    const profile = await findProfileById(user.id)
    return NextResponse.json({ data: profile })
  } catch (err) {
    const status = err instanceof UnauthorizedError ? 401 : 500
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Unknown error' }, { status })
  }
}
