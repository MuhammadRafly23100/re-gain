# Situs Re-Gain

Situs payung Re-Gain: memperkenalkan perusahaan circular economy-nya, mengakuisisi mitra
penyedia sampah organik (B2B dan komunitas), dan menjual Instinct Maggot ke konsumen.

Acuan: [PRD.md](PRD.md) dan [design-system/re-gain/MASTER.md](design-system/re-gain/MASTER.md).

## Menjalankan

```bash
npm install
npm run dev
```

Buka http://localhost:5173

Untuk build produksi: `npm run build`, hasilnya di `dist/`.

## Konfigurasi

Salin `.env.example` jadi `.env` lalu isi kredensial Supabase:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Tanpa ini situs tetap jalan penuh. Form tetap membuka WhatsApp seperti biasa, hanya
pencatatan ke database yang tidak aktif. Ini disengaja: kegagalan satu jalur tidak boleh
menghalangi pengunjung menghubungi Re-Gain.

**Hanya anon key yang boleh masuk ke sini.** Service role key tidak pernah masuk ke
frontend atau ke repo. Lihat PRD.md section 11.

## Yang paling sering perlu diubah

Hampir semuanya ada di [`src/config.js`](src/config.js): nomor WhatsApp, email, harga, dan
radius layanan gratis. Harga dan FAQ hanya ditulis sekali di situ dan di
`src/components/Sections.jsx`, lalu dipakai ulang oleh data terstruktur JSON-LD di
`src/App.jsx`. Ini mencegah masalah situs lama, di mana harga tertulis di empat tempat dan
dua di antaranya sering terlewat saat diperbarui.

Domain masih placeholder. Sebelum deploy, ganti `GANTI-DOMAIN-ANDA.com` di `index.html`
dan `src/App.jsx`.

## Isi folder

```
src/
├── config.js              nomor WA, harga, radius. Ubah di sini dulu.
├── App.jsx                susunan halaman + data terstruktur JSON-LD
├── index.css              token desain (Tailwind v4 @theme) + komponen dasar
├── components/
│   ├── FlowDiagram.jsx    diagram alir massa, interaktif per tahap
│   ├── Pouch3D.jsx        pembungkus React untuk model 3D kemasan
│   ├── KontakForm.jsx     form ganda: pesanan konsumen dan kerja sama
│   └── ...                section lainnya
└── lib/
    ├── pouch.js           model 3D prosedural, dipindahkan dari Instinct-Landing
    ├── pouch-textures.js  tekstur kemasan sebagai data URI (362 KB)
    ├── supabase.js        klien + simpanLead yang tidak pernah melempar error
    └── wa.js              penyusun URL wa.me
```

## Catatan teknis

**Bobot halaman.** Muatan awal sekitar 103 KB (gzip) untuk JS dan 18 KB untuk CSS. Model
3D dan teksturnya (318 KB gzip) dipecah jadi chunk terpisah dan baru diambil setelah
halaman selesai dimuat, jadi tidak menahan render pertama. Di koneksi 2G atau saat mode
hemat data aktif, model 3D tidak dimuat sama sekali dan foto produk tetap tampil.

**Animasi.** Hanya ada satu momen animasi yang disengaja: aliran di diagram proses yang
digambar masuk saat pertama terlihat. Tidak ada efek muncul di setiap section, karena
itu justru membuat halaman terasa dibuat dari template. Semua animasi mati sendiri kalau
pengunjung mengaktifkan "kurangi gerak" di sistemnya.

**Form.** Tidak ada data yang dikirim ke server mana pun selain Supabase. Pesan WhatsApp
disusun di browser pengunjung.
