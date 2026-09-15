import { useEffect, useRef, useState } from 'react'

/**
 * Model 3D kemasan Instinct, diambil dari sistem lama (src/pouch.js).
 *
 * Foto produk tampil lebih dulu dan selalu jadi cadangan. Model 3D dimuat
 * belakangan lewat dynamic import, jadi ~370 KB tekstur dan three.js tidak
 * ikut menahan render pertama halaman. Kalau WebGL tidak ada, koneksinya
 * lambat, atau modulnya gagal dimuat, pengunjung tetap melihat fotonya dan
 * tidak ada yang terlihat rusak.
 */
export default function Pouch3D({ fotoSrc, fotoAlt }) {
  const wadahRef = useRef(null)
  const fotoRef = useRef(null)
  const [tampil3D, setTampil3D] = useState(false)

  useEffect(() => {
    const koneksi = navigator.connection
    if (koneksi && (koneksi.saveData || /2g/.test(koneksi.effectiveType || ''))) return

    let dibatalkan = false
    let hasil = null

    const muat = async () => {
      try {
        const [{ pasangPouch3D }, { TEKSTUR }] = await Promise.all([
          import('../lib/pouch.js'),
          import('../lib/pouch-textures.js'),
        ])
        if (dibatalkan || !wadahRef.current) return
        hasil = pasangPouch3D({
          container: wadahRef.current,
          fallback: fotoRef.current,
          front: TEKSTUR.front,
          back: TEKSTUR.back,
        })
        if (hasil) setTampil3D(true)
      } catch (err) {
        console.error('[re-gain] model 3D gagal dimuat, memakai foto produk:', err)
      }
    }

    // Tunggu halaman selesai memuat dulu: 3D itu lapisan tambahan,
    // bukan syarat halaman ini bisa dibaca.
    if (document.readyState === 'complete') muat()
    else window.addEventListener('load', muat, { once: true })

    return () => {
      dibatalkan = true
      window.removeEventListener('load', muat)
      hasil?.bongkar?.()
    }
  }, [])

  return (
    <div>
      <div ref={wadahRef} className="aspect-square w-full">
        <img
          ref={fotoRef}
          src={fotoSrc}
          alt={fotoAlt}
          width={760}
          height={760}
          className="w-full h-full object-contain"
        />
      </div>
      {tampil3D && (
        <p className="mt-3 flex items-center gap-2 text-xs text-muted">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M8 7l-4 5 4 5M16 7l4 5-4 5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Seret untuk memutar kemasan
        </p>
      )}
    </div>
  )
}
