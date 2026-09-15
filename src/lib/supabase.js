import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Null kalau env belum diisi. Semua pemanggil sudah menangani kasus ini:
// form tetap jalan lewat WhatsApp walau pencatatan ke database tidak aktif.
export const supabase = url && anonKey ? createClient(url, anonKey) : null

/**
 * Simpan satu baris, tidak pernah melempar error ke pemanggil.
 * Kegagalan di sini tidak boleh menghalangi pengguna menghubungi Re-Gain.
 */
export async function simpanLead(tabel, data) {
  if (!supabase) return { ok: false, reason: 'not-configured' }
  try {
    const { error } = await supabase.from(tabel).insert(data)
    if (error) throw error
    return { ok: true }
  } catch (err) {
    console.error('[re-gain] gagal menyimpan ke Supabase:', err)
    return { ok: false, reason: 'insert-failed' }
  }
}
