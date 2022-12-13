const mongoose = require("mongoose")

const emiSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
      },
    loanamt:{
        type: Number
    },
    intrate:{type:Number},
    tenure:{type:Number},
    emi:{type:Number},
    total:{type:Number},

})

const Emi = mongoose.model("emi",emiSchema)
module.exports = Emi;
