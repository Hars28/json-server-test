const express = require("express")
const jwt = require("jsonwebtoken")
const User = require("./userModel")
const app = express.Router();
const axios  = require("axios")
const checkAuth = require("../../middleware/authMiddleware")

app.post("/register", async(req,res) => {
    let { email, name ,password } = req.body;
    try{
        let isPresent=await User.findOne({email});
        if(isPresent){
            res.status(401).send("User already exists")
        }
        
        let newUser= await User.create({email, name, password})
        
        res.send("User created succesfully",newUser)
    }
    catch(e){
        res.status(500).send(e.message)
    }
})

app.get("/profile",checkAuth, async(req,res)=>{
    const id = req.userData.userId;
    try{
        let currUser = await User.findById(id)
        res.send(currUser)
    }
    catch(e){
        res.status(500).send("Unauthorised")
    }
})

app.post("/login",async(req,res)=>{
    let { email,password }=req.body;

    try{
        let user=await User.findOne({email,password});
        if(!user){
            res.status(404).send("Authentication failed")
        }

        const token = jwt.sign({ id: user._id, name: user.name, email: user.email},
            "SECRET123",
            {
                expiresIn: "1 hour"
            }
        )
       
                
        res.send({message: "Login Succesfull", token})
    }
    catch(e){
        res.status(500).send(e.message)
    }
})



module.exports = app;