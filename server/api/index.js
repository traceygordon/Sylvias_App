const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

apiRouter.use(express.json());









const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const busesRouter = require('./buses');
apiRouter.use('/posts', busesRouter);

const greetersRouter = require('./greeters');
apiRouter.use('/tags', greetersRouter);

apiRouter.use((error, req, res, next) => {
  res.send(error);
});

module.exports = apiRouter;