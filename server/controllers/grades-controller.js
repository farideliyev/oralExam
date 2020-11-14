const knex = require("../db");

exports.add = async (req, res) => {

    const {grdStudentId, grade, grdCrsId, grdExamId} = req.body;
    console.log(req.body)
     // request to grades table
    knex("grades")
        .insert(
            {
                grdCrsId,
                grdExamId,
                grdStudentId,
                grade
            }
        ).then(()=> {
            //request to students table

        let queryBuilder = knex("students").where("id", grdStudentId)
        if (grade) {
            queryBuilder.update({presence: 'YES'})
        } else {
            queryBuilder.update({presence: "NO"})
        }
        return queryBuilder.then(data => console.log("promise from student:", data)).catch(err => console.log(err))
    }).then(response=>{
        res.sendStatus(200)
    })
        .catch(err=>{
        console.log(err)
    })
}