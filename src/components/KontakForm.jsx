import { useRef, useState } from 'react'
import { simpanLead } from '../lib/supabase'
import { bukaWhatsApp } from '../lib/wa'
import { WA_PESANAN, WA_KERJASAMA, PRODUK } from '../config'

// Mengikuti peran di business model: penghasil sampah, mitra pengumpul,
// pengguna hilir. Ditambah dua kebutuhan lokal yang memang ada: lingkungan
// warga, dan pembelian produk.
const KEPERLUAN = {
  penghasil: {
    label: 'Penghasil sampah (restoran, katering, usaha makanan, institusi)',
    wa: WA_KERJASAMA,
    entity: 'penghasil_sampah',
    tanyaVolume: true,
  },
  pengumpul: {
    label: 'Mitra pengumpul sampah sisa makanan',
    wa: WA_KERJASAMA,
    entity: 'mitra_pengumpul',
    tanyaVolume: true,
  },
  komunitas: {
    label: 'Lingkungan warga (RT/RW, perumahan)',
    wa: WA_KERJASAMA,
    entity: 'komunitas',
    tanyaVolume: true,
  },
  hilir: {
    label: 'Pengguna hilir (memakai output hasil pemulihan)',
    wa: WA_KERJASAMA,
    entity: 'pengguna_hilir',
    tanyaVolume: false,
  },
  pesanan: { label: `Pesan ${PRODUK.nama} (${PRODUK.berat})`, wa: WA_PESANAN, entity: null },
}

const KOSONG = {
  keperluan: 'penghasil',
  nama: '',
  wa: '',
  alamat: '',
  jumlah: '1',
  namaEntitas: '',
  volume: '',
  catatan: '',
  website: '', // honeypot, hanya terisi oleh bot
}

export default function KontakForm() {
  const [form, setForm] = useState(KOSONG)
  const [error, setError] = useState('')
  const [terkirim, setTerkirim] = useState(false)
  const [mengirim, setMengirim] = useState(false)
  const dibukaPada = useRef(Date.now())

  const pilihan = KEPERLUAN[form.keperluan]
  const isKerjasama = form.keperluan !== 'pesanan'
  const ubah = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  async function kirim(e) {
    e.preventDefault()
    setError('')

    // Dua saringan bot. Keduanya diam-diam: bot tidak diberi tahu kenapa gagal.
    if (form.website.trim() !== '') return
    if (Date.now() - dibukaPada.current < 2000) return

    if (!form.nama.trim()) return setError('Nama masih kosong.')
    if (form.wa.replace(/\D/g, '').length < 9) return setError('Nomor WhatsApp belum lengkap.')
    if (isKerjasama && !form.namaEntitas.trim()) {
      return setError(
        form.keperluan === 'komunitas' ? 'Nama RT/RW atau perumahan masih kosong.' : 'Nama organisasi masih kosong.'
      )
    }

    setMengirim(true)

    // Catat ke Supabase lebih dulu, tapi hasilnya tidak menentukan apa pun:
    // WhatsApp tetap dibuka walau pencatatan gagal.
    if (isKerjasama) {
      await simpanLead('kerjasama_leads', {
        entity_type: pilihan.entity,
        nama_entitas: form.namaEntitas.trim(),
        nama_kontak: form.nama.trim(),
        nomor_wa: form.wa.trim(),
        lokasi: form.alamat.trim(),
        estimasi_volume: form.volume.trim(),
        diajukan_oleh: 'klien',
        catatan: form.catatan.trim() || null,
      })
    } else {
      await simpanLead('pesanan_konsumen', {
        nama: form.nama.trim(),
        nomor_wa: form.wa.trim(),
        alamat: form.alamat.trim() || null,
        keperluan: `${PRODUK.nama} ${PRODUK.berat}`,
        jumlah: Number(form.jumlah) || 1,
        catatan: form.catatan.trim() || null,
      })
    }

    const baris = isKerjasama
      ? [
          'Halo Regain, saya ingin mengajukan kemitraan.',
          '',
          `Peran     : ${pilihan.label}`,
          `Organisasi: ${form.namaEntitas.trim()}`,
          `Kontak    : ${form.nama.trim()}`,
          `WhatsApp  : ${form.wa.trim()}`,
          form.alamat.trim() && `Lokasi    : ${form.alamat.trim()}`,
          form.volume.trim() && `Perkiraan volume: ${form.volume.trim()}`,
          form.catatan.trim() && `Catatan   : ${form.catatan.trim()}`,
        ]
      : [
          'Halo Instinct, saya mau pesan.',
          '',
          `Nama     : ${form.nama.trim()}`,
          `WhatsApp : ${form.wa.trim()}`,
          `Produk   : ${PRODUK.nama} ${PRODUK.berat}`,
          `Jumlah   : ${form.jumlah}`,
          form.alamat.trim() && `Alamat   : ${form.alamat.trim()}`,
          form.catatan.trim() && `Catatan  : ${form.catatan.trim()}`,
        ]

    bukaWhatsApp(pilihan.wa, baris)
    setMengirim(false)
    setTerkirim(true)
  }

  const kelasInput =
    'w-full bg-transparent border-b border-line py-2.5 text-[0.95rem] text-ink outline-none focus:border-embertext min-h-11'

  return (
    <section id="kontak" className="py-16 md:py-24">
      <div className="wrap max-w-[680px]">
        <h2 className="text-[clamp(1.6rem,3.4vw,2.1rem)] mb-2">Ajukan kemitraan</h2>
        <p className="mb-8 md:mb-10">
          Isi form singkat ini, kami akan segera menghubungi Anda lewat WhatsApp.
        </p>

        <form onSubmit={kirim} noValidate className="border-t-2 border-ink pt-7 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label htmlFor="keperluan" className="text-sm font-bold text-ink">Keperluan</label>
            <select id="keperluan" value={form.keperluan} onChange={ubah('keperluan')} className={kelasInput}>
              {Object.entries(KEPERLUAN).map(([k, v]) => (
                <option key={k} value={k}>{v.label}</option>
              ))}
            </select>
          </div>

          {isKerjasama && (
            <div className="flex flex-col gap-2">
              <label htmlFor="namaEntitas" className="text-sm font-bold text-ink">
                {form.keperluan === 'komunitas' ? 'Nama RT/RW atau perumahan' : 'Nama organisasi'}
              </label>
              <input
                id="namaEntitas"
                value={form.namaEntitas}
                onChange={ubah('namaEntitas')}
                maxLength={120}
                className={kelasInput}
                placeholder={
                  form.keperluan === 'komunitas' ? 'Contoh: RT 04 RW 09 Mustikajaya' : 'Contoh: Restoran Sedap Malam'
                }
              />
            </div>
          )}

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="nama" className="text-sm font-bold text-ink">
                {isKerjasama ? 'Nama kontak' : 'Nama'}
              </label>
              <input id="nama" value={form.nama} onChange={ubah('nama')} maxLength={80} autoComplete="name" className={kelasInput} placeholder="Nama Anda" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="wa" className="text-sm font-bold text-ink">Nomor WhatsApp</label>
              <input id="wa" type="tel" inputMode="numeric" value={form.wa} onChange={ubah('wa')} maxLength={20} autoComplete="tel" className={kelasInput} placeholder="0812xxxxxxxx" />
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="alamat" className="text-sm font-bold text-ink">
                {isKerjasama ? 'Lokasi' : 'Alamat / kecamatan'}
              </label>
              <input id="alamat" value={form.alamat} onChange={ubah('alamat')} maxLength={160} className={kelasInput} placeholder="Contoh: Mustikajaya, Bekasi" />
            </div>
            {isKerjasama ? (
              pilihan.tanyaVolume && (
                <div className="flex flex-col gap-2">
                  <label htmlFor="volume" className="text-sm font-bold text-ink">Perkiraan volume sampah</label>
                  <input id="volume" value={form.volume} onChange={ubah('volume')} maxLength={60} className={kelasInput} placeholder="Contoh: 50 kg per minggu" />
                </div>
              )
            ) : (
              <div className="flex flex-col gap-2">
                <label htmlFor="jumlah" className="text-sm font-bold text-ink">Jumlah</label>
                <input id="jumlah" type="number" min="1" max="500" inputMode="numeric" value={form.jumlah} onChange={ubah('jumlah')} className={kelasInput} />
              </div>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="catatan" className="text-sm font-bold text-ink">Catatan (opsional)</label>
            <textarea id="catatan" value={form.catatan} onChange={ubah('catatan')} maxLength={500} rows={2} className={`${kelasInput} resize-y`} placeholder="Jenis ikan, waktu penjemputan, atau pertanyaan lain" />
          </div>

          {/* Honeypot. Tersembunyi dari mata dan dari pembaca layar. */}
          <div aria-hidden="true" className="absolute w-px h-px overflow-hidden -left-[9999px]">
            <label htmlFor="website">Jangan isi kolom ini</label>
            <input id="website" tabIndex={-1} autoComplete="off" value={form.website} onChange={ubah('website')} />
          </div>

          {error && <p role="alert" className="text-danger text-sm">{error}</p>}
          {terkirim && !error && (
            <p role="status" className="text-ok text-sm">
              WhatsApp dibuka di tab baru. Kalau tidak terbuka, periksa pemblokir pop-up di browser Anda.
            </p>
          )}

          <button type="submit" disabled={mengirim} className="btn btn-primary self-start disabled:opacity-60">
            {mengirim ? 'Menyiapkan...' : 'Kirim ke WhatsApp'}
          </button>
        </form>
      </div>
    </section>
  )
}
