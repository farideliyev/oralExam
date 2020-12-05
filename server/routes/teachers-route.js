const express = require('express')
const teachersRoutes = require('../controllers/teachers-controllers')
const router = express.Router()

router.post('/login',  teachersRoutes.teachersLogin)
router.post('/logout', teachersRoutes.teacherLogOut)

module.exports = router