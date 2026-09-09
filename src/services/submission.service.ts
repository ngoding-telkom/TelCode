import { createSubmission, updateSubmissionStatus, findSubmissionsByUser, findSubmissionById } from '@/repositories/submission.repository'
import { findAllTestCases } from '@/repositories/test-case.repository'
import { saveSubmissionResults, findResultsBySubmission } from '@/repositories/submission-result.repository'
import { executionService } from '@/services/execution'

export async function submitSolution(userId: string, problemId: string, languageId: number, code: string) {
  if (
    typeof userId !== 'string' ||
    !userId ||
    typeof problemId !== 'string' ||
    !problemId ||
    !Number.isInteger(languageId) ||
    languageId < 1
  ) {
    throw new Error('Invalid submission metadata')
  }
  if (typeof code !== 'string' || !code.trim() || code.length > 100_000) {
    throw new Error('Code must be non-empty and no longer than 100000 characters')
  }
  if (languageId !== 1) {
    throw new Error('This execution service currently supports JavaScript only')
  }

  const submission = await createSubmission(userId, problemId, languageId, code)
  try {
    const testCases = await findAllTestCases(problemId)
    if (testCases.length === 0) {
      throw new Error('Problem has no test cases')
    }

    const results = []
    let hasExecutionError = false
    for (const tc of testCases) {
      const result = await executionService.runTestCase(code, 'javascript', tc.input)
      hasExecutionError ||= result.hadError
      results.push({
        testCaseId: tc.id,
        passed: !result.hadError && result.actualOutput.trim() === tc.expected_output.trim(),
        actualOutput: result.hadError ? (result.errorMessage ?? '') : result.actualOutput,
        runtimeMs: result.runtimeMs,
      })    
    }

    await saveSubmissionResults(submission.id, results)
    const verdict = hasExecutionError
      ? 'runtime_error'
      : results.every(r => r.passed)
        ? 'accepted'
        : 'wrong_answer'
    await updateSubmissionStatus(submission.id, verdict)

    return { submissionId: submission.id, verdict, results }
  } catch (error) {
    await updateSubmissionStatus(submission.id, 'failed')
    throw error
  }
}

export async function listUserSubmissions(userId: string, problemId?: string) {
  return findSubmissionsByUser(userId, problemId)
}

export async function getSubmissionDetail(submissionId: string, userId: string) {
  const submission = await findSubmissionById(submissionId, userId)
  const results = await findResultsBySubmission(submissionId)
  return { ...submission, results }
}
