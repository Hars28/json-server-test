const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const userRouter = require("./src/features/user/userRouter")
const emiRouter = require("./src/features/EMI/emiRouter")
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended:true}))
app.use(cors())


app.use("/user",userRouter)
app.use("/emi", emiRouter)

mongoose.connect("mongodb://localhost:27017/mock-10").then(()=>{
    app.listen(8080, () => {
        console.log("Server started")
    })
})
