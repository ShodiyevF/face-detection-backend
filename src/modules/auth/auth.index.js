const { loginCtrl } = require('./auth.ctrl')

const express = require('express').Router()

express.post('/api/login', (req, res) => loginCtrl(req, res))

module.exports = express