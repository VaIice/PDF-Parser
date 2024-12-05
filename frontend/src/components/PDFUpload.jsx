import { UploadWrapper } from '../styles/style';

function PDFUpload({ pdfDoc, handleFileChange }) {
  return (
    <UploadWrapper>
      <h2>PDF 업로더</h2>
      <label htmlFor='pdf-upload'>PDF 업로드</label>
      <input
        id='pdf-upload'
        type='file'
        accept='.pdf'
        onChange={handleFileChange}
        className='pdf-input'
      />
      {pdfDoc && <span>PDF가 업로드되었습니다.</span>}
    </UploadWrapper>
  );
}

export default PDFUpload;
