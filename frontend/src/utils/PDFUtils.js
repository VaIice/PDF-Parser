import * as pdfjsLib from 'pdfjs-dist';
pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.mjs';

// PDF 텍스트 추출
const extractText = async (pdf) => {
  try {
    const pdfTexts = [];
    // 페이지별 추출
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const viewport = page.getViewport({ scale: 1.0 });
      const textContent = await page.getTextContent();

      pdfTexts.push({
        items: textContent.items,
        view: [0, 0, viewport.width, viewport.height],
      });
    }
    return pdfTexts;
  } catch (error) {
    return [];
  }
};

// PDF 캔버스 렌더링
const renderPage = async (pdf, pageNum, canvas) => {
  try {
    const page = await pdf.getPage(pageNum);
    const context = canvas.getContext('2d');
    const viewport = page.getViewport({ scale: 1 });

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await page.render({
      canvasContext: context,
      viewport: viewport,
    }).promise;
  } catch (error) {
    console.error('Error rendering page:', error);
  }
};

// PDF 로드
const loadPDF = async (file) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = async () => {
      try {
        const typedarray = new Uint8Array(fileReader.result);
        const pdf = await pdfjsLib.getDocument(typedarray).promise;
        resolve(pdf);
      } catch (error) {
        reject(error);
      }
    };

    fileReader.onerror = reject;
    fileReader.readAsArrayBuffer(file);
  });
};

export { extractText, renderPage, loadPDF };
