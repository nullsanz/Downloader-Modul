const btnAll = document.getElementById('btn-download-all');
const btnSingle = document.getElementById('btn-download-single');
const docInput = document.getElementById('doc');
const subInput = document.getElementById('sub');
const delayInput = document.getElementById('delay');

// Load saved settings from localStorage
try {
  const savedDelay = localStorage.getItem('ut_delay_ms');
  if (savedDelay !== null && delayInput) delayInput.value = savedDelay;
} catch (e) {}

if (delayInput) {
  delayInput.addEventListener('input', () => {
    try { localStorage.setItem('ut_delay_ms', delayInput.value); } catch (e) {}
  });
}

// Auto-detect doc info dari tab aktif
async function autoDetectDocInfo() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.url.includes('pustaka.ut.ac.id')) return;

    chrome.tabs.sendMessage(tab.id, { action: 'getDocInfo' }, (response) => {
      if (response) {
        if (response.doc) docInput.value = response.doc;
        if (response.subfolder) subInput.value = response.subfolder;
      }
    });
  } catch (err) {}
}

document.addEventListener('DOMContentLoaded', autoDetectDocInfo);

// Handler Unduh SEMUA Modul (Full Buku 1 PDF)
btnAll.addEventListener('click', async () => {
  const sub = subInput.value.trim();
  const delay = parseInt(delayInput.value, 10) || 300;

  if (!sub) {
    alert('Subfolder / Kode Mata Kuliah wajib diisi.');
    return;
  }

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab) return alert('Buka halaman modul UT terlebih dahulu.');

  chrome.tabs.sendMessage(tab.id, {
    action: 'startAllDownload',
    subfolder: sub,
    delayMs: delay
  }, (resp) => {
    if (chrome.runtime.lastError) {
      alert('Gagal menghubungkan ke tab UT. Harap refresh tab UT tersebut sekali (F5) lalu coba lagi.');
      return;
    }
    // Tutup popup otomatis agar user tahu proses jalan di background tab
    window.close();
  });
});

// Handler Unduh Modul Saat Ini Saja
btnSingle.addEventListener('click', async () => {
  const doc = docInput.value.trim();
  const sub = subInput.value.trim();
  const delay = parseInt(delayInput.value, 10) || 300;

  if (!doc || !sub) {
    alert('Doc ID dan Subfolder wajib diisi.');
    return;
  }

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab) return alert('Buka halaman modul UT terlebih dahulu.');

  chrome.tabs.sendMessage(tab.id, {
    action: 'startSingleDownload',
    doc: doc,
    subfolder: sub,
    delayMs: delay
  }, (resp) => {
    if (chrome.runtime.lastError) {
      alert('Gagal menghubungkan ke tab UT. Harap refresh tab UT tersebut sekali (F5) lalu coba lagi.');
      return;
    }
    window.close();
  });
});
