const express = require('express');
const usersRouter = express.Router();
const bcrypt = require('bcrypt');
require("dotenv").config();
const  JWT_SECRET = process.env.JWT || "shhh";

const { 
    createUser,
    getAllUsers
  } = require('../db');

  const jwt = require('jsonwebtoken');

  usersRouter.get('/', async (req, res, next) => {
    try {
      const users = await getAllUsers();
    
      res.send({
        users
      });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });





  module.exports = usersRouter;