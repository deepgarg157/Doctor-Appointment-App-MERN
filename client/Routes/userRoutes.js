const express = require('express')
const  {userRegister, userLogin, authController} = require('../Controller/controllerUser')
const requireAuth = require('../middleware/authMiddleware')
const router = express.Router()

// create register
router.post('/register', userRegister)
router.post('/login', userLogin)
router.post('/getUserData', requireAuth, authController)

module.exports = router