const express = require('express')
const UserRouter = express.Router()

const { LoginUser, RegisterUser, UserInfo } = require('../controllers/userController')

UserRouter.post('/registerUser', RegisterUser)
UserRouter.post('/loginUser', LoginUser)
UserRouter.post('/userInfo', UserInfo)

module.exports = UserRouter