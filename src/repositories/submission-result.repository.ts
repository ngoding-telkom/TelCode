import { supabaseServer } from '@/config/supabase-server'

export async function saveSubmissionResults(
  submissionId: string,
  results: { testCaseId: string; passed: boolean; actualOutput: string; runtimeMs?: number }[]
) {
  const rows = results.map(r => ({
    submission_id: submissionId,
    test_case_id: r.testCaseId,
    passed: r.passed,
    actual_output: r.actualOutput,
    runtime_ms: r.runtimeMs ?? null,
  }))
  const { error } = await supabaseServer.from('submission_results').insert(rows)
  if (error) throw new Error(`Failed to save results: ${error.message}`)
}

export async function findResultsBySubmission(submissionId: string) {
  const { data, error } = await supabaseServer.from('submission_results').select('*').eq('submission_id', submissionId)
  if (error) throw new Error(`Failed to fetch results: ${error.message}`)
  return data
}
