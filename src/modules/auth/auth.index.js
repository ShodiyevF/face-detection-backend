const { authLoginValidation } = require('../../validation/auth.validation')
const { loginCtrl } = require('./auth.ctrl')
const express = require('express').Router()


express.post('/api/login', authLoginValidation, (req, res) => loginCtrl(req, res))

module.exports = express