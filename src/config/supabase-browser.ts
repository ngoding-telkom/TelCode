// src/config/supabase-browser.ts
import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/models/database.types'

// Aman diimpor di komponen 'use client'.
// Key ini memang ditujukan untuk terlihat oleh browser.
export const supabaseBrowser = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
