const knex = require('../db')
const bcrypt = require('bcrypt')

const jsonwebtoken = require('jsonwebtoken')
const jwtSecret = 'secret123'

exports.teachersLogin = async (req, res) => {

    let emailReq = req.body.email
    let passwordReq = req.body.password
    knex
      .where({email:emailReq})
      .select("password", "name", "surname")
      .from('teachers') 
      .then(userData => {
        bcrypt.compare(passwordReq, userData[0].password, function(err, result) {
            if(result){
                console.log(userData[0].password)
                const d=userData[0]
                const fullName= `${d.name} ${d.surname}`
                let expireTime=15*60
                const token = jsonwebtoken.sign({user: {fullName, role: "teacher"}}, jwtSecret, {expiresIn: expireTime})
                res.cookie('token', token, {httpOnly:true, sameSite:true, maxAge: 1000 * expireTime})
                res.end()

            } else{
                res.status(401).send({
                    errors: [{ 'param': 'Server', 'msg': 'Wrong email or password' }] 
                  })
                  res.end()
            }
        })
      })
      .catch(err => {
        // Send a error message in response
        res.status(500).send({message:"Wrong email"})
        res.json({ message: `There was an error retrieving teacher data: ${err}` })
      })
  }


exports.teacherLogOut = async(req, res) => {
    res.clearCookie("token").end()
}