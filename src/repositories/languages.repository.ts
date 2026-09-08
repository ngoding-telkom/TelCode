import { supabaseServer } from '@/config/supabase-server'

export async function findAllLanguages() {
  const { data, error } = await supabaseServer.from('languages').select('id, name, file_extension')
  if (error) throw new Error(`Failed to fetch languages: ${error.message}`)
  return data
}
