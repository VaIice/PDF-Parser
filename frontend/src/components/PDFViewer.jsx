import { ViewerWrapper } from '../styles/style';

function PDFViewer({ canvasRef, pageNum, numPages, handlePageChange }) {
  return (
    <ViewerWrapper>
      <h2>PDF 뷰어</h2>
      <div>
        <canvas ref={canvasRef} />
        <div>
          <button
            onClick={() => handlePageChange(pageNum - 1)}
            disabled={pageNum <= 1}
          >
            이전
          </button>
          <span>
            {pageNum} / {numPages}
          </span>
          <button
            onClick={() => handlePageChange(pageNum + 1)}
            disabled={pageNum >= numPages}
          >
            다음
          </button>
        </div>
      </div>
    </ViewerWrapper>
  );
}

export default PDFViewer;
