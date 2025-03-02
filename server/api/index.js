const express = require('express');
const apiRouter = express.Router();
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

apiRouter.use(express.json());









const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const busesRouter = require('./buses');
apiRouter.use('/buses', busesRouter);

const greetersRouter = require('./greeters');
apiRouter.use('/greeters', greetersRouter);

apiRouter.use((error, req, res, next) => {
  res.send(error);
});

module.exports = apiRouter;