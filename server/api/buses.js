require("dotenv").config();
const express = require('express');
const busesRouter = express.Router();
const { isLoggedIn } = require('./utils');
const { 
  getAllBuses,
  getBusById,
  createBus,
  updateBus,
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

  busesRouter.patch('/:id', async (req, res, next) => {
    const { id } = req.params;
    const { company, number } = req.body;
    const updateFields = {};

    if (company) {
      updateFields.company = company;
    }
  
    if (number) {
      updateFields.number = number;
    }  

    try {
      const originalBus = await getBusById(id);
      
      if (originalBus.id === +id) {
        const updatedBus = await updateBus(id, updateFields);
        res.send({ post: updatedBus })
      } else {
        next({
          name: 'UnauthorizedUserError',
          message: 'There is no bus with that id'
        })
      }
      }
     catch ({ name, message }) {
      next({ name, message });
    }
  });

  busesRouter.delete('/:id', isLoggedIn, async (req, res, next) => {
    const { id } = req.params
    try {
     const deleted = await deleteBus(id);
      res.status(204);
  
    }
    catch ({ name, message }) {
      next({ name, message });
    } 
  });
  
  module.exports = busesRouter;