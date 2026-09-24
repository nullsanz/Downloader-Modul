// UT Pustaka Downloader Pro - Content Script (Background Tab Engine with Auto-Watermark Cleaning)

let isDownloading = false;
let isCancelled = false;

function extractDocInfo() {
  const url = new URL(window.location);
  const subfolder = url.searchParams.get('subfolder')?.replace(/\/$/, '') || '';
  const docParam = url.searchParams.get('doc') || '';
  const doc = docParam.replace(/\.pdf$/, '').replace(/\.PDF$/, '');
  return { doc: doc || 'M1', subfolder: subfolder || 'EMBS4321' };
}

// Floating Progress Pill UI on Page
let floatingPill = null;

function showFloatingPill(title, subtitle, percent) {
  if (!floatingPill) {
    floatingPill = document.createElement('div');
    floatingPill.id = 'ut-dl-floating-pill';
    floatingPill.style.cssText = `
      position: fixed;
      top: 16px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2147483647;
      background: #0f172a;
      color: #f8fafc;
      border: 2px solid #2563eb;
      box-shadow: 0 10px 30px rgba(0,0,0,0.8);
      border-radius: 9999px;
      padding: 8px 18px;
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-size: 12.5px;
      font-weight: 500;
      transition: all 0.2s ease;
    `;
    document.body.appendChild(floatingPill);
  }

  floatingPill.style.display = 'flex';
  floatingPill.innerHTML = `
    <span style="display:inline-block; width:8px; height:8px; background:#10b981; border-radius:50%; box-shadow:0 0 8px #10b981; animation:pulse 1.5s infinite;"></span>
    <div style="display:flex; flex-direction:column;">
      <strong style="color:#38bdf8; font-size:12px;">${title}</strong>
      <span style="color:#94a3b8; font-size:11px;">${subtitle}</span>
    </div>
    <div style="background:#1e293b; border-radius:999px; height:6px; width:80px; overflow:hidden; margin:0 4px;">
      <div style="background:#3b82f6; height:100%; width:${Math.min(100, Math.max(0, percent))}%;"></div>
    </div>
    <button id="ut-btn-pill-cancel" style="background:#ef4444; color:white; border:none; border-radius:999px; padding:3px 10px; font-size:11px; font-weight:bold; cursor:pointer;">Batal</button>
  `;

  document.getElementById('ut-btn-pill-cancel').onclick = () => {
    isCancelled = true;
    floatingPill.remove();
    floatingPill = null;
  };
}

function hideFloatingPill() {
  if (floatingPill) {
    floatingPill.remove();
    floatingPill = null;
  }
}

function saveBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

// Engine Penarik Halaman (Langsung di Context Tab)
async function fetchPageImage(docName, subfolderName, pageNum) {
  const url = `https://pustaka.ut.ac.id/reader/services/view.php?doc=${docName}&format=jpg&subfolder=${subfolderName}/&page=${pageNum}`;
  try {
    const resp = await fetch(url, { credentials: 'same-origin', cache: 'no-store' });
    if (!resp.ok) return null;

    const ct = resp.headers.get('content-type') || '';
    if (!ct.includes('image')) return null;

    const ab = await resp.arrayBuffer();
    if (ab.byteLength < 500) return null; // Error / halaman kosong

    const bytes = new Uint8Array(ab);
    let binary = '';
    const chunk = 0x8000;
    for (let offset = 0; offset < bytes.length; offset += chunk) {
      binary += String.fromCharCode.apply(null, bytes.subarray(offset, offset + chunk));
    }

    return {
      name: `${docName}_${subfolderName}_${String(pageNum).padStart(3, '0')}.jpg`,
      data: btoa(binary),
      size: bytes.length
    };
  } catch (err) {
    return null;
  }
}

// Pembersih Watermark Asli UT & Penyemat Watermark Kustom (ig: null.cloud)
function processAndCleanPageImage(dataUrl, options = {}) {
  return new Promise((resolve) => {
    const cleanWatermark = options.cleanWatermark !== false;
    const watermarkText = options.watermarkText || '';

    const img = new Image();
    img.onload = () => {
      try {
        const w = img.naturalWidth;
        const h = img.naturalHeight;

        if (!cleanWatermark && !watermarkText) {
          resolve({ dataUrl, width: w, height: h });
          return;
        }

        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');

        // Draw original page
        ctx.drawImage(img, 0, 0);

        if (cleanWatermark) {
          ctx.fillStyle = '#ffffff';

          // 1. Bersihkan watermark samar di margin atas (0 s/d 4.2% tinggi halaman)
          const topH = Math.floor(h * 0.042);
          ctx.fillRect(0, 0, w, topH);

          // 2. Bersihkan watermark bar hitam tebal UT di footer bawah (93.5% s/d 100% tinggi halaman)
          const bottomY = Math.floor(h * 0.935);
          ctx.fillRect(0, bottomY, w, h - bottomY);
        }

        // 3. Sematkan watermark kustom elegan di margin bawah tengah
        if (watermarkText && watermarkText.trim() !== '') {
          const fontSize = Math.max(11, Math.round(h * 0.0085));
          ctx.fillStyle = '#94a3b8'; // Slate 400 muted grey
          ctx.font = `500 ${fontSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';

          const textY = Math.floor(h * 0.97);
          ctx.fillText(watermarkText.trim(), w / 2, textY);
        }

        const cleanedDataUrl = canvas.toDataURL('image/jpeg', 0.92);
        resolve({ dataUrl: cleanedDataUrl, width: w, height: h });
      } catch (err) {
        console.warn('Canvas cleaning fallback:', err);
        resolve({ dataUrl, width: img.naturalWidth, height: img.naturalHeight });
      }
    };

    img.onerror = () => {
      resolve({ dataUrl, width: 1241, height: 1754 });
    };

    img.src = dataUrl;
  });
}

// Download 1 Modul Saja (Auto-detect akhir halaman)
async function runSingleModuleDownload(doc, sub, delayMs, options = {}) {
  isDownloading = true;
  isCancelled = false;
  showFloatingPill(`Mengunduh ${doc}`, 'Menghubungkan ke server...', 0);

  const files = [];
  let page = 1;

  while (!isCancelled) {
    showFloatingPill(`Mengunduh ${doc}`, `Menarik Halaman ${page}...`, Math.min(92, page * 2));
    const result = await fetchPageImage(doc, sub, page);

    if (!result) {
      // Halaman sudah habis
      break;
    }

    files.push(result);
    page++;

    if (delayMs > 0) {
      await new Promise(r => setTimeout(r, delayMs));
    }
  }

  if (isCancelled || files.length === 0) {
    hideFloatingPill();
    isDownloading = false;
    if (!isCancelled) alert(`Modul ${doc} tidak memiliki halaman atau sesi belum aktif.`);
    return;
  }

  showFloatingPill(`Mengompilasi PDF`, `Membersihkan watermark & menyusun ${files.length} Halaman...`, 95);

  const { jsPDF } = window.jspdf || {};
  if (!jsPDF) {
    alert('Library jsPDF tidak ditemukan.');
    hideFloatingPill();
    isDownloading = false;
    return;
  }

  const pdf = new jsPDF({ unit: 'pt', format: 'a4', orientation: 'portrait' });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();

  for (let i = 0; i < files.length; i++) {
    if (isCancelled) break;
    showFloatingPill(`Mengompilasi PDF`, `Hal ${i + 1}/${files.length} (Watermark Cleaned)...`, Math.round(95 + (i / files.length) * 4));

    const rawDataUrl = `data:image/jpeg;base64,${files[i].data}`;
    const processed = await processAndCleanPageImage(rawDataUrl, options);
    files[i].data = null; // Free raw base64 memory

    const scale = Math.min(pageW / processed.width, pageH / processed.height);
    const drawW = processed.width * scale;
    const drawH = processed.height * scale;
    const x = (pageW - drawW) / 2;
    const y = (pageH - drawH) / 2;

    if (i > 0) pdf.addPage();
    pdf.addImage(processed.dataUrl, 'JPEG', x, y, drawW, drawH);
    processed.dataUrl = null; // Free processed image memory
  }

  if (isCancelled) {
    hideFloatingPill();
    isDownloading = false;
    return;
  }

  const pdfBlob = pdf.output('blob');
  const pdfName = `${doc}_${sub}.pdf`;
  saveBlob(pdfBlob, pdfName);

  showFloatingPill(`🎉 Selesai!`, `${pdfName} tersimpan (${files.length} Hal - Cleaned)`, 100);
  setTimeout(hideFloatingPill, 4000);
  isDownloading = false;
}

// Message Listener from Popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'getDocInfo') {
    sendResponse(extractDocInfo());
    return;
  }

  const options = {
    cleanWatermark: request.cleanWatermark !== false,
    watermarkText: request.watermarkText || ''
  };

  if (request.action === 'startSingleDownload') {
    if (isDownloading) {
      alert('Proses pengunduhan sedang berjalan!');
      return;
    }
    runSingleModuleDownload(request.doc, request.subfolder, request.delayMs, options);
    sendResponse({ ok: true });
    return;
  }
});
