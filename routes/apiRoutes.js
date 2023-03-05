const Router = require('express').Router();
const payloadSplitter = require('../service/payloadSplitter');

Router.post('/', payloadSplitter);

module.exports = Router;