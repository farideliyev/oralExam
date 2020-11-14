const express= require('express');
const examsRoutes=require("../controllers/exams-controllers");
const router=express.Router();

router.post('/add', examsRoutes.examAdd);
module.exports=router