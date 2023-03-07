const { deleteUserRoleValidation, createUserRoleValidation, updateUserRoleValidation } = require('../../validation/user.role.validation');
const { createUserRoleCtrl, getUserRoleCtrl, updateUserRoleCtrl, deleteUserRoleCtrl } = require('./user.role.ctrl');
const { authorizationMiddleware } = require('../../middleware/authorization.middleware');
const express = require('express').Router()

express.get('/api/userRole', authorizationMiddleware, (req, res) => getUserRoleCtrl(req, res));

express.post('/api/userRole', authorizationMiddleware, createUserRoleValidation, (req, res) => createUserRoleCtrl(req, res));

express.patch('/api/userRole/:role_id', authorizationMiddleware, updateUserRoleValidation, (req, res) => updateUserRoleCtrl(req, res));

express.delete('/api/userRole/:role_id', authorizationMiddleware, deleteUserRoleValidation, (req, res) => deleteUserRoleCtrl(req, res));

module.exports = express