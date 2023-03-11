const { createUserValidation, updateUserValidation, deleteUserValidation, getUserImgValidation } = require('../../validation/users.validation');
const { getUsersCtrl, createUsersCtrl, updateUsersCtrl, deleteUserCtrl, getUserImgCtrl } = require('./users.ctrl');
const { PROFILE_IMAGE_SIZE, PROFILE_IMAGE_TYPES, UPLOAD_FOLDER } = require('../../config/upload');
const { authorizationMiddleware } = require('../../middleware/authorization.middleware');
const { fileuploadMiddleware } = require('../../middleware/fileupload.middleware');
const { terminalValidationMiddleware } = require('../../lib/terminal');

const express = require('express').Router();

express.get('/api/users', authorizationMiddleware, (req, res) => getUsersCtrl(req, res));
express.get('/api/users/img/:user_id', authorizationMiddleware, getUserImgValidation, (req, res) => getUserImgCtrl(req, res));
express.post(
    '/api/users',
    authorizationMiddleware,
    fileuploadMiddleware(UPLOAD_FOLDER, PROFILE_IMAGE_TYPES, PROFILE_IMAGE_SIZE, 'user_img', true),
    createUserValidation,
    terminalValidationMiddleware,
    (req, res) => createUsersCtrl(req, res),
);
express.patch(
    '/api/users/:user_id',
    authorizationMiddleware,
    fileuploadMiddleware(UPLOAD_FOLDER, PROFILE_IMAGE_TYPES, PROFILE_IMAGE_SIZE, 'user_img', false),
    updateUserValidation,
    (req, res) => updateUsersCtrl(req, res),
);
express.delete('/api/users/:user_id', authorizationMiddleware, deleteUserValidation, (req, res) => deleteUserCtrl(req, res));

module.exports = express;
