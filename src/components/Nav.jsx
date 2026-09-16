import { useEffect, useState } from 'react'

const TAUTAN = [
  { href: '#what-we-do', label: 'Fungsi Kami' },
  { href: '#output', label: 'Output' },
  { href: '#kapabilitas', label: 'Kapabilitas' },
  { href: '#kemitraan', label: 'Kemitraan' },
  { href: '#tentang', label: 'Tentang' },
]

export default function Nav() {
  const [terbuka, setTerbuka] = useState(false)

  useEffect(() => {
    const tutupEsc = (e) => e.key === 'Escape' && setTerbuka(false)
    document.addEventListener('keydown', tutupEsc)
    return () => document.removeEventListener('keydown', tutupEsc)
  }, [])

  return (
    <nav className="sticky top-0 z-50 bg-paper border-b border-line">
      <div className="wrap flex items-center gap-8 py-4 min-h-11">
        <a
          href="#top"
          className="font-display font-extrabold text-xl text-ink no-underline"
          style={{ fontStretch: '85%' }}
        >
          REGAIN
        </a>

        <div className="hidden md:flex gap-7 ml-auto items-center">
          {TAUTAN.map((t) => (
            <a key={t.href} href={t.href} className="text-sm text-inksoft no-underline hover:text-embertext">
              {t.label}
            </a>
          ))}
        </div>

        <a href="#kontak" className="btn btn-primary ml-auto md:ml-0 px-5 py-2.5 text-[0.85rem]">
          Hubungi kami
        </a>

        {/* Tombol menu hanya ada di layar sempit. Tombol "Hubungi kami" sengaja
            di luar panel: aksi utama harus selalu terlihat. */}
        <button
          type="button"
          className="md:hidden w-11 h-11 flex items-center justify-center border border-line rounded-sm text-ink"
          aria-expanded={terbuka}
          aria-controls="menu-mobil"
          aria-label={terbuka ? 'Tutup menu' : 'Buka menu'}
          onClick={() => setTerbuka((v) => !v)}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {terbuka ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>

      {terbuka && (
        <div id="menu-mobil" className="md:hidden border-t border-line bg-paper">
          <div className="wrap flex flex-col py-2">
            {TAUTAN.map((t) => (
              <a
                key={t.href}
                href={t.href}
                onClick={() => setTerbuka(false)}
                className="py-3 text-inksoft no-underline border-b border-line last:border-b-0"
              >
                {t.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
