const express = require('express');
const greetersRouter = express.Router();
require("dotenv").config();

const { 
  getAllGreeters,
  createGreeter
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

  greetersRouter.post('/', async (req, res, next) => {
    const { name, pickUps } = req.body;
  
    try {
    //   const _greeter = await getGreeterByName(name);
    
    //   if (_greeter) {
    //     next({
    //       name: 'GreeterExistsError',
    //       message: 'A greeter by that name already exists'
    //     });
    //   }
  
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

  greetersRouter.delete('/:greeterId', async (req, res, next) => {
    try {
     const deleted = await deleteGreeter(req.params.greeterId);
      res.status(204);
  
    }
    catch(ex){
      next(ex);
    }
  });
  
  module.exports = greetersRouter;