const express=require("express");
const gradesRoutes=require("../controllers/grades-controller");

const router=express.Router();

router.post("/add", gradesRoutes.add);

module.exports=router
