const knex = require('../db')

exports.coursesAll = async (req, res) => {
    // Get all courses from database
    knex
        .select('*') // select all records
        .from('courses') // from 'courses' table
        .then(userData => {
            // Send books extracted from database in response
            res.json(userData)
        })
        .catch(err => {
            // Send a error message in response
            res.json({ message: `There was an error retrieving courses: ${err}` })
        })
}