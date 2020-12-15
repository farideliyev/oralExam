const knex = require('../db')
const jsonwebtoken = require('jsonwebtoken')
const jwtSecret = 'secret123'

exports.studentsAll = async (req, res) => {
    // Get all books from database
    knex
      .select('student_id', 'name', 'surname', 'grade', "presence", "time")// select all records
      .from('students') // from 'students' table
        .leftJoin("grades", "id", "grdStudentId")
        .orderBy(["surname"])

      .then(userData => {

        // Send students extracted from database in response
        res.json(userData)
      })
      .catch(err => {
        // Send a error message in response
        res.json({ message: `There was an error retrieving students: ${err}` })
      })
  }

exports.studentsAvailable = async (req, res) => {
    // Get all students from database
    knex
        .select('*') // select all records
        .from('students') // from 'students' table
        .where("presence","NOT YET")
        .orderBy("surname")
        .then(userData => {
            // Send students extracted from database in response
            res.json(userData)
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving students: ${err}` })
        })
}



exports.login = async (req, res) => {
    // login for student
    let studentId=req.body.id

    console.log(studentId)

    knex
        .select(studentId, "name", "surname") // select all records
        .from('students') // from 'students' table
        .where("student_id", studentId)
        .then(studentData => {
           if(studentData[0]){
               let d=studentData[0]
               let student=`${d.name} ${d.surname}`
               let expireTime=15*60
               let token=jsonwebtoken.sign({user:{id:studentId ,role:"student" , fullName:student}}, jwtSecret, {expiresIn: expireTime})
               res.cookie('token', token, {httpOnly:true, sameSite:true, maxAge: 1000 * expireTime})
               res.end()
           }
            else{
               res.status(401).send({
                   errors: [{ 'param': 'Server', 'msg': 'Wrong student_id' }]
               })

           }
        })
        .catch(err => {
            // Send a error message in response

            res.json({ message: `There was an error retrieving students: ${err}` })

        })
}

exports.logOut = async(req, res) => {
    res.clearCookie("token").end()
}