// Content script untuk mendeteksi info dokumen dari halaman pustaka.ut.ac.id

function extractDocInfo() {
  const url = new URL(window.location);
  const subfolder = url.searchParams.get('subfolder')?.replace(/\/$/, '') || '';
  const docParam = url.searchParams.get('doc') || '';
  const doc = docParam.replace(/\.pdf$/, '').replace(/\.PDF$/, '');

  let totalPages = 42; // default fallback
  
  // Strategi: cari semua angka setelah "/" di pattern "X / Y" atau "X/Y"
  // Angka setelah "/" adalah total halaman, bukan angka halaman saat ini
  const bodyText = document.body.innerText;
  const slashMatches = bodyText.matchAll(/\/\s*(\d+)/g);
  
  const pageNumbers = [];
  for (const match of slashMatches) {
    const num = parseInt(match[1], 10);
    if (num > 0 && num < 10000) {
      pageNumbers.push(num);
    }
  }

  if (pageNumbers.length > 0) {
    // Hitung frekuensi setiap angka
    const freq = {};
    for (const num of pageNumbers) {
      freq[num] = (freq[num] || 0) + 1;
    }

    // Pilih angka yang paling sering muncul
    let maxFreq = 0;
    let mostFrequent = 42;
    for (const [num, count] of Object.entries(freq)) {
      if (count > maxFreq) {
        maxFreq = count;
        mostFrequent = parseInt(num, 10);
      }
    }

    // Jika ada beberapa angka dengan frekuensi sama, pilih yang terbesar
    // (karena total halaman biasanya lebih besar dari halaman saat ini)
    if (maxFreq > 0) {
      const candidates = Object.keys(freq)
        .filter(num => freq[num] === maxFreq)
        .map(num => parseInt(num, 10))
        .sort((a, b) => b - a);
      
      totalPages = candidates[0];
    }
  }

  return { doc, subfolder, totalPages };
}

// Listen untuk message dari popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getDocInfo') {
    const info = extractDocInfo();
    sendResponse(info);
  }
});

// Optional: send info otomatis saat page load (jika popup terbuka)
window.addEventListener('load', () => {
  const info = extractDocInfo();
  chrome.runtime.sendMessage({ action: 'docInfoReady', data: info }).catch(() => {
    // Popup mungkin belum terbuka, ignore error
  });
});
