const express = require('express')
const router = express.Router()
const todos = require('./modules/todos')
const home = require('./modules/home')
const auth = require('./modules/auth')
const users = require('./modules/users.js')
const { authenticator } = require('../middleware/auth') // 掛載 middleware

router.use('/users', users)
router.use('/auth', auth)
router.use('/todos', authenticator, todos)
router.use('/', authenticator, home)

module.exports = router
