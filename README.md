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
> 1. Proyek repositori ini dibuat **murni untuk tujuan edukasi, pembelajaran arsitektur browser extension (Manifest V3), dan studi teknik manipulasi grafis canvas (HTML5 Canvas API)**.
> 2. Repositori dan kode ini **TIDAK berafiliasi dengan, didukung oleh, atau terkait dengan Universitas Terbuka**.
> 3. Seluruh materi hak cipta modul, buku, dan materi perkuliahan sepenuhnya milik **Universitas Terbuka**.
> 4. Mengunduh secara massal atau mendistribusikan materi modul tanpa izin dapat melanggar *Terms of Service* (ToS) platform. Pembuat repositori **TIDAK bertanggung jawab** atas segala konsekuensi atau penyalahgunaan alat ini di luar tujuan riset edukasi pribadi.

---

> [!TIP]
> ### 💡 WORKFLOW TERBAIK & ANTI-GAGAL: UNDUH PER-MODUL
> - ⚡ **Fokus Unduh Per-Modul:**  
>   Ekstensi ini sengaja dirancang khusus untuk mengunduh dokumen satu per satu (`DAFIS`, `TINJAUAN`, `M1`, `M2`, dst) agar koneksi request ke server tetap ringan, stabil, dan **100% anti-gagal / bebas timeout**.
> - 🧩 **Gabungkan PDF Sendiri:**  
>   Setelah modul-modul yang kamu butuhkan selesai diunduh, kamu dapat menggabungkan file-file PDF tersebut menjadi satu buku utuh menggunakan aplikasi PDF merger favoritmu (baik offline maupun online seperti iLovePDF / Smallpdf).

---

## 🌟 Fitur Unggulan (v2.1)

- ⚡ **Unduh Modul Cepat & Stabil:**  
  Menarik seluruh halaman modul aktif secara otomatis hingga halaman terakhir tanpa perlu menghitung jumlah halaman manual.
- 📋 **Dukungan Bagian Awal Buku (`DAFIS` & `TINJAUAN`):**  
  Tersedia tombol pintas khusus untuk langsung mengunduh **Daftar Isi (`DAFIS`)** dan **Tinjauan Mata Kuliah / Pendahuluan (`TINJAUAN`)**.
- 🔘 **Quick Modul Switcher Chips (`M1` – `M12`):**  
  Pilihan tombol pintas modul interaktif sehingga kamu tidak perlu mengetik nama modul berulang kali.
- ✨ **Auto-Clean Artifacts (Canvas Preprocessing):**  
  Menyapu bar hitam tebal dan watermark copyright bawaan pembaca virtual secara otomatis, menghasilkan file PDF yang bersih seperti buku cetak asli.
- 🌐 **Background Tab Execution:**  
  Proses kompilasi berjalan di latar belakang tab modul aktif, sehingga jendela popup dapat ditutup dan kamu bebas membuka tab lain saat unduhan berjalan.

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

## 📖 Cara Penggunaan

1. Buka dan login ke portal [Ruang Baca Virtual Pustaka UT](https://pustaka.ut.ac.id/reader/) dengan akun pribadimu.
2. Buka salah satu modul buku mata kuliah.
3. Klik ikon ekstensi **UT Pustaka Downloader Pro** di bilah peramban.
4. Kode mata kuliah dan nomor modul akan otomatis terdeteksi:
   - Klik **⚡ UNDUH MODUL INI (PDF)** untuk mengunduh modul aktif.
   - Klik **📋 Unduh DAFIS** untuk mengunduh Daftar Isi.
   - Klik **📖 Unduh TINJAUAN** untuk mengunduh Pendahuluan / Tinjauan Mata Kuliah.
   - Atau klik chip **[M1]** s/d **[M12]** untuk berpindah modul dengan cepat.
5. File PDF modul yang rapi dan bersih akan otomatis tersimpan di folder *Downloads* komputermu.

---

## 🛠️ Tech Stack

- **Manifest V3** (Standar ekstensi peramban modern & aman).
- **Vanilla JavaScript & HTML5 Canvas** (Dynamic buffer manipulation & offscreen drawing).
- **jsPDF** (Client-side in-memory PDF assembly).

---

Dikelola & dikembangkan untuk tujuan riset edukasi oleh [nullsanz](https://github.com/nullsanz).
