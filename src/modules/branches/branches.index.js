const { createController,readController, deleteController, updateController } = require('./branches.ctrl');
const { deleteBranchValidation, createBranchValidation } = require('../../validation/branch.validation');
const { authorizationMiddleware } = require('../../middleware/authorization.middleware');
const express = require('express').Router();

express.post('/api/branches/', authorizationMiddleware,createBranchValidation, (req, res) => createController(req, res));
express.get('/api/branches', authorizationMiddleware, (req, res) => readController(req, res));
express.delete('/api/branches/:branch_id', authorizationMiddleware, deleteBranchValidation, (req, res) => deleteController(req, res));
express.patch('/api/branches/:branch_id', authorizationMiddleware,createBranchValidation, (req, res) => updateController(req, res));

module.exports = express;
