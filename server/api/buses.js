require("dotenv").config();
const express = require('express');
const busesRouter = express.Router();
const { isLoggedIn } = require('./utils');
const { 
  getAllBuses,
  getBusById,
  createBus,
  deleteBus
} = require('../db');

busesRouter.get('/', async (req, res, next) => {
    try {
      const buses = await getAllBuses();
    
      res.send({
        buses
      });
    } catch ({ number, message }) {
      next({ number, message });
    }
  });

  busesRouter.get('/:id', async (req, res, next) => {
    const {id} = req.params

    try {
      const bus = await getBusById(id);
    
      res.send({
        bus
      });
    } catch ({ name, message }) {
      next({ name, message });
    }
  });

  busesRouter.post('/', isLoggedIn, async (req, res, next) => {
    const { number, company } = req.body;
  
    try {
      const checkBus = await getBusById(id);
    
      if (checkBus) {
        next({
          name: 'BusExistsError',
          message: 'That bus already exists'
        });
      }
  
      const bus = await createBus({
        number,
        company
      });
  
      res.send({ 
        message: "bus added" 
      });
    } catch ({ name, message }) {
      next({ name, message });
    } 
  });

  busesRouter.delete('/:id', isLoggedIn, async (req, res, next) => {
    const { id } = req.params
    try {
     const deleted = await deleteBus(id);
      res.status(204);
  
    }
    catch(ex){
      next(ex);
    }
  });
  
  module.exports = busesRouter;