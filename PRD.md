# PRD: Situs Re-Gain

**Status:** Draft v0.2, untuk direview sebelum development dimulai
**Tanggal:** 2026-09-14

---

## 1. Latar Belakang

Re-Gain adalah bisnis circular economy: menerima sampah organik dari klien (kolaborasi dengan perusahaan circular economy besar, restoran, hotel, dll), mengolahnya lewat larva BSF (maggot), dan menjual hasil olahannya. **Instinct Maggot** adalah produk pertama yang dijual dari proses ini (maggot kering untuk pakan ikan hias/predator).

Saat ini sudah ada [`Instinct-Landing`](E:\PROJEKAN\Instinct-Landing), situs statis matang yang 100% berfokus ke penjualan retail Instinct Maggot ke konsumen. Situs itu tidak merepresentasikan Re-Gain sebagai perusahaan, dan tidak punya jalur untuk akuisisi klien B2B (penyedia sampah organik).

**Tujuan proyek ini:** membangun situs baru di bawah nama **Re-Gain** yang berfungsi sebagai situs payung, memperkenalkan Re-Gain sebagai perusahaan circular economy dan melayani dua audiens (klien B2B penyedia sampah, dan konsumen pembeli Instinct Maggot) dalam satu situs.

Logo resmi Re-Gain belum ada (per catatan SOP). Nav/wordmark memakai teks "Re-Gain" sampai logo tersedia. Instinct Maggot tetap tampil dengan logonya sendiri di bagian produknya.

## 2. Tujuan & Metrik

| Tujuan | Cara diukur (nanti, bukan scope build ini) |
|---|---|
| Klien B2B baru (hotel/restoran) mengajukan kerja sama lewat situs | Jumlah submit form/klik WhatsApp dari section B2B |
| Konsumen retail memesan Instinct Maggot | Jumlah submit form pesanan (sama seperti situs lama) |
| Re-Gain dikenali sebagai perusahaan, bukan cuma "toko maggot" | Kualitatif, tidak diukur otomatis di v1 |

Analytics dasar (jumlah pengunjung, submit form) sekarang tercatat langsung di Supabase lewat data form (lihat section 10). Tidak ada tracking pihak ketiga (Google Analytics, dll) di scope v1.

## 3. Audiens

Mengikuti business model di company profile, ditambah dua kebutuhan lokal yang memang sudah berjalan.

1. **Penghasil sampah (food waste generator)**: restoran, katering, usaha makanan, dan institusi yang menghasilkan sisa makanan dan butuh solusi pengolahan. Ini audiens utama situs.
2. **Mitra pengumpul (collection partner)**: organisasi yang mengumpulkan sisa makanan dari beberapa penghasil, memilah awal, dan mengantarkannya ke Regain.
3. **Pengguna hilir (downstream user)**: organisasi yang memakai sumber daya hasil pemulihan.
4. **Komunitas (RT/RW, perumahan)**: lingkungan warga sebagai penghasil sampah skala kecil. Tidak ada di company profile, tapi sudah berjalan. Promo "gratis jemput radius <5km" dipertahankan sebagai daya tarik.
5. **Konsumen retail**: pembudidaya ikan hias/predator yang membeli Instinct Maggot. Audiens paling akhir dalam urutan prioritas situs, karena produk adalah satu keluaran, bukan identitas perusahaan.

## 4. Struktur Situs

Single-page, section-anchor. Urutannya mengikuti alur cerita: kenapa ini masalah, apa yang Regain lakukan soal itu, apa hasilnya, dengan apa dikerjakan, lalu siapa yang terlibat.

1. **Hero**: Regain sebagai perusahaan pengolah sampah sisa makanan. Angka utama: kapasitas 36 kg/hari. Bukan pembuka produk.
2. **Masalah**: kenapa sisa makanan tidak boleh berakhir di TPA (metana, lindi, nilai yang hilang). Berlatar gelap, menandai keadaan "sebelum". Tanpa angka statistik sampai ada sumber yang bisa dikutip.
3. **What we do**: diagram intervensi. Tanpa intervensi sisa makanan berakhir di TPA; Regain memotong jalur itu dan mengalihkannya ke konversi biologis, output organik, lalu dipakai kembali. Jalur TPA tetap digambar, karena menghapusnya menghilangkan alasan perusahaan ini ada.
4. **Output**: neraca massa, memakai diagram yang sudah ada dengan narasi keluaran. Dua output saat ini: protein kering (pakan) dan kasgot (pembenah tanah).
5. **Kapabilitas dan teknologi**: lokasi Bekasi, kapasitas 36 kg/hari, potensi 576 kg/hari, sampah yang diterima dan yang belum bisa diterima, teknologi saat ini (BSF), arah pengembangan.
6. **Model kemitraan**: diagram rantai empat peran (penghasil sampah, mitra pengumpul, Regain, pengguna hilir), plus tiga langkah menjadi mitra dari SOP Kerja Sama Klien, plus catatan gratis jemput <5km untuk RT/RW.
7. **Produk (Instinct Maggot)**: satu output yang sudah dilepas ke pasar. Sengaja tidak diberi panel gelap, supaya tidak naik ke bobot visual yang membuat situs terbaca sebagai situs maggot. Model 3D pouch dipertahankan.
8. **Tentang Regain**: visi, misi, empat core principle, angka perusahaan.
9. **FAQ**: berpusat pada kemitraan dan pengolahan, bukan produk.
10. **Form kemitraan**: satu form, lima peran (penghasil, pengumpul, komunitas, pengguna hilir, pesanan produk). Kolomnya menyesuaikan peran yang dipilih. Simpan ke Supabase lalu buka WhatsApp ke nomor yang sesuai.
11. **Footer**: kontak perusahaan dan kontak produk, alamat fasilitas.

**Item yang sengaja tidak masuk situs publik:** waktu panen aktual, growth rate/hari, detail teknis produksi (ukuran box, dedak, dll). Itu SOP operasional internal, bukan konten pemasaran.

**Prinsip yang mengikat seluruh struktur:** BSF adalah teknologi yang dipakai saat ini, bukan identitas perusahaan. Setiap penambahan section harus lolos uji ini: apakah ia membuat Regain terbaca sebagai pengolah sampah sisa makanan, atau sebagai penjual maggot.

## 5. Requirement Fungsional

- Setiap form (kerja sama B2B/komunitas, pesanan konsumen) melakukan dua hal saat submit: (1) simpan baris baru ke Supabase, (2) buka WhatsApp dengan pesan yang sudah terisi ke nomor yang sesuai. WhatsApp tetap jadi jalur komunikasi cepat, Supabase jadi catatan terstruktur yang bisa dilihat lagi nanti. Dua-duanya jalan, bukan saling gantikan.
- Kegagalan salah satu jalur tidak boleh memblokir yang lain. Kalau insert ke Supabase gagal (mis. koneksi terputus), WhatsApp tetap dibuka supaya pengguna tidak kehilangan cara menghubungi Re-Gain. Kegagalan insert dicatat ke console, tidak ditampilkan sebagai error ke pengguna.
- Model 3D pouch (dari `Instinct-Landing/src/pouch.js`) dipertahankan, di-porting ke komponen React, tetap lazy-load setelah halaman utama tampil.
- SEO: JSON-LD terpisah untuk `LocalBusiness` (Re-Gain), `Product` (Instinct Maggot), dan `FAQPage`, reuse pola situs lama, diperluas.
- Aksesibilitas: `prefers-reduced-motion` dihormati di semua jalur animasi (CSS, GSAP, Motion), lihat design system.
- Responsif mobile-first, breakpoint minimal 375/768/1024/1440px.

## 6. Non-goals (di luar scope v1)

- Tidak ada akun pengguna/login untuk pengunjung publik.
- Tidak ada dashboard admin custom untuk kelola data. Di v1, data dilihat/dikelola langsung lewat table editor bawaan Supabase (sudah cukup untuk melihat, filter, dan update status baris). Dashboard custom di dalam situs sendiri bisa jadi fase berikutnya begitu volume data membenarkan investasi itu.
- Tidak ada portal self-service untuk klien B2B mendaftar/login sendiri di v1. Form kerja sama tetap satu arah (submit lalu ditindaklanjuti manual oleh tim), meski skema datanya sudah menyisakan tempat untuk kemungkinan itu nanti (lihat `diajukan_oleh` di section 10).
- Tidak ada integrasi pembayaran online (tetap transfer/QRIS/tunai manual seperti sekarang).
- Tidak ada multi-bahasa (Bahasa Indonesia saja, sama seperti situs lama).
- Tidak reimplementasi sistem monitoring Raspberry Pi. Kalau butuh angka statistik sampah terolah, tetap lewat file `statistik.json` statis yang diunggah manual, seperti situs lama (situs publik tidak pernah panggil API Pi).

## 7. Stack Teknis

- **Vite + React**: framework modern sesuai keputusan sebelumnya.
- **Tailwind CSS**: utility styling, token warna/spacing dari `design-system/re-gain/MASTER.md` di-mapping ke `tailwind.config`.
- **Motion** (npm `motion`, import `motion/react`): animasi berbasis komponen (enter/exit, gesture hover/tap, stagger list). Referensi: skill `motion-animation`.
- **GSAP + ScrollTrigger**: koreografi scroll kompleks (diagram alur, transisi hero). Referensi: `ui-ux-pro-max --domain gsap`.
- **three.js** (sudah dependency pouch.js): model 3D pouch, di-import langsung sebagai npm package menggantikan bundle lama.
- **Supabase** (Postgres terkelola): backend untuk simpan data kerja sama B2B/komunitas dan pesanan konsumen. Frontend bicara langsung ke Supabase lewat `@supabase/supabase-js`, tanpa server custom yang perlu kita kelola sendiri.
- Deploy tetap ke hosting statis (Netlify/Cloudflare Pages/Vercel, MCP Vercel sudah terpasang kalau mau pakai itu). Menambahkan Supabase tidak mengubah ini jadi butuh server. Situs tetap dibangun sebagai static build, cuma sekarang static build itu juga bicara ke satu layanan database terkelola.

### Kenapa "tanpa server custom" tetap masuk akal di skala ini

Supabase sendiri **adalah** backend-nya. Itu Postgres terkelola yang sudah punya lapisan API (PostgREST), connection pooling, dan auth bawaan, jadi kita tidak perlu menulis atau meng-host server Node/Express sendiri untuk terima form submission. Tiga hal yang benar-benar perlu diperhatikan supaya tetap stabil seiring pengguna bertambah, tanpa membangun infrastruktur berlebihan di awal:

1. **Row Level Security (RLS)**: kunci utama keamanan sekaligus stabilitas. Anon key yang dipakai di frontend publik hanya diberi izin `INSERT`, tidak `SELECT`/`UPDATE`/`DELETE`. Siapa pun yang buka DevTools browser dan lihat kode frontend tidak bisa membaca atau mengubah data orang lain, walau tahu kredensial publiknya.
2. **Proteksi spam pada form publik**: kekhawatiran nyata untuk form yang siapa saja bisa akses, bukan kekhawatiran skala trafik. Pertahankan pola honeypot field yang sudah ada di situs lama untuk v1. Detail lengkap di section 11.
3. **Index pada kolom yang sering difilter** (`created_at`, `status`, `entity_type`): satu baris SQL, disiapkan dari awal saat bikin tabel, supaya query tetap cepat begitu data sudah ribuan baris.

Yang **sengaja tidak dibangun** karena skala bisnis ini belum membutuhkannya: message queue, load balancer, atau server terpisah untuk menangani banyak pengguna. Supabase di tier gratis/kecil sudah menangani jauh lebih banyak concurrent request daripada yang realistis didapat bisnis skala Re-Gain dalam beberapa tahun ke depan. Kalau nanti benar-benar dibutuhkan logic tambahan di sisi server (misal kirim notifikasi WhatsApp otomatis saat ada lead baru), langkah berikutnya adalah **Supabase Edge Functions** (serverless, dikelola Supabase juga), bukan server custom yang perlu di-patch dan di-scale sendiri.

## 8. Konten yang di-reuse vs baru

| Reuse langsung dari Instinct-Landing | Baru untuk Re-Gain |
|---|---|
| Flow diagram SVG (cara kerja) | Hero copy (level perusahaan, bukan produk) |
| Kartu produk, harga, spek | Section "Untuk Bisnis" (B2B) |
| Kenapa Maggot (4 value props) | Split CTA "Bisnis vs Konsumen" |
| Galeri detail kemasan | FAQ tambahan soal kerja sama B2B & komunitas |
| Jemput Sampah (framing promo <5km) | Form kerja sama B2B & komunitas |
| Model 3D pouch | Copy "Tentang" versi Re-Gain (bukan cuma Instinct) |
| Form pesan konsumen (logic WhatsApp) | JSON-LD tambahan untuk entitas Re-Gain sbg company |
| Footer/kontak | Integrasi Supabase (dua tabel + RLS) |

## 9. Keputusan (sebelumnya open questions)

1. **Nomor WhatsApp B2B**: terpisah dari nomor pesanan konsumen. Nomor konsumen tetap `6285289521862` (pemilik). Nomor B2B: `6281384481108` a.n. Ryan (rekan yang mengatur hubungan klien). Nomor ini sudah muncul di footer situs lama sebagai "WhatsApp Alternatif" tanpa keterangan nama/peran, di situs baru diberi label yang jelas ("Kerja Sama Bisnis" atau serupa) supaya perannya sebagai kontak B2B tidak ambigu.
2. **Domain**: belum ada, diurus belakangan. Development jalan dengan placeholder domain seperti situs lama (`GANTI-DOMAIN-ANDA.com`), diganti sebelum deploy.
3. **Logo Re-Gain**: belum ada. v1 pakai wordmark teks "Re-Gain" (Bricolage Grotesque) di nav/header, gampang diganti begitu logo resmi jadi.
4. **Narasi "Tentang Re-Gain"**: disusun sebagai draft, sumber dari SOP dan konten Instinct-Landing yang ada, gaya profesional, tanpa tanda baca em dash, untuk direvisi user.

## 10. Data Model (Supabase / Postgres)

Dua tabel untuk v1. B2B dan komunitas/RT-RW digabung satu tabel (`kerjasama_leads`) karena secara operasional sama-sama pihak yang menyediakan sampah organik ke Re-Gain, dibedakan lewat kolom `entity_type`, bukan dua tabel terpisah untuk hal yang sama.

### `kerjasama_leads`

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | uuid, pk, default `gen_random_uuid()` | |
| `created_at` | timestamptz, default `now()` | |
| `entity_type` | text | `penghasil_sampah` \| `mitra_pengumpul` \| `komunitas` \| `pengguna_hilir`. Mengikuti peran di business model company profile |
| `nama_entitas` | text | Nama organisasi, atau nama RT/RW dan perumahan |
| `nama_kontak` | text | PIC yang bisa dihubungi |
| `nomor_wa` | text | |
| `lokasi` | text | Alamat/kecamatan |
| `estimasi_volume` | text | Perkiraan volume sampah, format bebas dulu (mis. "50 kg/minggu"), distandardisasi ke unit numerik kalau datanya sudah cukup banyak untuk tahu satuan yang paling umum dipakai |
| `diajukan_oleh` | text | `tim_regain` \| `klien`. v1 kebanyakan `tim_regain` karena Re-Gain masih proaktif mendekati klien, kolom ini menyiapkan tempat untuk kasus form diisi langsung oleh calon klien |
| `catatan` | text, nullable | |
| `status` | text, default `'baru'` | `baru` \| `nego` \| `deal` \| `ditolak` |

### `pesanan_konsumen`

| Kolom | Tipe | Keterangan |
|---|---|---|
| `id` | uuid, pk, default `gen_random_uuid()` | |
| `created_at` | timestamptz, default `now()` | |
| `nama` | text | |
| `nomor_wa` | text | |
| `alamat` | text, nullable | |
| `keperluan` | text | Produk/jenis permintaan (mis. "Dried Maggot 50 gram") |
| `jumlah` | integer, default 1 | |
| `catatan` | text, nullable | |
| `status` | text, default `'baru'` | `baru` \| `diproses` \| `selesai` |

**RLS:** role `anon` (dipakai form publik) diberi policy `INSERT` saja di kedua tabel. Tidak ada policy `SELECT`/`UPDATE`/`DELETE` untuk `anon`. Baca dan kelola data dilakukan lewat dashboard Supabase, login sebagai project owner.

## 11. Keamanan

Situs ini punya dua titik masuk yang perlu diamankan: form publik (siapa saja bisa akses) dan database di baliknya. Pendekatannya berlapis, dari yang murah/wajib sampai yang ditunda sampai terbukti perlu.

### 11.1 Form publik

- **Honeypot field**: pola yang sudah ada di situs lama (`<input>` tersembunyi yang cuma keisi bot) dipertahankan di semua form baru.
- **Validasi panjang & format input**: batasi panjang teks (nama, catatan) dan format nomor WA di level form, mencegah payload berlebihan.
- **Deteksi submit terlalu cepat**: kalau form terisi dan terkirim dalam waktu yang tidak wajar untuk manusia (di bawah 2 detik dari halaman dimuat), submission ditolak diam-diam.

### 11.2 Throttling / rate limiting

Dua istilah ini sama, membatasi berapa kali satu sumber boleh mengirim request dalam rentang waktu tertentu. Perlu dicatat: form kita memanggil Supabase langsung dari browser, bukan lewat domain situs sendiri, jadi proteksi throttle harus ditaruh di titik yang benar-benar dilewati request itu (bukan di CDN depan domain kita, itu tidak akan menyentuh trafik ke Supabase sama sekali).

- **v1, throttle per nomor WA (database-level)**: dicegah lewat RLS/fungsi database, satu nomor WA hanya boleh submit sekali dalam rentang waktu tertentu (mis. 10 menit) ke tabel yang sama. Diterapkan di database, jadi tidak bisa dilewati dari sisi klien (beda dari sekadar menyimpan status di `localStorage`, yang gampang direset lewat mode incognito).
- **Upgrade path, throttle per IP (Supabase Edge Function)**: kalau spam berganti-ganti nomor palsu, throttle per nomor tidak cukup. Solusinya: pindahkan proses insert ke satu Edge Function yang bisa membaca IP pengirim dan membatasi frekuensinya. Ini ditunda sampai ada bukti nyata spam per-IP terjadi, bukan dibangun dari awal.

### 11.3 Database (Supabase/Postgres)

- **Row Level Security aktif di kedua tabel**, `anon` cuma boleh `INSERT`, tidak ada `SELECT`/`UPDATE`/`DELETE` untuk role itu (lihat section 10).
- **CHECK constraint** pada kolom dengan nilai terbatas (`entity_type`, `status`), supaya insert lewat API tetap dibatasi ke nilai yang valid, bukan cuma dibatasi di UI.
- **Service role key tidak pernah masuk ke kode frontend atau repo Git.** Hanya `anon` key yang boleh ada di kode React (memang didesain publik, aman karena dibatasi RLS).
- **Least privilege**: role `anon` tidak diberi hak apa pun di luar yang benar-benar dibutuhkan form publik.

### 11.4 Hosting/infrastruktur

- HTTPS dan HSTS aktif (default dari Netlify/Vercel/Cloudflare Pages, tinggal pastikan opsi "force HTTPS" menyala).
- Security headers dasar (`Content-Security-Policy`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`) dikonfigurasi lewat file config hosting (`netlify.toml`/`vercel.json`).
- Proteksi DDoS dasar sudah ditangani CDN hosting, tidak perlu setup tambahan di skala ini.

### 11.5 Kebersihan operasional

- `.env` untuk kredensial Supabase masuk `.gitignore` sejak commit pertama.
- `npm audit` dijalankan berkala, dependency diperbarui.
- Akun dashboard Supabase dikunci dengan MFA.

### 11.6 Yang sengaja tidak dibangun di v1

WAF custom, sistem deteksi intrusi, dan captcha di semua form dari awal. Captcha baru ditambahkan kalau honeypot dan throttling per nomor terbukti tidak cukup, supaya pengunjung asli tidak dipersulit dari awal tanpa alasan.

## 12. Referensi

- **Company profile, acuan utama posisi perusahaan:** `C:\Users\Acer\Downloads\Company Profile.pdf`. Sumber visi, misi, core principle, kapasitas, jenis sampah yang sesuai, dan business model. Kalau ada konflik dengan dokumen lain, dokumen ini yang menang.
- Konten operasional: [`rekap-sesi-sop-regain.md`](E:\ALL ABOUT INSTINCT MAGGOT\SOP\rekap-sesi-sop-regain.md)
- Situs existing: [`Instinct-Landing`](E:\PROJEKAN\Instinct-Landing)
- Design system: [`design-system/re-gain/MASTER.md`](E:\PROJEKAN\Re-Gain\design-system\re-gain\MASTER.md)
