/** Susun URL wa.me dengan pesan yang sudah terisi. */
export function urlWhatsApp(nomor, baris) {
  const teks = baris.filter(Boolean).join('\n')
  return `https://wa.me/${nomor}?text=${encodeURIComponent(teks)}`
}

export function bukaWhatsApp(nomor, baris) {
  window.open(urlWhatsApp(nomor, baris), '_blank', 'noopener')
}
