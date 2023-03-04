const express = require('../auth/auth.index');
const { userRoleValidation, deleteUserRoleValidation } = require('../../validation/user.role.validation');
const { createUserRoleCtrl, getUserRoleCtrl, updateUserRoleCtrl, deleteUserRoleCtrl } = require('./user.role.ctrl');
const { authorizationMiddleware } = require('../../middleware/authorization.middleware');

express.get(
    '/api/userrole',
    authorizationMiddleware,
    (req, res) => getUserRoleCtrl(req, res));

express.post(
    '/api/userrole',
    authorizationMiddleware,
    userRoleValidation,
    (req, res) => createUserRoleCtrl(req, res));

express.patch(
    '/api/userrole/:role_id',
    authorizationMiddleware,
    userRoleValidation,
    (req, res) => updateUserRoleCtrl(req, res));

express.delete(
    '/api/userrole/:role_id',
    authorizationMiddleware,
    deleteUserRoleValidation,
    (req, res) => deleteUserRoleCtrl(req, res));