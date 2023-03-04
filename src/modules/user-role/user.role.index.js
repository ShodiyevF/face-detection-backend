const { deleteUserRoleValidation, createUserRoleValidation, updateUserRoleValidation } = require('../../validation/user.role.validation');
const { createUserRoleCtrl, getUserRoleCtrl, updateUserRoleCtrl, deleteUserRoleCtrl } = require('./user.role.ctrl');
const { authorizationMiddleware } = require('../../middleware/authorization.middleware');
const express = require('../auth/auth.index');

express.get('/api/userrole', authorizationMiddleware, (req, res) => getUserRoleCtrl(req, res));

express.post(
    '/api/userrole',
    authorizationMiddleware,
    createUserRoleValidation,
    (req, res) => createUserRoleCtrl(req, res));

express.patch(
    '/api/userrole/:role_id',
    authorizationMiddleware,
    updateUserRoleValidation,
    (req, res) => updateUserRoleCtrl(req, res));

express.post('/api/userrole', authorizationMiddleware, createUserRoleValidation, (req, res) => createUserRoleCtrl(req, res));

express.patch('/api/userrole/:role_id', authorizationMiddleware, updateUserRoleValidation, (req, res) => updateUserRoleCtrl(req, res));

express.delete('/api/userrole/:role_id', authorizationMiddleware, deleteUserRoleValidation, (req, res) => deleteUserRoleCtrl(req, res));
