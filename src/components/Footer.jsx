import { WA_KERJASAMA, WA_PESANAN, EMAIL, EMAIL_PRODUK, PERUSAHAAN } from '../config'

const cantik = (n) => n.replace(/^62/, '0').replace(/(\d{4})(\d{4})(\d+)/, '$1-$2-$3')

export default function Footer() {
  return (
    <footer className="bg-forest text-cream">
      <div className="wrap py-12 md:py-16 grid gap-8 md:gap-12 md:grid-cols-[1.1fr_1fr]">
        <div>
          <div className="font-display font-extrabold text-xl text-cream mb-2" style={{ fontStretch: '85%' }}>
            Re-Gain
          </div>
          <p className="text-gold text-sm mb-4">{PERUSAHAAN.tagline}</p>
          <p className="text-[#9AA79C] text-[0.92rem] max-w-[40ch] mb-5">{PERUSAHAAN.ringkas}</p>
          <address className="text-[#9AA79C] text-[0.88rem] not-italic max-w-[36ch]">{PERUSAHAAN.alamat}</address>
        </div>

        <nav aria-label="Kontak Regain" className="grid gap-5 sm:grid-cols-2 content-start">
          <a href={`https://wa.me/${WA_KERJASAMA}`} target="_blank" rel="noopener" className="no-underline text-cream hover:text-gold">
            <span className="block text-xs text-[#8FA093] mb-0.5">WhatsApp, kemitraan</span>
            <span className="font-bold">{cantik(WA_KERJASAMA)}</span>
          </a>
          <a href={`mailto:${EMAIL}`} className="no-underline text-cream hover:text-gold">
            <span className="block text-xs text-[#8FA093] mb-0.5">Email</span>
            <span className="font-bold break-all">{EMAIL}</span>
          </a>
          <a href={`https://wa.me/${WA_PESANAN}`} target="_blank" rel="noopener" className="no-underline text-cream hover:text-gold">
            <span className="block text-xs text-[#8FA093] mb-0.5">WhatsApp, pesanan produk</span>
            <span className="font-bold">{cantik(WA_PESANAN)}</span>
          </a>
          <a href={`mailto:${EMAIL_PRODUK}`} className="no-underline text-cream hover:text-gold">
            <span className="block text-xs text-[#8FA093] mb-0.5">Email produk</span>
            <span className="font-bold break-all">{EMAIL_PRODUK}</span>
          </a>
        </nav>
      </div>

      <div className="border-t border-cream/15">
        <div className="wrap py-4 flex flex-wrap justify-between gap-2">
          <small className="text-[#8FA093] text-xs">Regain, Mustikajaya, Kota Bekasi</small>
          <small className="text-[#8FA093] text-xs">Let&rsquo;s put food waste to further use</small>
        </div>
      </div>
    </footer>
  )
}
