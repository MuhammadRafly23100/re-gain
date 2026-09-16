import { STATISTIK_MASALAH } from '../config'

/*
 * Pernyataan masalah, sebelum penjelasan apa yang REGAIN lakukan.
 *
 * Sengaja berlatar gelap: ini keadaan "sebelum", dan section sesudahnya yang
 * lebih terang adalah jalan keluarnya. Nilai gelap-terang dipakai untuk
 * menandai urutan cerita, bukan sekadar selang-seling warna.
 *
 * Dua angka di bawah diverifikasi langsung di dashboard SIPSN sebelum
 * dipakai (bukan disalin mentah dari slide): 75% cocok persis dengan angka
 * "Sampah Belum Terkelola" nasional yang tampil di sampahnasional.kemenlh.go.id.
 * Komposisi sisa makanan bergerak 38-40% tergantung tahun snapshot (39,64%
 * di 2023, 39,79% di 2025) karena dashboardnya live dan terus diperbarui
 * daerah demi daerah, jadi dikutip dengan sumber dan bukan diklaim sebagai
 * angka yang tetap.
 */

const AKIBAT = [
  [
    'Membusuk tanpa oksigen, melepas metana',
    'Di tumpukan TPA, sisa makanan terurai tanpa udara. Prosesnya menghasilkan metana, gas rumah kaca yang jauh lebih kuat daripada karbon dioksida dalam jangka pendek.',
  ],
  [
    'Air rembesannya mencemari tanah',
    'Sisa makanan mengandung banyak air. Di dalam timbunan, air itu keluar sebagai lindi yang membawa cemaran turun ke tanah dan air di sekitarnya.',
  ],
  [
    'Nilai yang masih tersisa hilang seluruhnya',
    'Protein, energi, dan hara di dalamnya masih utuh saat dibuang. Begitu tercampur di TPA, tidak ada lagi cara mengambilnya kembali.',
  ],
]

export default function Masalah() {
  return (
    <section id="masalah" className="bg-forest text-cream py-16 md:py-24">
      <div className="wrap">
        <h2 className="text-cream text-[clamp(1.7rem,3.6vw,2.4rem)] max-w-[26ch] mb-10 md:mb-14">
          Sisa makanan yang sampai ke TPA tidak berhenti jadi sampah. Justru jadi masalah baru.
        </h2>

        <div className="grid sm:grid-cols-2 gap-10 md:gap-16 border-t border-cream/20 pt-8">
          <div>
            <div className="grid grid-cols-2 gap-6 mb-3">
              <div>
                <p className="num text-cream text-[clamp(2.6rem,5.4vw,3.6rem)] leading-none" style={{ fontStretch: '65%' }}>
                  {STATISTIK_MASALAH.belumTerkelola}
                </p>
                <p className="text-[#B7C2B9] mt-3 max-w-[30ch]">sampah yang timbul di Indonesia belum terkelola</p>
              </div>
              <div>
                <p className="num text-cream text-[clamp(2.6rem,5.4vw,3.6rem)] leading-none" style={{ fontStretch: '65%' }}>
                  {STATISTIK_MASALAH.sisaMakananPersen}
                </p>
                <p className="text-[#B7C2B9] mt-3 max-w-[30ch]">dari sampah nasional adalah sisa makanan, komposisi terbesar dari semua jenis sampah</p>
              </div>
            </div>
            <p className="text-xs text-[#8FA093]">
              Sumber:{' '}
              <a href={STATISTIK_MASALAH.sumberUrl} target="_blank" rel="noopener" className="text-[#8FA093] underline hover:text-cream">
                {STATISTIK_MASALAH.sumber}
              </a>
            </p>
          </div>

          <div>
            <p className="text-[#B7C2B9] max-w-[58ch] mb-8">
              Sebagian besar sampah yang belum terkelola itu berakhir di TPA begitu saja. Membuang sisa makanan
              bukan sekadar memindahkan barang tak terpakai. Ada tiga hal yang terjadi sesudahnya, dan ketiganya
              masih bisa dicegah selama sisa makanan itu dialihkan sebelum sampai ke sana.
            </p>

            <div className="flex flex-col">
              {AKIBAT.map(([judul, isi], i) => (
                <div
                  key={judul}
                  className={`grid gap-2 sm:grid-cols-[minmax(0,15ch)_1fr] sm:gap-5 py-5 border-t border-cream/20 ${
                    i === AKIBAT.length - 1 ? 'border-b' : ''
                  }`}
                >
                  <h3 className="text-cream text-lg leading-snug">{judul}</h3>
                  <p className="text-[#B7C2B9]">{isi}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
