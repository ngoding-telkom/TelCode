// src/services/execution/index.ts
import { WandboxExecutionService } from './wandbox.service'
import type { CodeExecutionService } from '@/types/execution.types'

// Titik ganti tunggal nanti pas migrasi ke Judge0:
// cukup ganti baris ini jadi `new Judge0ExecutionService()`,
// tidak ada file lain yang perlu disentuh.
export const executionService: CodeExecutionService = new WandboxExecutionService()
