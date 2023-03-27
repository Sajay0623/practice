const express = require("express")
const noteroute = express.Router()
 const {NoteModel} = require("../model/notes.model")
 const jwt = require("jsonwebtoken")
 const bcrypt = require("bcrypt")

 noteroute.get("/", async (req, res)=>{
       let user = await NoteModel.find()
        res.send(user)
}) 

noteroute.post("/add", async (req, res)=>{
     
    
    let body = req.body
    try{
          let note = new NoteModel(body)
          await note.save()
          res.send({msg:"Note data has been added"})
    }catch(e){
        res.send({msg:e.message})
    }
     
})

noteroute.patch("/", (req, res)=>{
    
})

noteroute.delete("/delete/:id",async (req, res)=>{
      const {id} = req.params
      try{
           await NoteModel.findByIdAndDelete({_id:id})
            res.status(200).send({msg:`User id ${id} has been deleted`})
      }catch(e){
        res.send({msg:e.message})
      }
})
module.exports = {noteroute}