const cors = require('cors');
const bodyparser = require('body-parser');
const express = require('express');
const server = express();

server.use(bodyparser.json());
server.use(cors());
server.use('/static',express.static(__dirname + '/uploads'));

server.get('/admin/:user/:image', (req, res) => res.sendFile(__dirname + `/uploads/admin/${req.params.user}/${req.params.image}`));
server.get('/items/:make/:model', (req, res) => res.sendFile(__dirname + `/uploads/items/${req.params.make}/${req.params.model}`));
require('./routes')(server);

module.exports = server;
