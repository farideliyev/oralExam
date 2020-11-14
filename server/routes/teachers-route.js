const express = require('express');
const teachersRoutes = require('../controllers/teachers-controllers')
const router = express.Router();

router.post('/login', teachersRoutes.teachersLogin)

module.exports = router