const btnSingle = document.getElementById('btn-download-single');
const btnDafis = document.getElementById('btn-download-dafis');
const btnTinjauan = document.getElementById('btn-download-tinjauan');
const docInput = document.getElementById('doc');
const subInput = document.getElementById('sub');
const delayInput = document.getElementById('delay');
const chipBtns = document.querySelectorAll('.chip-btn');

// Load saved delay from localStorage
try {
  const savedDelay = localStorage.getItem('ut_delay_ms');
  if (savedDelay !== null && delayInput) delayInput.value = savedDelay;
} catch (e) {}

if (delayInput) {
  delayInput.addEventListener('input', () => {
    try { localStorage.setItem('ut_delay_ms', delayInput.value); } catch (e) {}
  });
}

// Update chip active states
function updateChipHighlights(currentDoc) {
  chipBtns.forEach(btn => {
    if (btn.dataset.doc.toUpperCase() === currentDoc.toUpperCase()) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

// Chip click listener
chipBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    docInput.value = btn.dataset.doc;
    updateChipHighlights(btn.dataset.doc);
  });
});

docInput.addEventListener('input', () => {
  updateChipHighlights(docInput.value.trim());
});

// Auto-detect doc info dari tab aktif
async function autoDetectDocInfo() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.url.includes('pustaka.ut.ac.id')) return;

    chrome.tabs.sendMessage(tab.id, { action: 'getDocInfo' }, (response) => {
      if (response) {
        if (response.doc) {
          docInput.value = response.doc;
          updateChipHighlights(response.doc);
        }
        if (response.subfolder) subInput.value = response.subfolder;
      }
    });
  } catch (err) {}
}

document.addEventListener('DOMContentLoaded', autoDetectDocInfo);

// Helper function untuk trigger pengunduhan
async function executeDownload(targetDoc) {
  const sub = subInput.value.trim();
  const delay = parseInt(delayInput.value, 10) || 300;
  const doc = targetDoc ? targetDoc.trim() : docInput.value.trim();

  if (!doc || !sub) {
    alert('Doc ID dan Subfolder / Kode MK wajib diisi.');
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
    // Tutup popup otomatis agar proses jalan di background tab
    window.close();
  });
}

// Handler Unduh Modul Aktif
btnSingle.addEventListener('click', () => {
  executeDownload(docInput.value.trim());
});

// Handler Unduh DAFIS (Daftar Isi)
btnDafis.addEventListener('click', () => {
  docInput.value = 'DAFIS';
  updateChipHighlights('DAFIS');
  executeDownload('DAFIS');
});

// Handler Unduh TINJAUAN (Pendahuluan / Tinjauan Mata Kuliah)
btnTinjauan.addEventListener('click', () => {
  docInput.value = 'TINJAUAN';
  updateChipHighlights('TINJAUAN');
  executeDownload('TINJAUAN');
});
