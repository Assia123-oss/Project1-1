const express = require('express')
const {  SignUp,findUsers,findUser,Update,Delete,Login} = require('../Controllers/userController')
const router = express.Router()


router.post('/api',SignUp)
router.get('/allUsers',findUsers)
router.get('/User',findUser)
router.post('/update',Update)
router.post('/delete',Delete)
router.post('/login',Login)


module.exports = router
