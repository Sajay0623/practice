

 const jwt = require("jsonwebtoken")

const auth = (req, res, next)=>{
    const token = req.headers.auth
    if(token) {
        const decoded = jwt.verify(token, "masai")
        req.body.userID = decoded.userID
        if(decoded){
            next()
        }else{
            res.send({msg: "Please Login First"})
        }
    }else{
        res.send({msg: "Please Login First"})
    }
}

module.exports = {auth}