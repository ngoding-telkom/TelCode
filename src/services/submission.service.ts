import { createSubmission, updateSubmissionStatus, findSubmissionsByUser, findSubmissionById } from '@/repositories/submission.repository'
import { findAllTestCases } from '@/repositories/test-case.repository'
import { saveSubmissionResults, findResultsBySubmission } from '@/repositories/submission-result.repository'
import { executionService } from '@/services/execution'

export async function submitSolution(userId: string, problemId: string, languageId: number, code: string) {
  const submission = await createSubmission(userId, problemId, languageId, code)
  const testCases = await findAllTestCases(problemId) // hidden test case, hanya dari sini

  const results = []
  for (const tc of testCases) {
    const result = await executionService.runTestCase(code, 'javascript', tc.input)
    results.push({
      testCaseId: tc.id,
      passed: result.actualOutput.trim() === tc.expected_output.trim(),
      actualOutput: result.actualOutput,
      runtimeMs: result.runtimeMs,
    })
  }

  await saveSubmissionResults(submission.id, results)
  const verdict = results.every(r => r.passed) ? 'accepted' : 'wrong_answer'
  await updateSubmissionStatus(submission.id, verdict)

  return { submissionId: submission.id, verdict, results }
}

export async function listUserSubmissions(userId: string, problemId?: string) {
  return findSubmissionsByUser(userId, problemId)
}

export async function getSubmissionDetail(submissionId: string, userId: string) {
  const submission = await findSubmissionById(submissionId, userId)
  const results = await findResultsBySubmission(submissionId)
  return { ...submission, results }
}
