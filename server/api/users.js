require("dotenv").config();
const express = require('express');
const usersRouter = express.Router();
const bcrypt = require('bcrypt');
const  JWT_SECRET = process.env.JWT || "shhh";
const { 
    getAllUsers,
    getUserByName,
    getUserById,
    createUser,
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
  })

  usersRouter.get('/', async (req, res, next) => {
    try {
      const user = await getUserByName();
    
      res.send({
        user
      });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  usersRouter.get('/:id', async (req, res, next) => {
    const {id} = req.params

    try {
      const user = await getUserById(id);
    
      res.send({
        user
      });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  usersRouter.post('/register', async (req, res, next) => {
    const { name, password } = req.body;
  
    try {
      const userCheck = await getUserByName(name);
    
      if (userCheck) {
        next({
          name: 'UserExistsError',
          message: 'A user by that username already exists'
        });
      }
  
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

  usersRouter.post('/login', async (req, res, next) => {
    const { name, password } = req.body;

    if (!name || !password) {
      next({
        name: "MissingCredentialsError",
        message: "A name and password are required"
      });
    }
  
    try {
      const user = await getUserByName(name);
      if ((await bcrypt.compare(password, user.password) == true)) {
        const token = jwt.sign({ 
          id: user.id, 
          name
        }, JWT_SECRET, {
          expiresIn: '1w'
        });
  
        res.send({ 
          message: "you're logged in!",
          token 
        });
      } else {
        next({ 
          name: 'IncorrectCredentialsError', 
          message:'name or password is incorrect'
        });
      }
    } catch(error) {
      console.log(error);
      next(error);
    }
  });

  usersRouter.delete('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
     const deleted = await deleteUser(id);
      res.status(204);
  
    }
    catch(ex){
      next(ex);
    }
  });


  module.exports = usersRouter;