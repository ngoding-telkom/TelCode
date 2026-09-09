import type { CodeExecutionService, ExecutionResult } from '@/types/execution.types'

const WANDBOX_COMPILE_URL = process.env.WANDBOX_COMPILE_URL ?? process.env.WANDBOX_API_URL

// PENTING: cek nama compiler yang benar dulu via GET https://wandbox.org/api/list.json
// cari compiler dengan "language": "JavaScript" atau "Node.js" — namanya bisa berubah
// seiring versi Node yang mereka host (misal "nodejs-head" atau versi spesifik).
const NODE_COMPILER_NAME = 'nodejs-head'

interface WandboxResponse {
  status?: string
  signal?: string
  compiler_output?: string
  compiler_error?: string
  program_output?: string
  program_error?: string
}

export class WandboxExecutionService implements CodeExecutionService {
  async runTestCase(code: string, _language: string, input: string): Promise<ExecutionResult> {
    if (!WANDBOX_COMPILE_URL) {
      throw new Error('Wandbox compile URL is not configured')
    }

    const startedAt = Date.now()

    const res = await fetch(WANDBOX_COMPILE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        compiler: NODE_COMPILER_NAME,
        code,
        stdin: input,
        save: false,
      }),
    })

    if (!res.ok) {
      throw new Error(`Wandbox request failed with status ${res.status}`)
    }

    const data: WandboxResponse = await res.json()
    const runtimeMs = Date.now() - startedAt

    // signal muncul kalau proses di-kill (misal timeout/infinite loop dari sisi Wandbox)
    if (data.signal) {
      return { actualOutput: '', runtimeMs, hadError: true, errorMessage: `Killed: ${data.signal}` }
    }

    // compiler_error untuk JS biasanya syntax error sebelum sempat run
    if (data.compiler_error) {
      return { actualOutput: '', runtimeMs, hadError: true, errorMessage: data.compiler_error }
    }

    // status non-"0" = exit code error saat runtime
    if (data.status !== '0') {
      return {
        actualOutput: data.program_output ?? '',
        runtimeMs,
        hadError: true,
        errorMessage: data.program_error || `Exited with status ${data.status}`,
      }
    }

    return { actualOutput: data.program_output ?? '', runtimeMs, hadError: false }
  }
}
