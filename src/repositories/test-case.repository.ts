import { supabaseServer } from '@/config/supabase-server'

// Boleh dipanggil dari mana saja — cuma sample, aman dilihat user
export async function findSampleTestCases(problemId: string) {
  const { data, error } = await supabaseServer
    .from('test_cases')
    .select('id, input, expected_output, order_index')
    .eq('problem_id', problemId)
    .eq('is_sample', true)
    .order('order_index')
  if (error) throw new Error(`Failed to fetch sample test cases: ${error.message}`)
  return data
}

// PENTING: hanya boleh dipanggil dari submission.service saat grading.
// Jangan pernah panggil ini dari route handler yang response-nya balik ke client.
export async function findAllTestCases(problemId: string) {
  const { data, error } = await supabaseServer
    .from('test_cases')
    .select('id, input, expected_output, order_index')
    .eq('problem_id', problemId)
    .order('order_index')
  if (error) throw new Error(`Failed to fetch test cases: ${error.message}`)
  return data
}
