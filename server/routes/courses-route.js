const express=require("express");
const coursesRoutes=require('../controllers/courses-controller.js');
const router = express.Router();

router.get('/all', coursesRoutes.coursesAll)

module.exports = router