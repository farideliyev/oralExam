const express = require('express')
const jwt = require('express-jwt');
const jsonwebtoken=require("jsonwebtoken")

const cookieParser=require('cookie-parser')
const studentsRouter = require('./routes/students-route')
const teachersRouter=require('./routes/teachers-route')
const coursesRouter=require('./routes/courses-route')
const examsRouter=require('./routes/exams-route')
const gradesRouter=require('./routes/grades-route')


const jwtSecret = 'secret123';

const PORT = process.env.PORT || 8080
const app = express()
const bodyParser = require('body-parser')

// const yourPassword = "123farid";

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cookieParser())

app.use('/api/students', studentsRouter)
//admin route for student
app.get('/api/students/admin', (req,res)=>{
    let decoded=jsonwebtoken.verify(req.cookies.token, jwtSecret)
    let {id, fullName}=decoded.user

    res.json({studentData:{id:id, fullName: fullName}})

})
app.use('/api/teachers', teachersRouter)

//declaring express-jwt middleware
app.use(
    jwt({
    secret:jwtSecret,
    algorithms: ['HS256'],
    getToken: (req)=>req.cookies.token,

  })
)


//middleware function for role checking
 async function verifyRole(req, res, next) {
        let decoded= await jsonwebtoken.verify(req.cookies.token, jwtSecret)
        try{
            if(decoded.user.role==="teacher") {
                console.log(decoded.user.role)
                next()
            }
            else if(decoded.user.role==="student"){
                throw new Error("You are not teacher!!!")

            }
        }
        catch (err){
            res.status(403).json(err.message)
        }

}

//Route usage


app.get('/api/admin', verifyRole, function (req,res){

    res.json(req.user.user.fullName)
    res.end()
} )
app.use('/api/courses', coursesRouter)
app.use('/api/exams', examsRouter)
app.use('/api/grades', gradesRouter)




//Error handling
app.use(function ( req, res, next) {
  res.status(500).send('Something is broken.')
})

app.use(function (err, req, res, next) {
  if(err.name==="UnauthorizedError"){
    res.status(401).send('Invalid token')
  }
})



app.use(function (req, res, next) {
  res.status(404).send('Sorry we could not find that.')
})
//Listen
app.listen(PORT, function() {
  console.log(`Server is running on: ${PORT}`)
})