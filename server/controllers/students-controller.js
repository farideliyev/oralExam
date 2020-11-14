const knex = require('../db')

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