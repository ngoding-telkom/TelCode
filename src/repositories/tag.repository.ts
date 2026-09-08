import { supabaseServer } from '@/config/supabase-server'

export async function findAllTags() {
  const { data, error } = await supabaseServer.from('tags').select('id, name')
  if (error) throw new Error(`Failed to fetch tags: ${error.message}`)
  return data
}
