// Sumber: Company Profile REGAIN. Kalau profil perusahaannya diperbarui,
// ubah di sini dulu, bukan di komponen masing-masing.

export const PERUSAHAAN = {
  nama: 'REGAIN',
  tagline: 'Waste has more to give',
  ringkas:
    'Perusahaan pengolah sampah sisa makanan di Kota Bekasi. Kami menahan sisa makanan supaya tidak berakhir di tempat pemrosesan akhir, lalu mengolahnya lewat konversi biologis jadi sumber daya yang terpakai lagi.',
  visi: 'Sisa makanan berhenti jadi beban, dan kembali jadi sesuatu yang berguna.',
  misi:
    'Menahan sisa makanan agar tidak berakhir di tempat pemrosesan akhir, lalu memulihkan nilainya lewat konversi yang praktis dan bisa diandalkan.',
  alamat: 'Jl. Rw. Mulya No.19, RT.003/RW.002, Mustikajaya, Kota Bekasi, Jawa Barat 17158',
}

export const PRINSIP = [
  ['Circularity', 'Sisa makanan harusnya kembali terpakai, bukan berhenti sebagai sampah.'],
  ['Practicality', 'Cara kerjanya harus masuk akal dipakai di lapangan, bukan cuma bagus di atas kertas.'],
  ['Reliability', 'Pengolahan harus jalan terus dan bisa diandalkan, karena sampah tidak bisa menunggu.'],
  ['Continuous improvement', 'Prosesnya terus kami perbaiki supaya makin efisien dari waktu ke waktu.'],
]

// Diverifikasi langsung di dashboard SIPSN sebelum dipakai (lihat catatan di
// Masalah.jsx). Dashboardnya live dan angkanya bergeser sedikit tiap
// pembaruan data daerah, jadi kutip tahun dan sumbernya, jangan cuma angkanya.
export const STATISTIK_MASALAH = {
  belumTerkelola: '75%',
  sisaMakananPersen: '39,7%',
  sumber: 'SIPSN (Sistem Informasi Pengelolaan Sampah Nasional), Kementerian Lingkungan Hidup',
  sumberUrl: 'https://sampahnasional.kemenlh.go.id',
}

export const KAPASITAS = {
  lokasi: 'Bekasi',
  sekarangKgHari: 36,
  potensiKgHari: 576,
  teknologi: 'Konversi biologis Black Soldier Fly (BSF)',
}


// Nomor WhatsApp pakai format internasional tanpa + dan tanpa 0 di depan
// (syarat wa.me).
export const WA_KERJASAMA = '6281384481108' // Ryan, kemitraan dan perusahaan
export const WA_PESANAN = '6285289521862' // pesanan produk Instinct Maggot
export const EMAIL = 'ryaniaska14@gmail.com'
export const EMAIL_PRODUK = 'maggotinstinct@gmail.com'

// Instinct Maggot adalah satu dari beberapa output yang dipulihkan, bukan
// identitas perusahaan. Jangan naikkan jadi fokus utama halaman.
export const PRODUK = {
  nama: 'Instinct Dried Maggot',
  berat: '50 gram',
  harga: 12000,
  hargaLabel: 'Rp 12.000',
}

// Output yang dipulihkan dari proses konversi. Ditampilkan sebagai carousel
// ringkas di section Output, bukan section jualan sendiri. Cuma Instinct
// Maggot yang sudah dijual (status "tersedia"), sisanya placeholder "segera"
// dari rencana produk yang sudah ada di SOP lama, bukan karangan baru. Klik
// item "tersedia" membuka popup detail; item "segera" tidak bisa diklik.
export const OUTPUT_ITEMS = [
  {
    id: 'instinct-maggot',
    status: 'tersedia',
    nama: 'Instinct Maggot',
    ringkas: 'Protein kering dari larva BSF, untuk pakan ikan hias dan predator.',
    foto: '/img/produk.webp',
    punya3D: true,
    berat: PRODUK.berat,
    harga: PRODUK.harga,
    hargaLabel: PRODUK.hargaLabel,
    spek: [
      ['Bentuk', 'Larva BSF kering'],
      ['Kemasan', 'Pouch zipper, jendela transparan'],
      ['Dipakai untuk', 'Pakan ikan hias dan predator'],
    ],
  },
  {
    id: 'maggot-basah',
    status: 'segera',
    nama: 'Maggot Basah',
    ringkas: 'Larva hidup segar, untuk yang ingin pakan langsung dari panen.',
  },
  {
    id: 'kasgot',
    status: 'segera',
    nama: 'Kasgot',
    ringkas: 'Pembenah tanah dari sisa media konversi, untuk menyuburkan tanaman.',
  },
  {
    id: 'telur-bsf',
    status: 'segera',
    nama: 'Telur BSF',
    ringkas: 'Untuk peternak yang ingin memulai budidaya larva BSF sendiri.',
  },
]

export const RADIUS_GRATIS_KM = 5
