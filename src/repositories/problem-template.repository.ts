import { supabaseServer } from '@/config/supabase-server'

export async function findTemplateByProblemAndLanguage(problemId: string, languageId: number) {
  const { data, error } = await supabaseServer
    .from('problem_templates')
    .select('starter_code')
    .eq('problem_id', problemId)
    .eq('language_id', languageId)
    .single()
  if (error) throw new Error(`Failed to fetch template: ${error.message}`)
  return data
}
