import { OUTPUT_ITEMS } from '../config'

/*
 * Carousel output, bukan section jualan.
 *
 * Ini pengganti section "Produk" yang dulu berdiri sendiri. Cuma satu kartu
 * yang bisa diklik (status "tersedia"); sisanya placeholder "segera" dan
 * sengaja tidak interaktif, supaya bedanya kelihatan tanpa perlu dibaca.
 * Scroll horizontal native (scroll-snap), bukan library carousel: empat
 * kartu tidak butuh state slide/autoplay/dot indicator.
 */

export default function OutputCarousel({ onPilih }) {
  return (
    <div className="mt-10 md:mt-14">
      <p className="text-sm text-muted mb-4">Sudah dan akan tersedia</p>
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory -mx-5 px-5 md:mx-0 md:px-0 pb-2">
        {OUTPUT_ITEMS.map((item) => {
          const tersedia = item.status === 'tersedia'
          return (
            <button
              key={item.id}
              type="button"
              disabled={!tersedia}
              onClick={() => tersedia && onPilih(item)}
              className={`snap-start shrink-0 w-64 text-left border p-5 transition-colors ${
                tersedia
                  ? 'border-ink bg-paper cursor-pointer hover:bg-sand'
                  : 'border-line bg-paper cursor-default opacity-70'
              }`}
            >
              <span
                className={`inline-block text-xs font-bold px-2 py-1 mb-4 ${
                  tersedia ? 'bg-ember text-ink' : 'border border-line text-muted'
                }`}
              >
                {tersedia ? 'Tersedia' : 'Segera'}
              </span>
              <h3 className="text-lg mb-1.5">{item.nama}</h3>
              <p className="text-sm text-inksoft">{item.ringkas}</p>
              {tersedia && <p className="text-sm font-bold text-embertext mt-3">Lihat detail</p>}
            </button>
          )
        })}
      </div>
    </div>
  )
}
