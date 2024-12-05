const express = require('express');
const cors = require('cors');

// express 세팅
const configureExpress = () => {
  const app = express();
  app.use(cors());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: true }));

  return app;
};

module.exports = configureExpress;
