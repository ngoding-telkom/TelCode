import { findProblemBySlug } from '@/repositories/problem.repository'
import { findTemplateByProblemAndLanguage } from '@/repositories/problem-template.repository'
import { findSampleTestCases } from '@/repositories/test-case.repository'

const JS_LANGUAGE_ID = 1 // sesuaikan dengan id JavaScript di tabel `languages` kamu

export async function getProblemDetail(slug: string) {
  const problem = await findProblemBySlug(slug)
  const template = await findTemplateByProblemAndLanguage(problem.id, JS_LANGUAGE_ID)
  const sampleTestCases = await findSampleTestCases(problem.id)
  return { ...problem, starterCode: template.starter_code, sampleTestCases }
}
