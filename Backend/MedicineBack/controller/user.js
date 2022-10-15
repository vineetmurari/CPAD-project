const User = require('../models/user')
const { validationResult } = require('express-validator')
const user = require('../models/user')
var jwt = require('jsonwebtoken')
var expressjwt = require('express-jwt')

const sec= "medical"

exports.signup =(req, res)=>{


    const errors = validationResult(req)

    if(!errors.isEmpty()) {
     return res.status(400).json(
        {
            error: errors.array()[0].msg
        }
     )   
   }

    const user = new User(req.body)

    user.save((err, user)=>{
        if(err){
            console.log(err)
            return res.status(400).json(
                {
                    error: "Unable to add user"
                }
            )
        }

        res.json({
            message: "success",
            user
        })
    })

}


exports.signin = (req, res)=>{

    const {email, password} = req.body

    User.findOne({email}, (err, user)=>{
        if(err || !user){
            return res.status(400).json({error: "Email is not found"})
        }
        
        if(!user.authenticate(password)){
            return res.status(400).json({
                error: "Email and password inccorect"
            })
        }


        const token = jwt.sign({_id: user._id}, sec)
        res.cookie('token', token, {expire: new Date() +1})

        const {_id, name, email} = user
        return res.json(
            {
                token,
                user:{
                    _id,
                    name,
                    email
                }
            }
        )

    })
}


exports.signout =(req, res)=>{

    res.clearCookie("token")
    return res.json({
        message: "User Signout success"
    })

}
