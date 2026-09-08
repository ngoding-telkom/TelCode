// src/middlewares/auth.middleware.ts
import { supabaseServer } from '@/config/supabase-server'

export async function getAuthenticatedUser(request: Request) {
  const authHeader = request.headers.get('authorization')
  if (!authHeader?.startsWith('Bearer ')) throw new Error('Missing or invalid Authorization header')

  const token = authHeader.replace('Bearer ', '')
  const { data, error } = await supabaseServer.auth.getUser(token)
  if (error || !data.user) throw new Error('Unauthorized')

  return data.user
}
