import { ParserWrapper } from '../styles/style';

function PDFParser({ data, downloadParsedData }) {
  if (!data || data.length === 0) return null;

  return (
    <ParserWrapper>
      <h2>신·구조문대비표</h2>
      <div>
        {data.map((row, index) => (
          <div key={index}>
            <div>{row[0]}</div>
            <div>{row[1]}</div>
          </div>
        ))}
      </div>
      <button onClick={downloadParsedData}>.txt 파일 다운로드</button>
    </ParserWrapper>
  );
}

export default PDFParser;
