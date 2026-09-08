import { supabaseServer } from '../config/supabase-server.ts'

export async function findProblemBySlug(slug: string) {
  const { data, error } = await supabaseServer
    .from('problems')
    .select('id, slug, title, description, difficulty')
    .eq('slug', slug)
    .eq('is_published', true)
    .single()
  if (error) throw new Error(`Failed to fetch problem: ${error.message}`)
  return data
}
