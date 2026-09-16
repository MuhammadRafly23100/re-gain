import { useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Masalah from './components/Masalah'
import WhatWeDo from './components/WhatWeDo'
import FlowDiagram from './components/FlowDiagram'
import OutputCarousel from './components/OutputCarousel'
import ProductPopup from './components/ProductPopup'
import Capability from './components/Capability'
import KontakForm from './components/KontakForm'
import Footer from './components/Footer'
import { Kemitraan, Tentang, Faq, FAQ_ITEM } from './components/Sections'
import { PERUSAHAAN, PRODUK, WA_KERJASAMA, EMAIL } from './config'

const DOMAIN = 'https://GANTI-DOMAIN-ANDA.com'

// Dibangun dari config dan FAQ_ITEM yang sama dengan yang tampil di halaman,
// jadi angka dan jawaban tidak bisa berbeda antara isi halaman dan data
// terstruktur yang dibaca mesin pencari.
const dataTerstruktur = [
  {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${DOMAIN}/#organisasi`,
    name: PERUSAHAAN.nama,
    description: PERUSAHAAN.ringkas,
    slogan: PERUSAHAAN.tagline,
    url: `${DOMAIN}/`,
    telephone: `+${WA_KERJASAMA}`,
    email: EMAIL,
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jl. Rw. Mulya No.19, RT.003/RW.002',
      addressLocality: 'Mustikajaya, Kota Bekasi',
      addressRegion: 'Jawa Barat',
      postalCode: '17158',
      addressCountry: 'ID',
    },
    areaServed: { '@type': 'City', name: 'Kota Bekasi' },
    knowsAbout: [
      'pengolahan sampah sisa makanan',
      'food waste processing',
      'konversi biologis',
      'konversi biologis black soldier fly',
      'circular economy',
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${PRODUK.nama} ${PRODUK.berat}`,
    description:
      'Protein kering hasil pemulihan sampah sisa makanan, untuk pakan ikan hias dan predator. Salah satu output REGAIN.',
    image: [`${DOMAIN}/img/produk.webp`, `${DOMAIN}/img/kemasan.webp`],
    brand: { '@type': 'Brand', name: 'Instinct' },
    category: 'Pakan ikan',
    offers: {
      '@type': 'Offer',
      price: String(PRODUK.harga),
      priceCurrency: 'IDR',
      availability: 'https://schema.org/InStock',
      url: `${DOMAIN}/#output`,
      seller: { '@id': `${DOMAIN}/#organisasi` },
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_ITEM.map((f) => ({
      '@type': 'Question',
      name: f.t,
      acceptedAnswer: { '@type': 'Answer', text: f.j },
    })),
  },
]

export default function App() {
  const [produkAktif, setProdukAktif] = useState(null)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dataTerstruktur) }} />

      <Nav />
      <main>
        <Hero />

        {/* Urutan cerita: kenapa ini masalah, apa yang kami lakukan soal itu,
            apa hasilnya, dengan apa kami mengerjakannya, lalu siapa yang
            terlibat. Situs ini company profile, bukan etalase jualan, jadi
            output yang sudah/akan dijual muncul sebagai carousel ringkas di
            sini, bukan section jualan sendiri. Detail harga dan spek cuma
            muncul di popup begitu seseorang memang penasaran. */}
        <Masalah />
        <WhatWeDo />

        <section id="output" className="py-16 md:py-24">
          <div className="wrap">
            <p className="text-sm text-muted mb-3">Output organik</p>
            <h2 className="text-[clamp(1.7rem,3.6vw,2.3rem)] max-w-[34ch] mb-3">
              Yang keluar dari prosesnya
            </h2>
            <p className="max-w-[58ch] mb-8 md:mb-12">
              Sisa makanan yang masuk jauh lebih banyak daripada yang keluar, karena sebagian besar isinya air.
              Yang tersisa adalah nilai yang terkonsentrasi.
            </p>
            <FlowDiagram />
            <OutputCarousel onPilih={setProdukAktif} />
          </div>
        </section>

        <Capability />
        <Kemitraan />
        <Tentang />
        <Faq />
        <KontakForm />
      </main>
      <Footer />

      <ProductPopup item={produkAktif} onClose={() => setProdukAktif(null)} />
    </>
  )
}
