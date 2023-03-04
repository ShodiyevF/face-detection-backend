const { PROFILE_IMAGE_SIZE, PROFILE_IMAGE_TYPES, UPLOAD_FOLDER } = require('../../config/upload');
const { authorizationMiddleware } = require('../../middleware/authorization.middleware');
const { fileuploadMiddleware } = require('../../middleware/fileupload.middleware');
const { createUserValidation, updateUserValidation } = require('../../validation/users.validation');
const { getUsersCtrl, createUsersCtrl, updateUsersCtrl, deleteUserCtrl } = require('./users.ctrl');

const express = require('express').Router();

express.get('/api/users', authorizationMiddleware, (req, res) => getUsersCtrl(req, res));
express.post(
    '/api/users',
    authorizationMiddleware,
    fileuploadMiddleware(UPLOAD_FOLDER, PROFILE_IMAGE_TYPES, PROFILE_IMAGE_SIZE, 'user_img', true),
    createUserValidation,
    (req, res) => createUsersCtrl(req, res),
);
express.patch(
    '/api/users/:user_id',
    authorizationMiddleware,
    fileuploadMiddleware(UPLOAD_FOLDER, PROFILE_IMAGE_TYPES, PROFILE_IMAGE_SIZE, 'user_img', false),
    updateUserValidation,
    (req, res) => updateUsersCtrl(req, res),
);
express.delete(
    '/api/users/:user_id',
    authorizationMiddleware,
    (req, res) => deleteUserCtrl(req, res),
);

module.exports = express;
