const express = require("express")
const route = express.Router()
const {UserModel} = require("../model/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

route.post("/register", async (req, res)=>{
    const {email, pass, name, gender } = req.body
    try{
       const user = await UserModel.findOne({email:email})
       if(user){

            res.status(400).send({msg:"User is already registed"})
       }else{
            
        bcrypt.hash(pass, 5, async (err, hash)=>{
            const user = new UserModel({email, pass:hash , name, gender})
               await user.save()
             res.status(200).send({msg: "User successfully registerd"})
         })
         
       }
     
    }catch(e){
        res.status(400).send({msg:e.message})
    }
    
})

route.post("/login", async (req, res)=>{
    const {email, pass} = req.body
    try{
     const user = await UserModel.findOne({email})
     if(user){
        bcrypt.compare(pass , user.pass , (err, result)=>{
            if(result){
                res.send({msg:"Login has been done" , "token" : jwt.sign({userID:user._id} , "masai") })
            }
        })
     }
    }catch(e){
        res.send({msg:e.message})
    }
})

route.get("/details",  (req, res)=>{
     let token = req.headers.auth
     jwt.verify(token, "masai" ,async (err, decoded)=>{
        if(decoded){
            const user = await UserModel.find()
            res.send(user)
        }
     })
})

module.exports = {route}