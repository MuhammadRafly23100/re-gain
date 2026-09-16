export default function Hero() {
  return (
    <header id="top" className="wrap py-16 md:py-28">
      <p className="text-sm text-muted mb-4">Perusahaan pengolah sampah sisa makanan, Kota Bekasi</p>

      <h1
        className="text-[clamp(2.3rem,6vw,4rem)] leading-[1.04] max-w-[24ch]"
        style={{ fontStretch: '88%', fontWeight: 800 }}
      >
        Sisa makanan tidak harus berakhir di TPA
      </h1>

      <p className="text-lg max-w-[58ch] mt-7">
        REGAIN menerima sampah sisa makanan yang layak olah dari restoran, katering, usaha makanan, dan
        institusi. Alih-alih menumpuk di tempat pemrosesan akhir (TPA), sisa makanan itu kami olah lewat
        konversi biologis jadi sumber daya yang terpakai lagi.
      </p>

      <div className="flex flex-wrap gap-4 mt-8">
        <a href="#kemitraan" className="btn btn-primary">Ajukan kemitraan</a>
        <a href="#what-we-do" className="btn btn-line">Lihat cara kerjanya</a>
      </div>
    </header>
  )
}
