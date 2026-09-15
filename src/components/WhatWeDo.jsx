import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger, useGSAP)

/*
 * Intervensi jalur TPA.
 *
 * Ini gagasan utama perusahaan, bukan sekadar salah satu section: tanpa
 * intervensi, sisa makanan berakhir di TPA. Regain memotong jalur itu dan
 * mengalihkannya ke pemulihan nilai.
 *
 * Karena itu jalur TPA tetap digambar, tidak dihilangkan. Menghapusnya
 * membuat diagramnya jadi alur produksi biasa, dan justru menghapus alasan
 * perusahaan ini ada.
 */

const NODE_H = 46

function Node({ x, y, w, label, varian = 'garis' }) {
  const gaya = {
    garis: { fill: '#FFFFFF', stroke: '#10241A', teks: '#10241A', berat: 1.5 },
    isi: { fill: '#0B1C15', stroke: '#0B1C15', teks: '#EDE6DA', berat: 1.5 },
    mati: { fill: '#FFFFFF', stroke: '#B9C0B7', teks: '#8A938A', berat: 1 },
  }[varian]

  return (
    <g>
      <rect x={x} y={y} width={w} height={NODE_H} fill={gaya.fill} stroke={gaya.stroke} strokeWidth={gaya.berat} />
      <text
        x={x + w / 2}
        y={y + NODE_H / 2 + 4}
        textAnchor="middle"
        style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 13, fill: gaya.teks }}
      >
        {label}
      </text>
    </g>
  )
}

export default function WhatWeDo() {
  const scope = useRef(null)

  useGSAP(
    () => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
      // Satu momen: palangnya turun menutup jalur ke TPA. Yang dianimasikan
      // hanya bagian yang jadi inti pesannya, bukan semua elemen.
      gsap.from('[data-palang]', {
        scaleY: 0,
        transformOrigin: 'center center',
        duration: 0.5,
        ease: 'power3.out',
        scrollTrigger: { trigger: scope.current, start: 'top 72%' },
      })
    },
    { scope }
  )

  return (
    <section id="what-we-do" className="bg-sand py-16 md:py-24">
      <div className="wrap" ref={scope}>
        <p className="text-sm text-muted mb-3">Apa yang kami lakukan</p>
        <h2 className="text-[clamp(1.7rem,3.6vw,2.3rem)] max-w-[30ch] mb-3">
          Kami memotong jalur sisa makanan ke TPA
        </h2>
        <p className="max-w-[58ch] mb-8 md:mb-12">
          Regain menerima sampah sisa makanan yang layak olah, lalu memprosesnya lewat konversi biologis untuk
          memulihkan nilai yang masih tersisa di dalamnya. Yang tadinya berakhir di tempat pembuangan akhir,
          dialihkan jadi sumber daya yang terpakai lagi.
        </p>

        <div className="overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0">
          <svg
            viewBox="0 0 900 300"
            className="w-full h-auto min-w-[700px] md:min-w-0"
            role="img"
            aria-label="Tanpa intervensi, sisa makanan berakhir di TPA. Regain memotong jalur itu dan mengalihkannya melalui konversi biologis menjadi output organik yang dipakai kembali."
          >
            <defs>
              <marker id="wwdPanah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0,1 L9,5 L0,9 z" fill="#10241A" />
              </marker>
              <marker id="wwdPanahMati" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
                <path d="M0,1 L9,5 L0,9 z" fill="#B9C0B7" />
              </marker>
            </defs>

            {/* batang masuk lalu terbelah */}
            <g stroke="#10241A" strokeWidth="1.5" fill="none">
              <line x1="176" y1="150" x2="214" y2="150" />
              <line x1="214" y1="62" x2="214" y2="238" />
              <line x1="214" y1="238" x2="248" y2="238" markerEnd="url(#wwdPanah)" />
            </g>

            {/* jalur lama menuju TPA: dibiarkan terlihat, tapi mati */}
            <g stroke="#B9C0B7" strokeWidth="1.5" fill="none" strokeDasharray="6 6">
              <line x1="214" y1="62" x2="392" y2="62" />
              <line x1="408" y1="62" x2="664" y2="62" markerEnd="url(#wwdPanahMati)" opacity="0.45" />
            </g>

            {/* palang: titik tempat Regain memotong jalur itu */}
            <g data-palang>
              <rect x="394" y="36" width="6" height="52" fill="#C48B50" />
              <rect x="394" y="36" width="6" height="52" fill="#C48B50" opacity="0.25" transform="translate(8,0)" />
            </g>
            <text x="360" y="108" style={{ fontFamily: 'Bricolage Grotesque, sans-serif', fontWeight: 700, fontSize: 12.5, fill: '#8A5A2D' }}>
              Regain memotong di sini
            </text>

            <text x="232" y="42" style={{ fontFamily: 'Karla, sans-serif', fontSize: 12, fill: '#8A938A' }}>
              tanpa intervensi
            </text>
            <text x="232" y="272" style={{ fontFamily: 'Karla, sans-serif', fontSize: 12, fill: '#6B776E' }}>
              jalur Regain
            </text>

            {/* rantai pemulihan */}
            <g stroke="#10241A" strokeWidth="1.5" fill="none">
              <line x1="422" y1="238" x2="452" y2="238" markerEnd="url(#wwdPanah)" />
              <line x1="610" y1="238" x2="640" y2="238" markerEnd="url(#wwdPanah)" />
            </g>

            <Node x={24} y={127} w={152} label="Sisa makanan" />
            <Node x={664} y={39} w={150} label="TPA" varian="mati" />
            <Node x={248} y={215} w={174} label="Konversi biologis" varian="isi" />
            <Node x={452} y={215} w={158} label="Output organik" />
            <Node x={640} y={215} w={174} label="Dipakai kembali" />
          </svg>
        </div>

        <p className="mt-5 text-sm text-muted max-w-[68ch]">
          Konversi biologis yang kami pakai saat ini adalah bioconversion Black Soldier Fly. Itu teknologi yang
          sedang dipakai, bukan batas dari apa yang kami olah.
        </p>
      </div>
    </section>
  )
}
