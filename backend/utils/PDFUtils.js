// 중복 공백 제거
const cleanText = (text) => {
  if (!text) return '';
  return text.trim().replace(/\s+/g, ' ');
};

/*
  새로운 섹션 시작
  1. 원 형식의 번호
  2. 제n조
  3. <신설>
*/
const isNewSection = (current, content) => {
  if (!current) return false;

  const circleNumbers = /^[①②③④⑤⑥⑦⑧⑨⑩]/;
  const articlePattern = /^제\d+조/;

  return (
    (circleNumbers.test(current.trim()) &&
      circleNumbers.test(content?.trim())) ||
    (current.trim().match(articlePattern) &&
      content?.trim().match(articlePattern)) ||
    (current?.includes('신') && current?.includes('설'))
  );
};

module.exports = {
  cleanText,
  isNewSection,
};
