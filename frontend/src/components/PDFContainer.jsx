import { usePDF } from '../hooks/usePDFViewer';
import PDFParser from './PDFParser';
import PDFUpload from './PDFUpload';
import PDFViewer from './PDFViewer';

function PDFContainer() {
  const {
    pdfDoc,
    canvasRef,
    pageNum,
    numPages,
    parsedData,
    handleFileChange,
    handlePageChange,
    downloadParsedData,
  } = usePDF();

  return (
    <>
      <PDFUpload pdfDoc={pdfDoc} handleFileChange={handleFileChange} />
      {pdfDoc && (
        <>
          <PDFViewer
            canvasRef={canvasRef}
            pageNum={pageNum}
            numPages={numPages}
            handlePageChange={handlePageChange}
          />
          <PDFParser
            data={parsedData}
            downloadParsedData={downloadParsedData}
          />
        </>
      )}
    </>
  );
}

export default PDFContainer;
