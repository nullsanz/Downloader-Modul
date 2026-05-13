const startBtn = document.getElementById('start');
const statusEl = document.getElementById('status');
const barEl = document.getElementById('bar');

// Auto-detect doc info from active tab
async function autoDetectDocInfo() {
  try {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (!tab || !tab.url.includes('pustaka.ut.ac.id')) {
      setProgress(0, 'Siap. Buka halaman dokumen di pustaka.ut.ac.id.');
      return;
    }

    chrome.tabs.sendMessage(tab.id, { action: 'getDocInfo' }, (response) => {
      if (response) {
        document.getElementById('doc').value = response.doc || 'M5';
        document.getElementById('sub').value = response.subfolder || 'SKOM431504';
        setProgress(0, `Siap. Terdeteksi: ${response.doc} / ${response.subfolder}. Isi total halaman manual.`);
      } else {
        setProgress(0, 'Siap. Isi form lalu mulai unduh.');
      }
    });
  } catch (err) {
    console.warn('Auto-detect failed:', err);
    setProgress(0, 'Siap. Isi form lalu mulai unduh.');
  }
}

// Jalankan auto-detect saat popup dibuka
document.addEventListener('DOMContentLoaded', autoDetectDocInfo);

function setProgress(percent, text) {
  barEl.style.width = `${Math.max(0, Math.min(100, percent))}%`;
  statusEl.textContent = text;
}

function saveBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function loadImageDimensions(dataUrl) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve({ width: img.naturalWidth, height: img.naturalHeight });
    img.onerror = reject;
    img.src = dataUrl;
  });
}

startBtn.addEventListener('click', async () => {
  const doc = document.getElementById('doc').value.trim();
  const sub = document.getElementById('sub').value.trim();
  const totalInput = document.getElementById('total').value.trim();
  const total = parseInt(totalInput, 10);
  const delayMs = parseInt(document.getElementById('delay').value, 10) || 2000;
  const format = document.getElementById('format').value;

  if (!doc || !sub) {
    alert('Doc ID dan Subfolder wajib diisi.');
    return;
  }

  if (!Number.isInteger(total) || total < 1) {
    alert('Total Halaman wajib diisi manual dengan angka valid (>= 1).');
    return;
  }

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab) return alert('Tab aktif tidak ditemukan. Buka halaman dokumen terlebih dahulu.');

  startBtn.disabled = true;
  setProgress(0, 'Memulai...');

  try {
    const files = [];

    for (let i = 1; i <= total; i++) {
      setProgress(((i - 1) / total) * 100, `Mengambil halaman ${i} dari ${total}...`);

      const results = await chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: async (docName, subfolderName, pageNum) => {
          const url = `https://pustaka.ut.ac.id/reader/services/view.php?doc=${docName}&format=jpg&subfolder=${subfolderName}/&page=${pageNum}`;
          const resp = await fetch(url, { credentials: 'same-origin' });
          if (!resp.ok) {
            return { error: true, message: 'HTTP ' + resp.status };
          }

          const ab = await resp.arrayBuffer();
          const bytes = new Uint8Array(ab);
          let binary = '';
          const chunk = 0x8000;
          for (let offset = 0; offset < bytes.length; offset += chunk) {
            binary += String.fromCharCode.apply(null, bytes.subarray(offset, offset + chunk));
          }

          return {
            error: false,
            name: `${docName}_${subfolderName}_${String(pageNum).padStart(3, '0')}.jpg`,
            data: btoa(binary),
            size: bytes.length
          };
        },
        args: [doc, sub, i]
      });

      const payload = results && results[0] && results[0].result;
      if (!payload) throw new Error(`Tidak mendapat hasil dari halaman ${i}`);
      if (payload.error) throw new Error(`Halaman ${i}: ${payload.message}`);

      files.push({ name: payload.name, data: payload.data });
      setProgress((i / total) * 100, `Halaman ${i} selesai (${payload.size} bytes)`);

      if (i < total && delayMs > 0) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }

    if (format === 'pdf') {
      setProgress(100, 'Membuat PDF...');
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF({ unit: 'pt', format: 'a4', orientation: 'portrait' });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < files.length; i++) {
        const dataUrl = `data:image/jpeg;base64,${files[i].data}`;
        const dim = await loadImageDimensions(dataUrl);
        const scale = Math.min(pageW / dim.width, pageH / dim.height);
        const drawW = dim.width * scale;
        const drawH = dim.height * scale;
        const x = (pageW - drawW) / 2;
        const y = (pageH - drawH) / 2;

        if (i > 0) pdf.addPage();
        pdf.addImage(dataUrl, 'JPEG', x, y, drawW, drawH);
      }

      const pdfBlob = pdf.output('blob');
      const pdfName = `${doc}_${sub}.pdf`;
      saveBlob(pdfBlob, pdfName);
      setProgress(100, `PDF berhasil diunduh: ${pdfName}`);
      alert('PDF berhasil dibuat dan diunduh: ' + pdfName);
    } else {
      setProgress(100, 'Membuat ZIP...');
      const zip = new JSZip();
      for (const file of files) {
        zip.file(file.name, file.data, { base64: true });
      }

      const blob = await zip.generateAsync({ type: 'blob' });
      const zipName = `${doc}_${sub}.zip`;
      saveBlob(blob, zipName);
      setProgress(100, `ZIP berhasil diunduh: ${zipName}`);
      alert('ZIP berhasil dibuat dan diunduh: ' + zipName);
    }
  } catch (err) {
    console.error(err);
    setProgress(0, `Error: ${err.message}`);
    alert('Terjadi kesalahan: ' + err.message);
  } finally {
    startBtn.disabled = false;
  }
});
