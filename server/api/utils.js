const jwt = require('jsonwebtoken');

require('dotenv').config()

async function isLoggedIn(req, res, next) {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verify;
    next();
  }
  catch(ex){
    next(ex);
}}

module.exports = {
  isLoggedIn
}