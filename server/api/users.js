const express = require('express');
const usersRouter = express.Router();
const bcrypt = require('bcrypt');
require("dotenv").config();
const  JWT_SECRET = process.env.JWT || "shhh";

const { 
    createUser,
    getAllUsers,
    deleteUser
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

  usersRouter.post('/register', async (req, res, next) => {
    const { name, password } = req.body;
  
    try {
    //   const _user = await getUserByName(name);
    
    //   if (_user) {
    //     next({
    //       name: 'UserExistsError',
    //       message: 'A user by that username already exists'
    //     });
    //   }
  
      const user = await createUser({
        name,
        password
      });
  
      const token = jwt.sign({ 
        id: user.id, 
        name
      }, process.env.JWT_SECRET, {
        expiresIn: '1w'
      });
  
      res.send({ 
        message: "thank you for signing up",
        token 
      });
    } catch ({ name, message }) {
      next({ name, message });
    } 
  });

  usersRouter.delete('/:userId', async (req, res, next) => {
    try {
     const deleted = await deleteUser(req.params.userId);
      res.status(204);
  
    }
    catch(ex){
      next(ex);
    }
  });


  module.exports = usersRouter;