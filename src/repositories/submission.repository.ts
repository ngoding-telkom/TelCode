import { supabaseServer } from '@/config/supabase-server'

export async function createSubmission(userId: string, problemId: string, languageId: number, code: string) {
  const { data, error } = await supabaseServer
    .from('submissions')
    .insert({ user_id: userId, problem_id: problemId, language_id: languageId, code, status: 'pending' })
    .select()
    .single()
  if (error) throw new Error(`Failed to create submission: ${error.message}`)
  return data
}

export async function updateSubmissionStatus(submissionId: string, status: string) {
  const { error } = await supabaseServer.from('submissions').update({ status }).eq('id', submissionId)
  if (error) throw new Error(`Failed to update submission: ${error.message}`)
}

export async function findSubmissionsByUser(userId: string, problemId?: string) {
  let query = supabaseServer
    .from('submissions')
    .select('id, problem_id, language_id, status, created_at')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
  if (problemId) query = query.eq('problem_id', problemId)
  const { data, error } = await query
  if (error) throw new Error(`Failed to fetch submissions: ${error.message}`)
  return data
}

export async function findSubmissionById(submissionId: string, userId: string) {
  const { data, error } = await supabaseServer
    .from('submissions')
    .select('id, problem_id, language_id, code, status, created_at')
    .eq('id', submissionId)
    .eq('user_id', userId)
    .single()
  if (error) throw new Error(`Failed to fetch submission: ${error.message}`)
  return data
}
