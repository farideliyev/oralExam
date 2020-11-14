const knex=require('../db');

exports.examAdd=async (req,res)=>{

   const {examCrsName, examAllSess, examSessDr, examMonth, examStartDate,
       examStartTime, examEndDate, examEndTime, examSlotDuration} =req.body
    knex("exams")
        .insert(
                {
                    examCrsName,
                    examAllSess,
                    examSessDr,
                    examMonth,
                    examStartDate,
                    examStartTime,
                    examEndDate,
                    examEndTime,
                    examSlotDuration
                }
            ).then(examData=>{
                console.log("Successfully added rows are: ", examData)
                res.status(200)
    }).catch(err=>{
        console.log("Smt is wrong", err)
    })

}