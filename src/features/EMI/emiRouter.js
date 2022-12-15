const express = require("express")
const app = express.Router();
const Emi = require("./emiModel")
const checkAuth = require("../../middleware/authMiddleware")

app.post("/calcemi", checkAuth,async(req,res) => {
    const id = req.userData.userId;
    let { loanamt, intrate ,tenure } = req.body;
    loanamt = Number(loanamt)
    intrate = Number(intrate)
    tenure = Number(tenure)
    let r = intrate/12/100
      let emi = loanamt*r*(1+r)*tenure/(((1+r)*tenure)-1)
      let total = Number(emi)*Number(tenure)
      try{
      let newemi= await Emi.create({user:id, loanamt, intrate, tenure, emi, total})
      return res.status(200).send({message:"Loan application processed successfully", newemi})
    }
    catch(e){
       return res.status(500).send(e.message)
    }
})

module.exports = app;