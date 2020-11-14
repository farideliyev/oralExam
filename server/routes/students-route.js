const express = require('express');
const studentsRoutes = require('../controllers/students-controller.js')
const router = express.Router();

router.get('/all', studentsRoutes.studentsAll)
router.get('/available', studentsRoutes.studentsAvailable)

module.exports = router