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

exports.availableDates = async (req, res) => {
    // query to exams
    knex
        .select("examStartDate", "examEndDate", "examStartTime", "examEndTime")
        .from("exams")
        .where("examCrsName", "Web Applications")
        .then((examData) => {
            let startTime=examData[0].examStartTime.split(" ")[1]
            let date={
                startDate:examData[0].examStartDate,
                endDate:examData[0].examEndDate,
                startTime,
                endTime:examData[0].examEndTime
            }
            res.json(date)
            //query to students_time
            knex
                .select("time")
                .from("students")
                .whereNotNull("time")
                .then((studentData)=>{
                    console.log(studentData)
                }).catch(err=>{

            })
        }).catch(err => {

    })
}

exports.login = async (req, res) => {
    // login for student
    let studentId=req.body.id
    knex
        .select("student_id", "name", "surname", "time", "presence", "grade")
        .from('students') // from 'students' table
        .leftJoin("grades", "id", "grdStudentId" )
        .where("student_id", studentId)

        .then(studentData => {

            if (studentData[0]) {
                let d = studentData[0]

               let student=`${d.name} ${d.surname}`
               let time=d.time
               let presence=d.presence
               let grade=d.grade
               let expireTime=15*60
               let token = jsonwebtoken.sign(
                   {
                       user:
                           {id: studentId, role: "student", fullName: student,
                               time, presence, grade
                           }
                   },
                   jwtSecret, {expiresIn: expireTime}
               )
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