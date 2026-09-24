# 📚 UT Pustaka Downloader Pro (Downloader-Modul)

<p align="center">
  <img src="logo.png" width="120" height="120" alt="Logo UT Downloader Pro" style="border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);" />
</p>

<p align="center">
  <strong>Eksperimen Riset Peramban & Pembelajaran Rekayasa Web Extension untuk Dokumen Bacaan Virtual.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Research-Educational_Only-amber.svg?style=flat-square" alt="Educational Only" />
  <img src="https://img.shields.io/badge/Version-2.1-blue.svg?style=flat-square" alt="Version 2.1" />
  <img src="https://img.shields.io/badge/Manifest-V3-emerald.svg?style=flat-square" alt="Manifest V3" />
  <img src="https://img.shields.io/badge/License-MIT-slate.svg?style=flat-square" alt="License MIT" />
</p>

---

> [!CAUTION]
> ### ⚖️ DISCLAIMER MUTLAK & HANYA UNTUK KEPERLUAN BELAJAR / EDUKASI
> **(FOR EDUCATIONAL & RESEARCH PURPOSES ONLY)**  
> 1. Proyek repositori ini dibuat **murni untuk tujuan edukasi, pembelajaran arsitektur browser extension (Manifest V3), dan studi teknik pemrosesan citra kanvas (HTML5 Canvas)**.
> 2. Repositori dan kode ini **TIDAK berafiliasi dengan, didukung oleh, atau terkait dengan Universitas Terbuka**.
> 3. Seluruh materi hak cipta modul, buku, dan naskah akademik sepenuhnya merupakan milik **Universitas Terbuka**.
> 4. Mengunduh secara massal atau mendistribusikan materi modul tanpa izin dapat melanggar *Terms of Service* (ToS) platform. Pembuat repositori **TIDAK bertanggung jawab** atas segala konsekuensi atau penyalahgunaan alat ini di luar tujuan riset edukasi pribadi.

---

> [!WARNING]
> ### ⚠️ PANDUAN PENTING: JANGAN GUNAKAN FITUR FULL BUKU (UNDUH SEMUA MODUL)!
> 
> Sangat disarankan untuk **HANYA MENGGUNAKAN FITUR UNDUH PER-MODUL**:
> - ❌ **JANGAN pakai tombol "Unduh Semua Modul Sekaligus (Full 1 PDF)":**  
>   Menarik seluruh modul (ratusan halaman) sekaligus dalam 1 sesi koneksi sering kali **gagal di tengah jalan**, terkena *request timeout*, atau dibatasi (*rate-limited*) oleh server perpustakaan.
> - ✅ **GUNAKAN FITUR: `⚡ Unduh Modul Saat Ini Saja` (Sangat Direkomendasikan):**  
>   Unduh modul satu per satu (`M1`, `M2`, `M3`, dst). Cara ini terbukti **jauh lebih stabil, cepat, dan 100% anti-gagal**.
> - 🧩 **Setelah Semua Modul Terunduh:**  
>   Kamu cukup menggabungkan file-file PDF per modul tersebut menggunakan tools PDF merger offline ataupun online (seperti iLovePDF, Smallpdf, atau skrip penggabung PDF lokal).

---

## 🌟 Fitur Riset (v2.1)

- ⚡ **Single Module Engine (Stabil & Cepat):**  
  Mengunduh modul yang sedang aktif di layar dalam hitungan detik dengan penanganan otomatis hingga akhir halaman modul.
- ✨ **Auto-Clean Artifacts (Canvas Preprocessing):**  
  Eksperimen pembersihan area bar hitam dan artefak gambar bawaan server menggunakan *offscreen HTML5 Canvas* beresolusi tinggi sebelum dikonversi ke format dokumen PDF.
- 🌐 **Background Tab Execution:**  
  Proses kompilasi berjalan di latar belakang tab modul, sehingga popup dapat ditutup tanpa menghentikan proses unduhan.
- 🔍 **Auto-Detect Identifiers:**  
  Mendeteksi kode mata kuliah (`Subfolder`) dan identitas modul (`Doc ID`) secara otomatis dari URL pembaca virtual.

---

## 🚀 Panduan Instalasi (Chrome / Edge / Brave)

1. **Clone Repositori ini:**
   ```bash
   git clone https://github.com/nullsanz/Downloader-Modul.git
   ```
   *(atau klik **Code** > **Download ZIP** lalu ekstrak foldernya).*

2. **Buka Menu Ekstensi Browser:**
   - Google Chrome: ketik `chrome://extensions`
   - Microsoft Edge: ketik `edge://extensions`
   - Brave Browser: ketik `brave://extensions`

3. **Aktifkan Mode Pengembang:**
   - Nyalakan saklar **Developer mode** di pojok kanan atas.

4. **Muat Ekstensi:**
   - Klik tombol **Load unpacked** (Muat yang belum dibongkar).
   - Pilih folder hasil clone/ekstrak repositori ini.

---

## 📖 Cara Penggunaan yang Benar & Aman

1. Buka dan login ke portal [Ruang Baca Virtual Pustaka UT](https://pustaka.ut.ac.id/reader/) dengan akun pribadimu.
2. Buka salah satu modul buku yang ingin kamu pelajari (misal Modul 1 / `M1`).
3. Klik ikon ekstensi **UT Pustaka Downloader Pro** di browser.
4. Klik tombol hijau utama:  
   👉 **`⚡ UNDUH MODUL SAAT INI SAJA`**
5. Tunggu proses penarikan halaman selesai (pantau pil progres di atas layar). File PDF modul tersebut akan langsung terunduh.
6. Untuk modul berikutnya (Modul 2 / `M2`), buka Modul 2 di web reader, lalu ulangi langkah di atas.
7. Setelah semua modul yang kamu butuhkan selesai diunduh, gabungkan file-file PDF tersebut menjadi satu buku lengkap menggunakan aplikasi PDF merger favoritmu.

---

## 🛠️ Tech Stack

- **Manifest V3** (Ekstensi Chrome generasi terbaru).
- **Vanilla JavaScript & HTML5 Canvas** (Dynamic buffer manipulation & offscreen drawing).
- **jsPDF** (Client-side in-memory PDF assembly).

---

Dikelola & dikembangkan untuk tujuan riset edukasi oleh [nullsanz](https://github.com/nullsanz).
