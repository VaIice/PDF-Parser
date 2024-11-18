const configureExpress = require('./config/express');
const parseController = require('./controllers/parseController');

// express 설정
const app = configureExpress();

// api 정의
app.post('/api/parse', parseController.parseText);

// 3000 port에서 실행
app.listen(3000, () => {
  console.log('localhost:3000 서버 실행');
});
