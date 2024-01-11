const express = require('express')
const  {userRegister, userLogin, authController, applyDoctorController, getAllNotificationController, deleteAllNotificationController} = require('../Controller/controllerUser')
const requireAuth = require('../middleware/authMiddleware')
const router = express.Router()

// create register
router.post('/register', userRegister)
// Login
router.post('/login', userLogin)
// Protected Auth required
router.post('/getUserData', requireAuth, authController)
// Apply Doctor
router.post('/apply-doctor', requireAuth, applyDoctorController)
// Notification
router.post('/get-all-notification', requireAuth, getAllNotificationController)
// Delete notification
router.post('/delete-all-notification', requireAuth, deleteAllNotificationController)

module.exports = router