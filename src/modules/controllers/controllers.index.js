const { authorizationMiddleware } = require('../../middleware/authorization.middleware');
const { createControllerValidation } = require('../../validation/controllers.validation');
const { getContollerCtrl, createContollerCtrl } = require('./controllers.ctrl');

const express = require('express').Router();

express.get('/api/controllers', authorizationMiddleware, (req, res) => getContollerCtrl(req, res));
express.post('/api/controllers', authorizationMiddleware, createControllerValidation, (req, res) => createContollerCtrl(req, res));

module.exports = express;
