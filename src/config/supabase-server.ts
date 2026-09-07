// src/config/supabase-server.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/models/database.types'

// HANYA diimpor di dalam file route.ts (server-side).
// Jangan pernah impor file ini di komponen yang punya 'use client'.
export const supabaseServer = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false, // server tidak perlu simpan session di storage
    },
  }
)
