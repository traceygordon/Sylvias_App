require("dotenv").config();
const express = require('express');
const greetersRouter = express.Router();
const { isLoggedIn } = require('./utils');
const { 
  getAllGreeters,
  getGreeterById,
  createGreeter,
  deleteGreeter
} = require('../db');

greetersRouter.get('/', async (req, res, next) => {
    try {
      const greeters = await getAllGreeters();
    
      res.send({
        greeters
      });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  greetersRouter.get('/:id', async (req, res, next) => {
    const {id} = req.params

    try {
      const greeter = await getGreeterById(id);
    
      res.send({
        greeter
      });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  greetersRouter.post('/', isLoggedIn, async (req, res, next) => {
    const { name, pickUps } = req.body;
  
    try {
      const checkGreeter = await getGreeterById(id);
    
      if (checkGreeter) {
        next({
          name: 'GreeterExistsError',
          message: 'A greeter by that name already exists'
        });
      }
  
      const greeter = await createGreeter({
        name,
        pickUps
      });
  
      res.send({ 
        message: "greeter added" 
      });
    } catch ({ name, message }) {
      next({ name, message });
    } 
  });

  greetersRouter.delete('/:id', async (req, res, next) => {
    const { id } = req.params
    try {
     const deleted = await deleteGreeter(id);
      res.status(204);
  
    }
    catch ({ name, message }) {
      next({ name, message });
    }
  });
  
  module.exports = greetersRouter;