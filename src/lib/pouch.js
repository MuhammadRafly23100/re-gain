/**
 * Pouch 3D Instinct — model stand-up pouch (doypack) prosedural.
 *
 * Kenapa dibentuk lewat kode, bukan diimpor dari Blender:
 * file model .glb untuk kemasan seperti ini biasanya 1-3 MB, sementara
 * geometri di bawah ini lahir dari ~60 baris matematika dan 0 KB unduhan.
 * Untuk satu produk sederhana, itu penghematan yang nyata di halaman utama.
 */
import * as THREE from "three";

/* ------------------------------------------------------------------ *
 * 1. PROFIL KEMASAN
 * ------------------------------------------------------------------ *
 * Pouch berdiri punya bentuk khas: segel tipis di atas, badan menggembung
 * di tengah, lalu menyempit lagi ke alas. Dua fungsi di bawah ini yang
 * menentukan siluetnya — ubah angkanya dan bentuk pouch ikut berubah.
 * v = 0 di alas, v = 1 di puncak segel.
 */

// kedalaman (seberapa gembung) pada ketinggian v
const PROFIL_TEBAL = [
  [0.00, 0.30], [0.05, 0.62], [0.14, 0.88], [0.30, 0.99],
  [0.52, 1.00], [0.70, 0.93], [0.84, 0.62], [0.92, 0.26],
  [0.97, 0.11], [1.00, 0.07],
];

// lebar pada ketinggian v (hampir lurus, sedikit menyempit di ujung)
const PROFIL_LEBAR = [
  [0.00, 0.94], [0.06, 0.99], [0.90, 1.00], [0.96, 0.99], [1.00, 0.96],
];

function bacaProfil(tabel, v) {
  for (let i = 0; i < tabel.length - 1; i++) {
    const [v0, a] = tabel[i], [v1, b] = tabel[i + 1];
    if (v >= v0 && v <= v1) {
      const t = (v - v0) / (v1 - v0);
      const s = t * t * (3 - 2 * t);            // smoothstep, biar tak menyiku
      return a + (b - a) * s;
    }
  }
  return tabel[tabel.length - 1][1];
}

/* Penampang melintang berbentuk superelips: di antara elips dan persegi.
   Eksponen 3.4 membuat muka depan cukup rata: kalau terlalu bulat, label
   ikut melengkung ke samping sampai tulisannya terpotong dari depan. */
function penampang(theta, halfW, halfD, n = 3.4) {
  const c = Math.cos(theta), s = Math.sin(theta);
  const p = 2 / n;
  return [
    halfW * Math.sign(c) * Math.pow(Math.abs(c), p),
    halfD * Math.sign(s) * Math.pow(Math.abs(s), p),
  ];
}

/**
 * Membentuk SETENGAH cangkang pouch — panel depan atau panel belakang.
 *
 * Kenapa dipecah dua, bukan satu silinder penuh lalu teksturnya diatur
 * lewat repeat/offset: cara itu membuat cetakan tercermin dan belepotan di
 * tepi. Dua setengah-geometri, masing-masing dengan UV 0..1 yang bersih,
 * bertemu tepat di jahitan samping — persis seperti pouch sungguhan dibuat.
 *
 * Parameter t berjalan mengelilingi kemasan:
 *   t = 0.00  tepi kiri layar        t = 0.50  tepi kanan layar
 *   t = 0.25  tengah panel DEPAN     t = 0.75  tengah panel BELAKANG
 * UV dipetakan menurut panjang busur, bukan sudut, supaya label tidak
 * gepeng di bagian yang menggembung.
 */
function buatCangkang(W, H, D, tAwal, tAkhir, segU = 96, segV = 96) {
  const pos = [], uvs = [], idx = [];

  for (let j = 0; j <= segV; j++) {
    const v = j / segV;
    const halfW = (W / 2) * bacaProfil(PROFIL_LEBAR, v);
    const halfD = (D / 2) * bacaProfil(PROFIL_TEBAL, v);
    const y = -H / 2 + v * H;

    const ring = [];
    for (let i = 0; i <= segU; i++) {
      const t = tAwal + (tAkhir - tAwal) * (i / segU);
      const th = Math.PI - t * Math.PI * 2;
      ring.push(penampang(th, halfW, halfD));
    }
    const kum = [0];
    for (let i = 1; i < ring.length; i++) {
      kum.push(kum[i - 1] + Math.hypot(ring[i][0] - ring[i - 1][0], ring[i][1] - ring[i - 1][1]));
    }
    const total = kum[kum.length - 1] || 1;

    for (let i = 0; i <= segU; i++) {
      pos.push(ring[i][0], y, ring[i][1]);
      uvs.push(kum[i] / total, v);
    }
  }

  for (let j = 0; j < segV; j++) {
    for (let i = 0; i < segU; i++) {
      const a = j * (segU + 1) + i;
      const b = a + segU + 1;
      idx.push(a, b, a + 1, b, b + 1, a + 1);
    }
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/* Tutup atas dan bawah, supaya pouch tidak terlihat berongga saat diputar. */
function buatTutup(W, H, D, v, segU = 96) {
  const halfW = (W / 2) * bacaProfil(PROFIL_LEBAR, v);
  const halfD = (D / 2) * bacaProfil(PROFIL_TEBAL, v);
  const y = -H / 2 + v * H;
  const pos = [0, y, 0], idx = [];
  for (let i = 0; i <= segU; i++) {
    const th = Math.PI - (i / segU) * Math.PI * 2;
    const [x, z] = penampang(th, halfW, halfD);
    pos.push(x, y, z);
  }
  for (let i = 1; i <= segU; i++) idx.push(0, i, i + 1);
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(pos, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return g;
}

/* ------------------------------------------------------------------ *
 * 2. LINGKUNGAN PANTULAN
 * ------------------------------------------------------------------ *
 * Plastik kemasan perlu sesuatu untuk dipantulkan, kalau tidak ia tampak
 * seperti kertas mati. Alih-alih mengunduh file HDR, kita lukis gradien
 * di canvas lalu ubah jadi environment map. Nol unduhan, hasilnya hidup.
 */
function buatEnv(renderer) {
  const c = document.createElement("canvas");
  c.width = 64; c.height = 64;
  const ctx = c.getContext("2d");
  const gr = ctx.createLinearGradient(0, 0, 0, 64);
  gr.addColorStop(0.00, "#4a5f54");   // langit: pantulan terang di bahu pouch
  gr.addColorStop(0.45, "#1d2f26");
  gr.addColorStop(0.62, "#c08a52");   // pita hangat, meniru lampu studio
  gr.addColorStop(1.00, "#070d0a");   // lantai gelap
  ctx.fillStyle = gr; ctx.fillRect(0, 0, 64, 64);

  const tex = new THREE.CanvasTexture(c);
  tex.mapping = THREE.EquirectangularReflectionMapping;
  tex.colorSpace = THREE.SRGBColorSpace;

  const pmrem = new THREE.PMREMGenerator(renderer);
  const env = pmrem.fromEquirectangular(tex).texture;
  pmrem.dispose();
  tex.dispose();
  return env;
}

/* ------------------------------------------------------------------ *
 * 3. SCENE
 * ------------------------------------------------------------------ */

export function pasangPouch3D(opsi) {
  const wadah = opsi.container;
  const texFront = opsi.front;
  const texBack = opsi.back;
  const cadangan = opsi.fallback || null;   // <img> yang tampil kalau 3D gagal

  // -- Pengaman 1: perangkat tanpa WebGL tetap dapat foto produk --
  const uji = document.createElement("canvas");
  const adaWebGL = !!(uji.getContext("webgl2") || uji.getContext("webgl"));
  if (!adaWebGL) return null;

  const kurangiGerak = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch (e) {
    return null;                            // driver bermasalah -> pakai foto
  }

  const lebar = () => wadah.clientWidth || 480;
  const tinggi = () => wadah.clientHeight || 560;

  // Pengaman 2: batasi pixel ratio. Layar HP kelas atas melaporkan 3-4x;
  // merender sebanyak itu memanaskan GPU tanpa beda yang terlihat.
  const ratioMaks = window.innerWidth < 768 ? 1.5 : 2;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, ratioMaks));
  renderer.setSize(lebar(), tinggi());
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.style.cssText = "width:100%;height:100%;display:block;cursor:grab;touch-action:pan-y";
  wadah.appendChild(renderer.domElement);
  if (cadangan) cadangan.style.display = "none";

  const scene = new THREE.Scene();
  const kamera = new THREE.PerspectiveCamera(32, lebar() / tinggi(), 0.1, 100);
  kamera.position.set(0, 0.12, 8.15);   // mundur sedikit: beri ruang napas di sekitar produk

  scene.environment = buatEnv(renderer);

  // Lampu: kunci dari kanan-atas, isian dingin dari kiri, tepi dari belakang.
  const kunci = new THREE.DirectionalLight(0xfff0dc, 2.6);
  kunci.position.set(3.2, 4.4, 5.0);
  scene.add(kunci);

  const isian = new THREE.DirectionalLight(0x9fc4b4, 0.8);
  isian.position.set(-4.5, 0.6, 2.2);
  scene.add(isian);

  const tepi = new THREE.DirectionalLight(0xc48b50, 2.0);
  tepi.position.set(-1.6, 2.0, -5.2);
  scene.add(tepi);

  scene.add(new THREE.AmbientLight(0x2a3a32, 1.1));

  // -- tekstur --
  const loader = new THREE.TextureLoader();
  const muat = (src) => {
    const t = loader.load(src);
    t.colorSpace = THREE.SRGBColorSpace;
    t.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    return t;
  };
  const mapDepan = muat(texFront);
  const mapBelakang = muat(texBack);

  const bahanDasar = {
    roughness: 0.52,
    metalness: 0.0,
    clearcoat: 0.55,          // lapisan kilap tipis, seperti laminasi pouch
    clearcoatRoughness: 0.35,
    envMapIntensity: 0.9,
  };

  const W = 2.35, H = 3.5, D = 0.66;

  // dua setengah cangkang yang bertemu di jahitan samping
  const geoDepan = buatCangkang(W, H, D, 0.0, 0.5);
  const geoBelakang = buatCangkang(W, H, D, 0.5, 1.0);

  const meshDepan = new THREE.Mesh(geoDepan, new THREE.MeshPhysicalMaterial({
    ...bahanDasar, map: mapDepan, side: THREE.DoubleSide,
  }));
  const meshBelakang = new THREE.Mesh(geoBelakang, new THREE.MeshPhysicalMaterial({
    ...bahanDasar, map: mapBelakang, side: THREE.DoubleSide,
  }));

  const kelompok = new THREE.Group();
  kelompok.add(meshDepan);
  kelompok.add(meshBelakang);

  // tutup atas & bawah dengan warna kraft polos
  const kraft = new THREE.MeshPhysicalMaterial({
    ...bahanDasar, color: 0xb99a72, roughness: 0.72, clearcoat: 0.25,
  });
  kelompok.add(new THREE.Mesh(buatTutup(W, H, D, 1.0), kraft));
  kelompok.add(new THREE.Mesh(buatTutup(W, H, D, 0.0), kraft));

  kelompok.rotation.y = -0.35;
  scene.add(kelompok);

  // bayangan kontak lembut di bawah pouch, supaya tidak melayang
  const bayangCv = document.createElement("canvas");
  bayangCv.width = bayangCv.height = 128;
  const bctx = bayangCv.getContext("2d");
  const rad = bctx.createRadialGradient(64, 64, 3, 64, 64, 58);
  rad.addColorStop(0.00, "rgba(0,0,0,0.55)");
  rad.addColorStop(0.55, "rgba(0,0,0,0.18)");
  rad.addColorStop(1.00, "rgba(0,0,0,0)");
  bctx.fillStyle = rad; bctx.fillRect(0, 0, 128, 128);
  const bayang = new THREE.Mesh(
    new THREE.PlaneGeometry(W * 1.75, Math.max(D * 3.0, 1.5)),
    new THREE.MeshBasicMaterial({
      map: new THREE.CanvasTexture(bayangCv),
      transparent: true, depthWrite: false, opacity: 0.8,
    })
  );
  bayang.rotation.x = -Math.PI / 2;
  bayang.position.y = -H / 2 - 0.02;
  scene.add(bayang);

  /* ---------------- kontrol putar ---------------- */
  let seret = false, xTerakhir = 0, laju = 0, targetX = -0.06;
  const el = renderer.domElement;

  const mulai = (x) => { seret = true; xTerakhir = x; laju = 0; el.style.cursor = "grabbing"; };
  const geser = (x) => {
    if (!seret) return;
    const d = (x - xTerakhir) * 0.008;
    kelompok.rotation.y += d;
    laju = d;
    xTerakhir = x;
  };
  const lepas = () => { seret = false; el.style.cursor = "grab"; };

  el.addEventListener("pointerdown", (e) => { el.setPointerCapture(e.pointerId); mulai(e.clientX); });
  el.addEventListener("pointermove", (e) => geser(e.clientX));
  el.addEventListener("pointerup", lepas);
  el.addEventListener("pointercancel", lepas);
  el.addEventListener("pointerleave", lepas);

  // keyboard: pouch harus bisa diputar tanpa mouse
  el.tabIndex = 0;
  el.setAttribute("role", "img");
  el.setAttribute("aria-label",
    "Model 3D kemasan Instinct Dried Maggot. Seret atau tekan panah kiri dan kanan untuk memutar.");
  el.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") { kelompok.rotation.y -= 0.22; e.preventDefault(); }
    if (e.key === "ArrowRight") { kelompok.rotation.y += 0.22; e.preventDefault(); }
  });

  /* ---------------- gelung render ---------------- */
  let rafId = null, hidup = false;

  // Waktu diukur pakai performance.now() bawaan browser, bukan THREE.Clock.
  // Clock sudah ditandai usang oleh Three.js, dan penggantinya belum ada di
  // semua versi. Kita cuma butuh dua angka — selisih waktu antar frame dan
  // waktu berjalan — jadi tak ada gunanya bergantung pada kelas yang bisa
  // hilang di rilis berikutnya.
  let capTerakhir = 0, waktuBerjalan = 0;

  function gambar() {
    rafId = requestAnimationFrame(gambar);

    const kini = performance.now();
    // dibatasi 50 ms: kalau tab sempat tidak aktif, selisihnya melompat
    // berdetik-detik dan pouch akan berputar liar saat tab dibuka lagi
    const dt = Math.min((kini - capTerakhir) / 1000, 0.05);
    capTerakhir = kini;
    waktuBerjalan += dt;

    if (!seret) {
      laju *= 0.94;                                   // inersia setelah dilepas
      kelompok.rotation.y += laju;
      if (!kurangiGerak && Math.abs(laju) < 0.0004) {
        kelompok.rotation.y += dt * 0.22;             // berputar pelan saat diam
      }
    }
    // sedikit mengangguk, supaya tidak terasa kaku seperti gambar diam
    if (!kurangiGerak) {
      kelompok.rotation.x += (Math.sin(waktuBerjalan * 0.5) * 0.045 + targetX - kelompok.rotation.x) * 0.05;
    }

    renderer.render(scene, kamera);
  }

  function jalan() { if (!hidup) { hidup = true; capTerakhir = performance.now(); gambar(); } }
  function henti() { if (hidup) { hidup = false; cancelAnimationFrame(rafId); rafId = null; } }

  // Pengaman 3: berhenti merender saat pouch tidak terlihat. Tanpa ini GPU
  // bekerja terus meski pengunjung sudah menggulir jauh ke bawah.
  const pengamat = new IntersectionObserver(
    (entri) => entri.forEach((e) => (e.isIntersecting ? jalan() : henti())),
    { threshold: 0.05 }
  );
  pengamat.observe(wadah);

  const ubahUkuran = () => {
    kamera.aspect = lebar() / tinggi();
    kamera.updateProjectionMatrix();
    renderer.setSize(lebar(), tinggi());
  };
  window.addEventListener("resize", ubahUkuran);

  // Pengaman 4: lepaskan konteks WebGL saat halaman ditinggalkan.
  function bongkar() {
    henti();
    pengamat.disconnect();
    window.removeEventListener("resize", ubahUkuran);
    geoDepan.dispose(); geoBelakang.dispose();
    mapDepan.dispose(); mapBelakang.dispose();
    meshDepan.material.dispose(); meshBelakang.material.dispose();
    kraft.dispose();
    renderer.dispose();
    if (renderer.domElement.parentNode) renderer.domElement.remove();
    if (cadangan) cadangan.style.display = "";
  }
  window.addEventListener("pagehide", bongkar);

  return { bongkar, kelompok, renderer, scene, kamera };
}

