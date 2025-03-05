require('dotenv').config();
const PORT = process.env.PORT;
const express = require('express');
const server = express();
const path = require('path')
const bodyParser = require('body-parser');
const cors = require('cors')
server.use(bodyParser.json());

server.use(cors({
origin: "http://localhost:5173",
method: "GET, POST, PUT, PATCH, DELETE",
allowedHeaders: "Content-Type, Authorization"

}))
server.use(express.static(path.join(__dirname, "../client/dist")));

const app = require('./api');
server.use('/api', app);

const { client } = require('./db');
client.connect();

server.listen(PORT, () => {
    console.log("The server is up on port", PORT);
  });