import { KAPASITAS } from '../config'

/*
 * Kapabilitas dan teknologi.
 *
 * Angka di sini nyata dan datang dari company profile, jadi angkanya yang
 * jadi elemen visual utama, bukan ikon atau kartu. Daftar "diterima" dan
 * "belum bisa diterima" ditaruh berdampingan karena itu pertanyaan pertama
 * calon mitra: apakah sampah saya bisa kami serahkan.
 */

export default function Capability() {
  return (
    <section id="kapabilitas" className="py-16 md:py-24">
      <div className="wrap">
        <p className="text-sm text-muted mb-3">Capability &amp; technology</p>
        <h2 className="text-[clamp(1.7rem,3.6vw,2.3rem)] max-w-[32ch] mb-3">Kapabilitas dan teknologi</h2>
        <p className="max-w-[58ch] mb-10 md:mb-14">
          Regain menggabungkan kemampuan pengolahan sampah sisa makanan dengan teknologi konversi biologis
          untuk memulihkan sumber daya yang masih terkandung di dalamnya.
        </p>

        <div className="grid gap-10 md:gap-14 md:grid-cols-[1fr_1fr]">
          <div>
            <h3 className="text-sm font-bold text-ink mb-5">Operasi saat ini</h3>

            <div className="grid grid-cols-2 gap-6 border-t border-line pt-6">
              <div>
                <p className="num text-[clamp(2.2rem,4.4vw,3rem)] leading-none">{KAPASITAS.sekarangKgHari}</p>
                <p className="text-xs text-muted mt-2">kg per hari, kapasitas terpasang</p>
              </div>
              <div>
                <p className="num text-[clamp(2.2rem,4.4vw,3rem)] leading-none text-embertext">
                  {KAPASITAS.potensiKgHari}
                </p>
                <p className="text-xs text-muted mt-2">kg per hari, potensi fasilitas</p>
              </div>
            </div>

            <div className="grid grid-cols-[minmax(0,14ch)_1fr] gap-x-6 gap-y-3 border-t border-line mt-6 pt-5 text-[0.95rem]">
              <span className="text-muted">Lokasi</span>
              <span className="text-ink">{KAPASITAS.lokasi}</span>
              <span className="text-muted">Teknologi</span>
              <span className="text-ink">{KAPASITAS.teknologi}</span>
            </div>

            <p className="text-sm mt-5 max-w-[52ch]">
              BSF dipakai karena satu masukan sampah bisa dikonversi jadi beberapa output yang terpakai
              sekaligus, di dalam satu sistem yang berputar.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-ink mb-5">Sampah yang sesuai</h3>

            <p className="max-w-[52ch]">
              Kami memproses sampah sisa makanan organik dari dapur rumah tangga, restoran, dan industri
              makanan. Material non-organik dipisahkan lebih dulu sebelum masuk proses konversi biologis.
            </p>

            <h3 className="text-sm font-bold text-ink mt-10 mb-3 border-t border-line pt-6">Arah pengembangan</h3>
            <p className="max-w-[52ch]">
              Kami sedang mengembangkan kemampuan konversi biologis dan biokimia, untuk meningkatkan kecepatan
              proses, efisiensi, pemanfaatan sumber daya, dan nilai dari output yang dipulihkan.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
