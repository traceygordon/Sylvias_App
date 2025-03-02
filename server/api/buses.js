const express = require('express');
const busesRouter = express.Router();
require("dotenv").config();

const { 
  getAllBuses,
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

  busesRouter.post('/', async (req, res, next) => {
    const { number, company } = req.body;
  
    try {
    //   const _bus = await getBusByInfo(info);
    
    //   if (_bus) {
    //     next({
    //       name: 'BusExistsError',
    //       message: 'That bus already exists'
    //     });
    //   }
  
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

  busesRouter.delete('/:busId', async (req, res, next) => {
    try {
     const deleted = await deleteBus(req.params.busId);
      res.status(204);
  
    }
    catch(ex){
      next(ex);
    }
  });
  
  module.exports = busesRouter;