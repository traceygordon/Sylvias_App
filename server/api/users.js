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
    updateUser,
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
    } catch ({ name, message }) {
      next({ name, message });
    } 
  });

  usersRouter.patch('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { name, password } = req.body;
    const updateFields = {};

    if (name) {
      updateFields.name = name;
    }
  
    if (password) {
      updateFields.password = password;
    }  

    try {
      usersRouter.patch('/:id', async (req, res, next) => {
        const { id } = req.params;
        const { name, password } = req.body;
        const updateFields = {};
    
        if (name) {
          updateFields.name = name;
        }
      
        if (password) {
          updateFields.password = password;
        }  
    
        try {
          const originalUser = await getUserById(id);
      
          if (originalUser.id === +id) {
            const updatedUser = await updateUser(id, updateFields);
            res.send({ post: updatedUser })
          } else {
            next({
              name: 'UnauthorizedUserError',
              message: 'You must be logged in to update your profile'
            })
          }
        } catch ({ name, message }) {
          next({ name, message });
        }
      });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  usersRouter.delete('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
     const deleted = await deleteUser(id);
      res.status(204);
  
    }
    catch ({ name, message }) {
      next({ name, message });
    } 
  });


  module.exports = usersRouter;