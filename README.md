# UT Pustaka Downloader (Browser Extension)

Ekstensi ini membantu mengunduh halaman gambar dari dokumen di `pustaka.ut.ac.id` lalu menyimpannya sebagai:

- `PDF` (default, semua halaman jadi satu file), atau
- `ZIP` (opsi kedua, berisi file JPG per halaman).

Ekstensi berjalan memakai sesi login browser yang aktif, sehingga request mengikuti cookie/auth milik user.

## Fitur Utama

- Auto-detect `Doc ID` dan `Subfolder` dari URL dokumen yang sedang dibuka.
- `Total Halaman` diisi **manual** agar tidak salah deteksi.
- Pilihan output `PDF` atau `ZIP`.
- Progress bar + status proses real-time per halaman.
- Delay antar halaman untuk mengurangi risiko throttle/blokir.

## Persiapan

Pastikan:

1. Kamu sudah login ke `pustaka.ut.ac.id` di browser.
2. Folder ekstensi ini sudah tersedia di project: `browser-extension`.

## Instalasi Extension (Chrome/Edge)

1. Buka `chrome://extensions` (atau `edge://extensions`).
2. Aktifkan `Developer mode`.
3. Klik `Load unpacked`.
4. Pilih folder `browser-extension`.
5. Jika sudah pernah load sebelumnya, gunakan tombol `Reload` saat ada perubahan file.

## Cara Pakai

1. Buka halaman dokumen, contoh:
   `https://pustaka.ut.ac.id/reader/index.php?subfolder=SKOM431504/&doc=M5.pdf`
2. Klik ikon extension `UT Pustaka Downloader`.
3. Cek form:
   - `Doc ID`: biasanya terisi otomatis.
   - `Subfolder`: biasanya terisi otomatis.
   - `Total Halaman`: **isi manual** (wajib).
   - `Delay per halaman (ms)`: contoh `1000` - `2000`.
   - `Format output`: default `PDF`, bisa diganti `ZIP`.
4. Klik `Mulai Unduh`.
5. Tunggu progress mencapai selesai, file akan otomatis terunduh.

## Penjelasan Field

- `Doc ID`
  Contoh: `M5` (tanpa `.pdf`).

- `Subfolder`
  Contoh: `SKOM431504`.

- `Total Halaman`
  Wajib angka `>= 1`. Isi sesuai jumlah halaman dokumen yang benar.

- `Delay per halaman (ms)`
  Jeda antar request. Semakin besar nilainya, semakin aman dari limit server tapi proses lebih lama.

- `Format output`
  - `PDF`: satu file PDF gabungan (default).
  - `ZIP`: arsip berisi JPG per halaman.

## Rekomendasi Setting

- Gunakan `PDF` untuk hasil yang rapi dan mudah dibaca.
- Gunakan delay `1000-2000 ms` untuk stabilitas.
- Jika dokumen besar, jangan set delay terlalu kecil.

## Troubleshooting

### 1) Tombol tidak jalan / tidak ada perubahan

- Pastikan tab aktif adalah halaman `pustaka.ut.ac.id` dokumen reader.
- Tutup dan buka ulang popup extension.
- Reload extension di `chrome://extensions`.

### 2) Gagal di halaman tertentu (HTTP error)

- Naikkan `Delay per halaman (ms)`.
- Pastikan sesi login masih aktif (coba refresh halaman dokumen dan login ulang bila perlu).
- Coba ulang proses dari awal.

### 3) Hasil halaman kurang / terpotong

- Cek `Total Halaman` (harus benar, karena manual).
- Ulang download dengan nilai total halaman yang sesuai.

### 4) PDF sangat besar / browser terasa berat

- Kurangi jumlah halaman per batch (misalnya per 20-30 halaman).
- Atau gunakan format `ZIP` lalu gabungkan manual jika perlu.

## Catatan Penting

- Deteksi total halaman otomatis **dinonaktifkan** karena sering tidak akurat di UI reader.
- Ekstensi ini ditujukan untuk penggunaan personal/akademik sesuai hak akses akun.

## Keamanan dan Kepatuhan

Gunakan hanya untuk dokumen yang memang kamu berhak akses/download. Pastikan tetap mengikuti Terms of Service `pustaka.ut.ac.id` dan kebijakan hak cipta yang berlaku.
