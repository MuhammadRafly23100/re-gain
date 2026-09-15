/*
 * Rantai kemitraan, mengikuti business model di company profile.
 *
 * Empat peran: penghasil sampah, mitra pengumpul, Regain sebagai pengolah,
 * dan pengguna hilir. Penghasil bisa menyerahkan langsung, atau lewat mitra
 * pengumpul, jadi percabangannya dipertahankan karena itu memang dua jalur
 * yang berbeda di lapangan.
 *
 * Sengaja tidak interaktif: halaman ini sudah punya satu diagram yang bisa
 * ditelusuri per tahap. Kalau semuanya minta diklik, tidak ada yang menonjol.
 */

const NODE_H = 46

function Node({ x, y, w, label, isi = false }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={NODE_H}
        fill={isi ? '#0B1C15' : '#FFFFFF'}
        stroke={isi ? '#0B1C15' : '#10241A'}
        strokeWidth="1.5"
      />
      <text
        x={x + w / 2}
        y={y + NODE_H / 2 + 4}
        textAnchor="middle"
        style={{
          fontFamily: 'Bricolage Grotesque, sans-serif',
          fontWeight: 700,
          fontSize: 13,
          fill: isi ? '#EDE6DA' : '#10241A',
        }}
      >
        {label}
      </text>
    </g>
  )
}

function Ket({ x, y, baris }) {
  return baris.map((b, i) => (
    <text key={b} x={x} y={y + i * 15} style={{ fontFamily: 'Karla, sans-serif', fontSize: 11.5, fill: '#6B776E' }}>
      {b}
    </text>
  ))
}

export default function RantaiKemitraan() {
  return (
    <figure className="m-0">
      <div className="overflow-x-auto -mx-5 px-5 md:mx-0 md:px-0">
        <svg
          viewBox="0 0 900 270"
          className="w-full h-auto min-w-[720px] md:min-w-0"
          role="img"
          aria-label="Rantai kemitraan Regain. Penghasil sampah sisa makanan menyerahkan langsung ke Regain, atau lewat mitra pengumpul yang mengumpulkan, memilah awal, dan mengangkut. Regain mengolah dan mengkonversinya secara biologis, lalu hasilnya dipakai oleh pengguna hilir."
        >
          <defs>
            <marker id="rkPanah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0,1 L9,5 L0,9 z" fill="#10241A" />
            </marker>
          </defs>

          <g stroke="#10241A" strokeWidth="1.5" fill="none">
            {/* keluar dari penghasil, lalu terbelah dua */}
            <line x1="196" y1="83" x2="226" y2="83" />
            <line x1="226" y1="83" x2="226" y2="185" />
            <line x1="226" y1="185" x2="246" y2="185" markerEnd="url(#rkPanah)" />

            {/* jalur langsung ke Regain */}
            <path d="M226,83 L470,83 L470,134 L506,134" markerEnd="url(#rkPanah)" />

            {/* jalur lewat mitra pengumpul, bertemu di titik yang sama */}
            <path d="M426,185 L470,185 L470,134" />

            {/* ke pengguna hilir */}
            <line x1="660" y1="134" x2="710" y2="134" markerEnd="url(#rkPanah)" />
          </g>

          <Node x={20} y={60} w={176} label="Penghasil sampah" />
          <Ket x={20} y={126} baris={['restoran, katering,', 'usaha makanan, institusi']} />

          <Node x={250} y={162} w={176} label="Mitra pengumpul" />
          <Ket x={250} y={228} baris={['mengumpulkan, memilah awal,', 'mengangkut ke Regain']} />

          <Node x={510} y={111} w={150} label="REGAIN" isi />
          <Ket x={510} y={177} baris={['pengolahan dan', 'konversi biologis']} />

          <Node x={714} y={111} w={170} label="Pengguna hilir" />
          <Ket x={714} y={177} baris={['memakai sumber daya', 'hasil pemulihan']} />
        </svg>
      </div>
      <figcaption className="mt-5 text-sm text-muted max-w-[70ch]">
        Rantai ini menciptakan jalur alternatif bagi sisa makanan yang layak olah, sebelum sampai ke TPA.
        Penghasil sampah bisa menyerahkan langsung, atau lewat mitra pengumpul, menyesuaikan operasional
        masing-masing.
      </figcaption>
    </figure>
  )
}
