import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { KAPASITAS } from '../config'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/*
 * Neraca massa, digambar sebagai gambar teknik, bukan ilustrasi.
 *
 * Bidangnya berwarna rata dan bertepi lurus: tiap tahap punya warnanya
 * sendiri, jadi perubahan materialnya terbaca sebagai langkah yang jelas,
 * bukan gradien yang melebur. Tebal bidang turun dari kiri ke kanan karena
 * massanya memang menyusut, dan kasgot benar-benar bercabang dari satu titik
 * pisah, bukan menempel lalu terpotong.
 *
 * ponytail: proporsinya masih kualitatif. Begitu ada catatan timbangan
 * produksi (kg masuk, kg maggot kering, kg kasgot), tinggi tiap bidang bisa
 * dihitung dari angka asli. Sampai itu ada, jangan tulis angka kg di sini.
 */

const X = { mulai: 50, urai: 270, panen: 450, akhir: 690, kasgotAkhir: 560 }
const Y = { atas: 70, rail: 50 }

const TAHAP = [
  {
    id: 'masuk',
    x: X.mulai,
    judul: 'Sisa makanan',
    hit: { x: X.mulai, y: 60, w: X.urai - X.mulai, h: 140 },
    detail:
      'Sampah sisa makanan yang layak olah, diterima dari penghasil sampah maupun mitra pengumpul. Inilah massa yang seharusnya berakhir di TPA.',
    ukur: `${KAPASITAS.sekarangKgHari} kg`,
    ukurLabel: 'kapasitas masuk per hari',
  },
  {
    id: 'urai',
    x: X.urai,
    judul: 'Konversi biologis',
    hit: { x: X.urai, y: 60, w: X.panen - X.urai, h: 140 },
    detail:
      'Sisa makanan diurai secara biologis. Metode yang dipakai saat ini adalah bioconversion Black Soldier Fly. Di titik ini aliran terbelah jadi dua keluaran.',
    ukur: 'BSF',
    ukurLabel: 'metode yang dipakai saat ini',
  },
  {
    id: 'panen',
    x: X.panen,
    judul: 'Pemulihan',
    hit: { x: X.panen, y: 60, w: X.akhir - X.panen, h: 140 },
    detail:
      'Biomassa hasil konversi dipanen dan dikeringkan sampai kadar airnya hilang. Di sinilah massanya menyusut paling banyak, dan nilainya jadi terkonsentrasi.',
    ukur: 'Kering',
    ukurLabel: 'stabil, bisa disimpan lama',
  },
  {
    id: 'kasgot',
    x: X.urai,
    judul: 'Kasgot',
    hit: { x: X.urai, y: 190, w: X.kasgotAkhir - X.urai + 100, h: 70 },
    detail:
      'Media bekas konversi tidak dibuang. Ia keluar sebagai kasgot, bahan pembenah tanah untuk tanaman.',
    ukur: 'Segera',
    ukurLabel: 'sedang disiapkan untuk dilepas',
  },
]

// Tiga bidang bersambung, satu warna per tahap. Tepi bawah naik ke kanan
// karena massanya berkurang; tepi atas rata supaya penurunannya terbaca
// sebagai satu garis, bukan dua.
const BIDANG = [
  { id: 'masuk', warna: '#2F3D26', d: `M${X.mulai},70 L${X.urai},70 L${X.urai},190 L${X.mulai},190 Z` },
  { id: 'urai', warna: '#7A6E48', d: `M${X.urai},70 L${X.panen},70 L${X.panen},142 L${X.urai},190 Z` },
  { id: 'panen', warna: '#C5A880', d: `M${X.panen},70 L${X.akhir},70 L${X.akhir},114 L${X.panen},142 Z` },
]

// Bercabang dari satu titik di x=270, menebal saat menjauh.
const KASGOT_D = `M${X.urai},190 L${X.panen},190 L${X.kasgotAkhir},214 L${X.kasgotAkhir},242 L${X.panen},218 Z`

export default function FlowDiagram() {
  const scope = useRef(null)
  // Dua state terpisah dengan sengaja. Kalau digabung, klik pada tahap yang
  // sedang di-hover akan langsung mematikannya sendiri, dan di layar sentuh
  // (yang tidak punya hover) detailnya tidak pernah bisa dibuka.
  const [hover, setHover] = useState(null)
  const [pin, setPin] = useState(null)
  const aktif = pin ?? hover
  const tahapAktif = TAHAP.find((t) => t.id === aktif) ?? null

  const redup = (id) => (aktif && aktif !== id ? 0.28 : 1)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      // Satu momen animasi untuk seluruh halaman: materialnya mengalir masuk
      // sekali, saat diagram pertama kali terlihat.
      gsap.from('[data-bidang]', {
        scaleX: 0,
        transformOrigin: 'left center',
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.12,
        scrollTrigger: { trigger: scope.current, start: 'top 78%' },
      })
      gsap.from('[data-ukur]', {
        opacity: 0,
        duration: 0.4,
        stagger: 0.06,
        delay: 0.4,
        scrollTrigger: { trigger: scope.current, start: 'top 78%' },
      })
    },
    { scope }
  )

  return (
    <div ref={scope}>
      {/* Di layar sempit diagramnya digeser, bukan diperkecil. Menyusutkan
          seluruh viewBox membuat labelnya ikut mengecil sampai tidak
          terbaca, jadi lebar minimalnya dipertahankan. */}
      <div className="overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0">
      <svg
        viewBox="0 0 900 270"
        className="w-full h-auto min-w-[660px] md:min-w-0"
        role="img"
        aria-label="Neraca massa pemulihan Regain. Sisa makanan masuk dalam jumlah penuh, dikonversi secara biologis, lalu dipulihkan dan dikeringkan sehingga massanya menyusut jauh menjadi protein kering. Di titik konversi, sebagian aliran bercabang keluar sebagai kasgot."
      >
        {/* Rel ukur. Menandai batas tiap tahap, bukan hiasan. */}
        <g stroke="#C5A880" strokeWidth="1" data-ukur>
          <line x1={X.mulai} y1={Y.rail} x2={X.akhir} y2={Y.rail} stroke="#E0D5BE" />
          {[X.mulai, X.urai, X.panen, X.akhir].map((x) => (
            <line key={x} x1={x} y1={Y.rail} x2={x} y2={Y.rail + 8} />
          ))}
        </g>

        {/* Batas tahap, ditarik menembus material supaya label dan bentuknya
            benar-benar terhubung. */}
        {[X.urai, X.panen].map((x) => (
          <line key={x} data-ukur x1={x} y1={Y.rail} x2={x} y2="200" stroke="#10241A" strokeWidth="1" opacity="0.18" />
        ))}

        {BIDANG.map((b) => (
          <path
            key={b.id}
            data-bidang
            d={b.d}
            fill={b.warna}
            opacity={redup(b.id)}
            style={{ transition: 'opacity 220ms ease' }}
          />
        ))}
        <path
          data-bidang
          d={KASGOT_D}
          fill="#5C6B52"
          opacity={redup('kasgot')}
          style={{ transition: 'opacity 220ms ease' }}
        />

        {/* Satu gaya label untuk semua nama tahap. */}
        {TAHAP.slice(0, 3).map((t) => (
          <text
            key={t.id}
            x={t.x}
            y="40"
            style={{
              fontFamily: 'Bricolage Grotesque, sans-serif',
              fontWeight: 700,
              fontSize: 14,
              fill: aktif && aktif !== t.id ? '#9AA79C' : '#10241A',
              transition: 'fill 220ms ease',
            }}
          >
            {t.judul}
          </text>
        ))}

        {/* Dua ujung keluaran, diperlakukan sama: nama tebal, keterangan kecil. */}
        <g opacity={redup('panen')} style={{ transition: 'opacity 220ms ease' }}>
          <text x={X.akhir + 12} y="88" style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: 15, fill: '#10241A' }}>
            Protein kering
          </text>
          <text x={X.akhir + 12} y="106" style={{ fontFamily: 'Karla, sans-serif', fontSize: 12, fill: '#6B776E' }}>
            untuk pakan ternak dan ikan
          </text>
        </g>
        <g opacity={redup('kasgot')} style={{ transition: 'opacity 220ms ease' }}>
          <text x={X.kasgotAkhir + 12} y="232" style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 800, fontSize: 15, fill: '#10241A' }}>
            Kasgot
          </text>
          <text x={X.kasgotAkhir + 12} y="250" style={{ fontFamily: 'Karla, sans-serif', fontSize: 12, fill: '#6B776E' }}>
            pembenah tanah untuk tanaman
          </text>
        </g>

        {/* Area sentuh. Transparan, tapi ini yang membuat diagramnya bisa
            dibaca per tahap, bukan cuma dipandang. */}
        {TAHAP.map((t) => (
          <rect
            key={t.id}
            x={t.hit.x}
            y={t.hit.y}
            width={t.hit.w}
            height={t.hit.h}
            fill="transparent"
            style={{ cursor: 'pointer' }}
            tabIndex={0}
            role="button"
            aria-label={`Lihat detail tahap: ${t.judul}`}
            onMouseEnter={() => setHover(t.id)}
            onMouseLeave={() => setHover(null)}
            onFocus={() => setHover(t.id)}
            onBlur={() => setHover(null)}
            onClick={() => setPin((p) => (p === t.id ? null : t.id))}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                setPin((p) => (p === t.id ? null : t.id))
              }
            }}
          />
        ))}
      </svg>
      </div>

      {/* Panel baca. Tetap menempati ruang yang sama saat kosong supaya
          halaman tidak melompat waktu kursor berpindah tahap. */}
      <div className="mt-6 border-t border-line pt-5 grid gap-5 md:grid-cols-[140px_1fr] md:gap-10 min-h-[92px]">
        {tahapAktif ? (
          <>
            <div>
              <p className="num text-2xl leading-none">{tahapAktif.ukur}</p>
              <p className="text-xs text-muted mt-1">{tahapAktif.ukurLabel}</p>
            </div>
            <div>
              <p className="font-display font-bold text-ink">{tahapAktif.judul}</p>
              <p className="text-sm max-w-[62ch]">{tahapAktif.detail}</p>
            </div>
          </>
        ) : (
          <p className="text-sm text-muted md:col-span-2 max-w-[70ch]">
            Tinggi tiap bidang mengikuti massanya, jadi penyusutannya terbaca langsung. Arahkan kursor atau
            ketuk salah satu tahap untuk melihat detailnya.
          </p>
        )}
      </div>
    </div>
  )
}
