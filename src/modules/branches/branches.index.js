const { deleteBranchValidation, createBranchValidation, updateBranchValidation } = require('../../validation/branch.validation');
const { createController, readController, deleteController, updateController } = require('./branches.ctrl');
const { authorizationMiddleware } = require('../../middleware/authorization.middleware');
const express = require('express').Router();

express.get('/api/branches', authorizationMiddleware, (req, res) => readController(req, res));
express.post('/api/branches/', authorizationMiddleware, createBranchValidation, (req, res) => createController(req, res));
express.patch('/api/branches/:branch_id', authorizationMiddleware, updateBranchValidation, (req, res) => updateController(req, res));
express.delete('/api/branches/:branch_id', authorizationMiddleware, deleteBranchValidation, (req, res) => deleteController(req, res));

module.exports = express;
