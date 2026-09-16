import RantaiKemitraan from './RantaiKemitraan'
import { PERUSAHAAN, PRINSIP, KAPASITAS, RADIUS_GRATIS_KM } from '../config'

const LANGKAH = [
  {
    n: '01',
    judul: 'Ajukan kerja sama',
    isi: 'Ceritakan jenis usaha Anda dan perkiraan volume sisa makanan yang dihasilkan setiap minggu.',
  },
  {
    n: '02',
    judul: 'Sepakati akomodasi',
    isi: 'Kami bicarakan jadwal, wadah, dan cara pengiriman yang paling praktis untuk operasional Anda.',
  },
  {
    n: '03',
    judul: 'Tentukan pengambilan',
    isi: 'Anda antar sendiri, lewat mitra pengumpul, atau tim kami yang jemput. Kesepakatan bisa ditinjau ulang kapan saja, tidak ada kontrak yang mengikat.',
  },
]

export function Kemitraan() {
  return (
    <section id="kemitraan" className="bg-sand py-16 md:py-24">
      <div className="wrap">
        <p className="text-sm text-muted mb-3">Business &amp; partnership model</p>
        <h2 className="text-[clamp(1.7rem,3.6vw,2.3rem)] max-w-[32ch] mb-3">Model bisnis dan kemitraan</h2>
        <p className="max-w-[58ch] mb-8 md:mb-12">
          REGAIN bekerja bersama mitra di sepanjang rantai sampah sisa makanan, mulai dari yang
          menghasilkan, yang mengumpulkan, sampai yang memakai hasil olahannya.
        </p>

        <RantaiKemitraan />

        <h3 className="text-lg mt-14 md:mt-20 mb-6">Tiga langkah menjadi mitra</h3>
        <div className="flex flex-col">
          {LANGKAH.map((l, i) => (
            <div
              key={l.n}
              className={`grid grid-cols-[56px_1fr] gap-5 py-6 border-t border-line ${
                i === LANGKAH.length - 1 ? 'border-b' : ''
              }`}
            >
              <span className="num text-2xl">{l.n}</span>
              <div>
                <h4 className="text-lg mb-1">{l.judul}</h4>
                <p className="max-w-[56ch]">{l.isi}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap justify-between items-center gap-4 mt-8">
          <p className="text-muted text-sm max-w-[46ch]">
            Melayani area Bekasi. Untuk RT/RW dan perumahan di radius di bawah {RADIUS_GRATIS_KM} km dari
            Mustikajaya, penjemputan gratis.
          </p>
          <a href="#kontak" className="btn btn-primary">Ajukan kemitraan</a>
        </div>
      </div>
    </section>
  )
}

export function Tentang() {
  return (
    <section id="tentang" className="py-16 md:py-24">
      <div className="wrap">
        <p className="text-sm text-muted mb-3">About us</p>
        <h2 className="text-[clamp(1.7rem,3.6vw,2.3rem)] max-w-[28ch] mb-10 md:mb-14">Tentang kami</h2>

        <div className="grid gap-10 md:gap-14 md:grid-cols-[1fr_1fr] mb-12 md:mb-16">
          <div className="border-t-2 border-ink pt-5">
            <p className="text-sm text-muted mb-2">Visi</p>
            <p className="text-xl text-ink max-w-[30ch]">{PERUSAHAAN.visi}</p>
          </div>
          <div className="border-t-2 border-ink pt-5">
            <p className="text-sm text-muted mb-2">Misi</p>
            <p className="text-xl text-ink max-w-[34ch]">{PERUSAHAAN.misi}</p>
          </div>
        </div>

        <h3 className="text-lg mb-2">Prinsip yang kami pegang</h3>
        <p className="max-w-[58ch] mb-6 text-inksoft">
          Empat hal ini yang kami pakai sebagai pegangan waktu mengambil keputusan, dari cara mengolah sampai
          cara melayani mitra.
        </p>

        <div className="grid gap-x-12 gap-y-6 md:grid-cols-2">
          {PRINSIP.map(([nama, isi]) => (
            <div key={nama} className="border-t border-line pt-4">
              <p className="text-[0.95rem]">
                <span className="text-ink font-bold">{nama}. </span>
                {isi}
              </p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-7 mt-12 md:mt-16 border-t border-line pt-8">
          <div>
            <p className="num text-3xl">{KAPASITAS.sekarangKgHari} kg</p>
            <p className="text-xs text-muted mt-1">olahan per hari saat ini</p>
          </div>
          <div>
            <p className="num text-3xl">{KAPASITAS.potensiKgHari} kg</p>
            <p className="text-xs text-muted mt-1">potensi fasilitas per hari</p>
          </div>
          <div>
            <p className="num text-3xl">2</p>
            <p className="text-xs text-muted mt-1">output dipulihkan saat ini: protein kering dan kasgot</p>
          </div>
          <div>
            <p className="num text-3xl">Bekasi</p>
            <p className="text-xs text-muted mt-1">lokasi fasilitas</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export const FAQ_ITEM = [
  {
    t: 'Sampah seperti apa yang bisa REGAIN terima?',
    j: 'Sampah sisa makanan organik dari dapur rumah tangga, restoran, katering, dan industri makanan. Material non-organik kami pisahkan dulu sebelum masuk proses konversi biologis. Kalau ragu dengan jenis sampah di tempat Anda, ceritakan saja lebih dulu, nanti kami bantu cek.',
  },
  {
    t: 'Bagaimana cara mengajukan kemitraan?',
    j: 'Isi formulir di bagian bawah halaman ini, atau hubungi langsung nomor WhatsApp kemitraan di footer. Kami menindaklanjuti di hari yang sama.',
  },
  {
    t: 'Apakah ada minimal volume sampah?',
    j: 'Belum ada batas minimal yang kaku. Kapasitas terpasang kami saat ini 36 kg per hari dan fasilitasnya bisa dikembangkan sampai 576 kg per hari, jadi ceritakan saja perkiraan volume Anda lebih dulu.',
  },
  {
    t: 'Apakah ada kontrak jangka panjang?',
    j: 'Tidak ada kontrak yang mengikat. Kesepakatan bisa ditinjau ulang kapan saja menyesuaikan kebutuhan operasional Anda.',
  },
  {
    t: 'Apa saja yang dihasilkan dari pengolahannya?',
    j: 'Saat ini ada dua: protein kering untuk pakan ikan dan ternak, serta kasgot sebagai pembenah tanah. Ke depan kami ingin menambah ragam output yang bisa dipulihkan.',
  },
  {
    t: 'Apakah REGAIN melayani RT/RW dan perumahan?',
    j: `Ya. Untuk lingkungan warga di radius di bawah ${RADIUS_GRATIS_KM} km dari Mustikajaya, penjemputan tidak dikenakan biaya.`,
  },
]

export function Faq() {
  return (
    <section className="bg-sand py-16 md:py-24">
      <div className="wrap max-w-[760px]">
        <h2 className="text-[clamp(1.6rem,3.4vw,2.1rem)] mb-8 md:mb-11">Pertanyaan yang sering muncul</h2>
        <div>
          {FAQ_ITEM.map((f, i) => (
            <details
              key={f.t}
              className={`group border-t border-line ${i === FAQ_ITEM.length - 1 ? 'border-b' : ''}`}
            >
              <summary className="py-5 font-bold text-ink cursor-pointer list-none flex justify-between items-start gap-4 min-h-11">
                {f.t}
                <span className="text-gold shrink-0 transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <p className="pb-5 max-w-[60ch]">{f.j}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
