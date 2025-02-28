require('dotenv').config();

const  PORT  = process.env.PORT;
const express = require('express');
const server = express();
const path = require('path')

const bodyParser = require('body-parser');
server.use(bodyParser.json());

const morgan = require('morgan');
server.use(morgan('dev'));

const path = require("node:path");
server.use(express.static(path.join(__dirname, "../client/dist")));

const app = require('./api');
server.use('/api', app);

const { client } = require('./server');
client.connect();

server.listen(PORT, () => {
    console.log("The server is up on port", PORT);
  });