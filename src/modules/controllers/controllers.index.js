const { authorizationMiddleware } = require('../../middleware/authorization.middleware');
const { getContollerCtrl } = require('./controllers.ctrl');

const express = require('express').Router();

express.get('/api/controllers', authorizationMiddleware, (req, res) => getContollerCtrl(req, res));

module.exports = express;
