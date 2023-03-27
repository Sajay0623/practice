const express = require ("express")
const mogoose = require("mongoose")
const {connection} = require("./db")
const {route} = require("./routes/user.route")
 const {auth} = require("./middleware/auth.middleware")
const {noteroute} = require("./routes/note.route")
require("dotenv").config()
const app = express()
app.use(express.json())

app.use("/user" , route)
app.use("/note", auth , noteroute )
app.listen(process.env.port, async()=>{
  try{
    await connection
    console.log("db is connected");
    console.log("port is running in 2000");
  }catch(e){
    console.log(e)
  }
})