import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import Pouch3D from './Pouch3D'
import { bukaWhatsApp } from '../lib/wa'
import { WA_PESANAN } from '../config'

/*
 * Popup detail output. Ini satu-satunya tempat harga dan spek produk
 * ditampilkan sekarang, sengaja tidak dipajang permanen di halaman.
 *
 * Tombol pesan langsung buka WhatsApp, tanpa form perantara: paling ringan,
 * dan cocok dengan nada "tidak dipajang sebagai jualan" yang diminta.
 */
export default function ProductPopup({ item, onClose }) {
  const panelRef = useRef(null)
  const tombolTutupRef = useRef(null)

  useEffect(() => {
    if (!item) return

    const bodyOverflowSebelumnya = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    tombolTutupRef.current?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = bodyOverflowSebelumnya
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [item, onClose])

  if (!item) return null

  function pesan() {
    bukaWhatsApp(WA_PESANAN, [
      'Halo Regain, saya mau tanya/pesan produk ini.',
      '',
      `Produk : ${item.nama}${item.berat ? ` (${item.berat})` : ''}`,
    ])
  }

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="popup-produk-judul"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div className="absolute inset-0 bg-ink/60" />

      <div className="relative w-full max-w-lg max-h-[88vh]">
        <button
          ref={tombolTutupRef}
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center border border-line bg-paper text-ink"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>

        <div ref={panelRef} className="bg-paper w-full h-full max-h-[88vh] overflow-y-auto p-6 md:p-8">

        {item.punya3D && (
          <div className="bg-sand p-5 mb-6 -mt-1">
            <Pouch3D fotoSrc={item.foto} fotoAlt={`Kemasan ${item.nama}${item.berat ? ` ${item.berat}` : ''}`} />
          </div>
        )}

        <h3 id="popup-produk-judul" className="text-xl mb-2 pr-8">
          {item.nama}
        </h3>
        <p className="mb-6 max-w-[42ch]">{item.ringkas}</p>

        {item.spek && (
          <div className="border-t border-line mb-6">
            {item.spek.map(([k, v], i) => (
              <div
                key={k}
                className={`flex justify-between gap-4 py-3 text-[0.95rem] ${
                  i === item.spek.length - 1 ? '' : 'border-b border-line'
                }`}
              >
                <span className="text-muted">{k}</span>
                <span className="text-ink text-right">{v}</span>
              </div>
            ))}
          </div>
        )}

        {item.hargaLabel && (
          <p className="num text-[clamp(1.8rem,3.6vw,2.3rem)] leading-none mb-6" style={{ fontStretch: '65%' }}>
            {item.hargaLabel}
            {item.berat && (
              <span className="font-body text-sm font-normal text-muted" style={{ fontStretch: '100%' }}>
                {' '}
                / {item.berat}
              </span>
            )}
          </p>
        )}

        <button type="button" onClick={pesan} className="btn btn-primary w-full sm:w-auto">
          Pesan lewat WhatsApp
        </button>
        </div>
      </div>
    </div>,
    document.body
  )
}
