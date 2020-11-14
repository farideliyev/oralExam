const express = require('express')
const jwt = require('express-jwt');
const cookieParser=require('cookie-parser')
const studentsRouter = require('./routes/students-route')
const teachersRouter=require('./routes/teachers-route')
const coursesRouter=require('./routes/courses-route')
const examsRouter=require('./routes/exams-route')
const gradesRouter=require('./routes/grades-route')

const jwtSecret = 'secret123';

const PORT = process.env.PORT || 8080
const app = express()
const bcrypt = require('bcrypt');
const saltRounds = 10;
const bodyParser = require('body-parser')
// const yourPassword = "123farid";

// bcrypt.hash(yourPassword, saltRounds, (err, hash) => {
//   // Now we can store the password hash in db.
// });

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cookieParser())


//Route usage
app.use('/api/students', studentsRouter)
app.use('/api/teachers', teachersRouter)
app.use('/api/courses', coursesRouter)
app.use('/api/exams', examsRouter)
app.use('/api/grades', gradesRouter)








//Error handling
app.use(function ( req, res, next) {
  res.status(500).send('Something is broken.')
})

app.use(function (req, res, next) {
  res.status(404).send('Sorry we could not find that.')
})
//Listen
app.listen(PORT, function() {
  console.log(`Server is running on: ${PORT}`)
})