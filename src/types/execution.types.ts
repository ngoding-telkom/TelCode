export interface ExecutionResult {
  actualOutput: string
  runtimeMs?: number
  hadError: boolean
  errorMessage?: string
}

export interface CodeExecutionService {
  runTestCase(code: string, language: string, input: string): Promise<ExecutionResult>
}
