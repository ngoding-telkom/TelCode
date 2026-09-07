import { findPublishedProblems } from '../repositories/problem.repository.ts'

export async function listProblems() {
  const problems = await findPublishedProblems()
  return problems
}
