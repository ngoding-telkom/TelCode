import { supabaseServer } from '../config/supabase-server.ts'

export async function findPublishedProblems() {
  const { data, error } = await supabaseServer
    .from('problems')
    .select('id, slug, title, difficulty')
    .eq('is_published', true)
    .order('created_at', { ascending: false })

  if (error) throw new Error(`Failed to fetch problems: ${error.message}`)
  return data
}
