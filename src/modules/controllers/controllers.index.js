const { createControllerValidation, updateControllerValidation } = require('../../validation/controllers.validation');
const { getContollerCtrl, createContollerCtrl, updateControllerCtrl } = require('./controllers.ctrl');
const { authorizationMiddleware } = require('../../middleware/authorization.middleware');

const express = require('express').Router();

express.get('/api/controllers', authorizationMiddleware, (req, res) => getContollerCtrl(req, res));
express.post('/api/controllers', authorizationMiddleware, createControllerValidation, (req, res) => createContollerCtrl(req, res));
express.patch('/api/controllers/:controller_id', authorizationMiddleware, updateControllerValidation, (req, res) => updateControllerCtrl(req, res));

module.exports = express;
