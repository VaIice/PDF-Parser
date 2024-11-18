import { useState, useRef, useEffect } from 'react';
import { loadPDF, renderPage, extractText } from '../utils/PDFUtils';
import { pdfApi } from '../api/pdfApi';

export const usePDF = () => {
  const canvasRef = useRef(null);
  const [pageNum, setPageNum] = useState(1);
  const [numPages, setNumPages] = useState(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [parsedData, setParsedData] = useState(null);

  // PDF 또는 페이지가 변경 됐을 때 캔버스 렌더링
  useEffect(() => {
    const renderPDF = async () => {
      if (pdfDoc && canvasRef.current) {
        try {
          await renderPage(pdfDoc, pageNum, canvasRef.current);
        } catch (error) {
          console.log('캔버스 렌더링 에러');
        }
      }
    };

    renderPDF();
  }, [pdfDoc, pageNum]);

  /*
    PDF 업로드 시 실행
    1. PDF 로드
    2. 텍스트 추출
    3. 서버에 데이터 전송 및 결과 반환
  */
  const handleFileChange = async (event) => {
    try {
      const file = event.target.files[0];

      if (!file) {
        return;
      } else if (file.type !== 'application/pdf') {
        alert('PDF 파일만 업로드할 수 있습니다.');
        return;
      }

      const pdf = await loadPDF(file);

      setPdfDoc(pdf);
      setNumPages(pdf.numPages);
      setPageNum(1);

      const pdfTexts = await extractText(pdf);
      const response = await pdfApi(pdfTexts);
      setParsedData(response.data);
    } catch (error) {
      console.log(error.response);
    }
  };

  // PDF 페이지 변경
  const handlePageChange = async (newPageNum) => {
    if (newPageNum >= 1 && newPageNum <= numPages) {
      setPageNum(newPageNum);
    }
  };

  // 파싱 데이터 다운로드
  const downloadParsedData = () => {
    const content = JSON.stringify(parsedData, null, 2);
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '신·구조문대비표.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return {
    canvasRef,
    pdfDoc,
    pageNum,
    numPages,
    parsedData,
    handleFileChange,
    handlePageChange,
    downloadParsedData,
  };
};
