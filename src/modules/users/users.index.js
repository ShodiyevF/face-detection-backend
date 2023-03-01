const { authorizationMiddleware } = require('../../middleware/authorization.middleware')
const { getUsersCtrl } = require('./users.ctrl')

const express = require('express').Router()

express.get('/api/users', authorizationMiddleware, (req, res) => getUsersCtrl(req, res))

module.exports = express