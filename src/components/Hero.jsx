import { KAPASITAS } from '../config'

export default function Hero() {
  return (
    <header id="top" className="wrap py-16 md:py-28">
      <p className="text-sm text-muted mb-4">Perusahaan pengolah sampah sisa makanan, Kota Bekasi</p>

      <div className="grid gap-6 md:gap-10 md:grid-cols-[1.4fr_1fr] md:items-end">
        <h1 className="text-[clamp(2.1rem,5.4vw,3.4rem)] leading-[1.08]" style={{ fontStretch: '88%' }}>
          Sisa makanan tidak harus berakhir di TPA
        </h1>
        <div className="border-t-2 md:border-t-0 md:border-l-2 border-gold pt-4 md:pt-0 md:pl-5">
          <p className="text-lg leading-snug text-inksoft">
            Sisa makanan kami olah sampai{' '}
            <span
              className="num"
              style={{ fontSize: 'clamp(1.9rem,3.6vw,2.5rem)', fontStretch: '65%', verticalAlign: '-0.14em' }}
            >
              {KAPASITAS.sekarangKgHari} kg
            </span>{' '}
            setiap hari
          </p>
                 </div>
      </div>

      <p className="text-lg max-w-[58ch] mt-7">
        Regain menerima sampah sisa makanan yang layak olah dari restoran, katering, usaha makanan, dan
        institusi, lalu memulihkan nilai yang masih tersisa di dalamnya lewat konversi biologis. Sampah yang
        tadinya menambah beban TPA berubah jadi sumber daya yang terpakai lagi.
      </p>

      <div className="flex flex-wrap gap-4 mt-8">
        <a href="#kemitraan" className="btn btn-primary">Ajukan kemitraan</a>
        <a href="#what-we-do" className="btn btn-line">Lihat cara kerjanya</a>
      </div>
    </header>
  )
}
