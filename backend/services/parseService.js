const { cleanText, isNewSection } = require('../utils/PDFUtils');

// PDF 텍스트들을 파싱
const parsing = (pages) => {
  // 신·구조문대비표가 나오면 true
  let isParsingStarted = false;
  // 파싱된 데이터 저장
  let allTables = [];
  // 현재 섹션
  let currentSection = null;

  // 페이지에서 추출된 텍스트를 순회하며 파싱 작업 진행
  for (const page of pages) {
    if (!page.items || !Array.isArray(page.items)) continue;

    // x, y좌표 순으로 정렬
    const sortedItems = [...page.items].sort((a, b) => {
      const yDiff = Math.abs(b.transform[5] - a.transform[5]);
      if (yDiff < 3) {
        return a.transform[4] - b.transform[4];
      }
      return b.transform[5] - a.transform[5];
    });

    // 임시 행 배열
    let tempRow = ['', ''];
    // 이전 y 위치 (PDF 상에서 다음줄 여부 확인)
    let lastY = null;
    const threshold = 3;

    // 텍스트 순회
    for (const item of sortedItems) {
      // 신·구조문대비표가 포함되있다면 true
      if (
        !isParsingStarted &&
        item.str &&
        item.str.includes('신·구조문대비표')
      ) {
        isParsingStarted = true;
        continue;
      }

      // 신·구조문대비표를 발견하지 못했다면 continue
      if (!isParsingStarted) continue;

      // PDF 페이지 번호 삭제
      const pageNumberPattern = /^\s*-\s*\d+\s*-\s*$/;
      if (!item.str || pageNumberPattern.test(item.str.trim())) continue;

      // 왼쪽 열 구분
      const isLeftColumn = item.transform[4] < page.view[2] / 2;
      // 현재 순회하고 있는 곳의 y좌표
      const currentY = item.transform[5];

      // Y좌표가 임계값을 초과하면 새로운 행으로 처리
      if (lastY === null || Math.abs(currentY - lastY) > threshold) {
        // 저장된 임시 행이 있다면
        if (tempRow[0] || tempRow[1]) {
          // 텍스트 공백 삭제
          const cleanedRow = [cleanText(tempRow[0]), cleanText(tempRow[1])];
          if (isNewSection(cleanedRow[0], cleanedRow[1])) {
            // 이전 섹션을 테이블에 추가
            if (currentSection) {
              allTables.push([currentSection[0], currentSection[1]]);
            }
            currentSection = [...cleanedRow];
          } else if (currentSection) {
            // 기존 섹션에 데이터 추가
            if (cleanedRow[0].length > 0) {
              currentSection[0] = `${currentSection[0]} ${cleanedRow[0]}`;
            }
            if (cleanedRow[1].length > 0) {
              currentSection[1] = `${currentSection[1]} ${cleanedRow[1]}`;
            }
          } else {
            // 첫번째 섹션 추가
            currentSection = [...cleanedRow];
          }
          // 임시 행 초기화
          tempRow = ['', ''];
        }
      }

      // 열 구분
      if (isLeftColumn) {
        tempRow[0] = `${tempRow[0]} ${item.str}`;
      } else {
        tempRow[1] = `${tempRow[1]} ${item.str}`;
      }
      lastY = currentY;
    }

    // 마지막 행 처리
    if (tempRow[0] || tempRow[1]) {
      const cleanedRow = [cleanText(tempRow[0]), cleanText(tempRow[1])];

      // 새로운 섹션인지 확인
      if (isNewSection(cleanedRow[0], cleanedRow[1])) {
        if (currentSection) {
          allTables.push([currentSection[0], currentSection[1]]);
        }
        currentSection = [...cleanedRow];
      } else if (currentSection) {
        currentSection[0] = `${currentSection[0]} ${cleanedRow[0]}`;
        currentSection[1] = `${currentSection[1]} ${cleanedRow[1]}`;
      } else {
        currentSection = [...cleanedRow];
      }
    }
  }

  if (currentSection) {
    allTables.push([currentSection[0], currentSection[1]]);
  }

  return allTables;
};

module.exports = {
  parsing,
};
