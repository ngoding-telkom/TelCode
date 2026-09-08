import { supabaseServer } from '@/config/supabase-server'

export async function findProfileById(userId: string) {
  const { data, error } = await supabaseServer
    .from('profiles')
    .select('id, username, avatar_url, created_at')
    .eq('id', userId)
    .single()
  if (error) throw new Error(`Failed to fetch profile: ${error.message}`)
  return data
}
