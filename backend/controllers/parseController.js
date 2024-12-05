const { parsing } = require('../services/parseService');

// 데이터를 파싱하여 클라이언트에 응답
const parseText = async (req, res) => {
  try {
    const { textData } = req.body;
    const parsedData = parsing(textData);

    res.json({
      message: '파싱 성공',
      data: parsedData,
    });
  } catch (error) {
    res.status(500).json({
      message: '서버 에러',
      error: error.message,
    });
  }
};

module.exports = {
  parseText,
};
