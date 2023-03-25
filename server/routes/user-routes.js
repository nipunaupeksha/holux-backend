const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')

router.post('/sign-up', userController.signup)
router.post('/sign-in', userController.signin)
router.post('/forget-password', userController.forgetPassword)
router.post('/forget-password/token', userController.tokenValidation)
router.post('/forget-password/change-password', userController.changePassword)

module.exports = router
