import { supabaseServer } from '@/config/supabase-server'

export class UnauthorizedError extends Error {
  constructor(message = 'Unauthorized') {
    super(message)
    this.name = 'UnauthorizedError'
  }
}

export async function getAuthenticatedUser(request: Request) {
  const authHeader = request.headers.get('authorization')
  const [scheme, token] = authHeader?.split(/\s+/, 2) ?? []
  if (scheme !== 'Bearer' || !token) {
    throw new UnauthorizedError('Missing or invalid Authorization header')
  }

  const { data, error } = await supabaseServer.auth.getUser(token)
  if (error || !data.user) throw new UnauthorizedError()

  return data.user
}
