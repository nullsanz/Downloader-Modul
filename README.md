# 📚 UT Pustaka Downloader Pro (Downloader-Modul)

<p align="center">
  <img src="logo.png" width="120" height="120" alt="Logo UT Downloader Pro" style="border-radius: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.3);" />
</p>

<p align="center">
  <strong>Ekstensi Browser Modern untuk Mengunduh Modul RBV Ruang Baca Virtual UT (Pustaka UT) Cepat, Otomatis, dan Bersih Tanpa Watermark.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Version-2.1-blue.svg?style=flat-square" alt="Version 2.1" />
  <img src="https://img.shields.io/badge/Manifest-V3-emerald.svg?style=flat-square" alt="Manifest V3" />
  <img src="https://img.shields.io/badge/License-MIT-slate.svg?style=flat-square" alt="License MIT" />
</p>

---

## 🌟 Fitur Unggulan (v2.1)

- 📚 **Full Auto-Batch (1 Klik 1 Buku Jadi 1 PDF):**  
  Otomatis menarik `DAFIS`, `TINJAUAN`, dan seluruh modul (`M1` hingga `M12`) lalu menyatukannya langsung ke dalam 1 file PDF lengkap dan terurut rapi.
- ✨ **Auto-Clean Watermark UT (100% Bersih & Rapi):**  
  Secara cerdas menghapus bar hitam tebal dan watermark copyright yang menutupi bagian bawah/atas halaman dari server pustaka UT, menghasilkan halaman buku yang bersih seperti buku cetak aslinya.
- ⚡ **Auto-Detect Akhir Halaman:**  
  Kamu tidak perlu lagi mengetik atau menghitung total halaman secara manual. Sistem secara otomatis mendeteksi batas akhir halaman tiap modul.
- 🌐 **Background Tab Execution:**  
  Begitu tombol unduh diklik, popup boleh langsung ditutup! Proses download berjalan di latar belakang tab modul, dan kamu bebas membuka tab lain atau mengerjakan hal lain sambil memantau progres lewat pil mengambang di atas layar.
- ⚡ **Single Module Download:**  
  Pilihan untuk mengunduh modul yang sedang aktif saja dalam hitungan detik jika kamu hanya membutuhkan modul tertentu.

---

## 🚀 Panduan Instalasi (Chrome / Edge / Brave)

1. **Clone atau Unduh Repositori ini:**
   ```bash
   git clone https://github.com/nullsanz/Downloader-Modul.git
   ```
   *(atau klik **Code** > **Download ZIP** lalu ekstrak ke komputermu).*

2. **Buka Menu Ekstensi Browser:**
   - Di Google Chrome: buka `chrome://extensions`
   - Di Microsoft Edge: buka `edge://extensions`
   - Di Brave Browser: buka `brave://extensions`

3. **Aktifkan Developer Mode:**
   - Nyalakan saklar **Developer mode** (Mode Pengembang) di pojok kanan atas.

4. **Muat Ekstensi:**
   - Klik tombol **Load unpacked** (Muat yang belum dibongkar).
   - Pilih folder hasil clone/ekstrak repositori ini.

---

## 📖 Cara Penggunaan

1. Buka dan login ke portal [Ruang Baca Virtual Pustaka UT](https://pustaka.ut.ac.id/reader/).
2. Buka salah satu modul buku mata kuliah yang ingin kamu baca/unduh.
3. Klik ikon ekstensi **UT Pustaka Downloader Pro** di bilah ekstensi browser.
4. Kode mata kuliah (`Subfolder`) dan modul (`Doc ID`) akan otomatis terdeteksi:
   - Klik **📚 UNDUH SEMUA MODUL (FULL 1 PDF)** untuk menyatukan seluruh buku ke dalam 1 file PDF.
   - Atau klik **⚡ Unduh Modul Saat Ini Saja** untuk mengunduh modul yang sedang dibuka.
5. Pantau status pengunduhan lewat pil progres mengambang di bagian atas halaman tab UT.
6. File PDF hasil unduhan yang bersih tanpa watermark akan otomatis tersimpan di folder *Downloads* komputermu.

---

## 🛠️ Tech Stack & Arsitektur

- **Manifest V3** (Standar ekstensi Chrome modern & aman).
- **Vanilla JavaScript & HTML5 Canvas** (Offscreen dynamic image processing untuk pembersihan watermark tanpa distorsi resolusi).
- **jsPDF** (Kompilasi dokumen PDF instan langsung di sisi peramban pengguna).

---

## ⚖️ Lisensi & Disclaimer

Proyek ini dibuat untuk keperluan studi dan aksesibilitas akademik personal bagi mahasiswa Universitas Terbuka. Seluruh materi hak cipta modul adalah milik Universitas Terbuka.

Dikelola & dikembangkan oleh [nullsanz](https://github.com/nullsanz).
