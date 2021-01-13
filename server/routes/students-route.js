const express = require('express')
const studentsRoutes = require('../controllers/students-controller.js')
const router = express.Router()
const jwt = require('jsonwebtoken')
const jwtSecret = 'secret123'


router.get('/all',  studentsRoutes.studentsAll)
router.get('/available', studentsRoutes.studentsAvailable)
router.post('/login', studentsRoutes.login)
router.get('/logout', studentsRoutes.logOut)
router.get('/availableDates', studentsRoutes.availableDates)
router.post('/addDatetime', studentsRoutes.addDatetime)

// function verifyToken(req, res, next) {
//     try{
//
//         let decoded=jwt.verify(req.cookies.token, jwtSecret)
//         console.log(req.headers.cookie)
//         console.log(decoded)
//         next()
//     } catch (err){
//         console.log(req.cookies)
//          res.status(401).json({
//             message: "Auth Failed"
//         })
//     }
// }

module.exports = router