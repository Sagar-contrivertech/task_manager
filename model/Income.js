const mongoose = require("mongoose")

const Income = mongoose.Schema({
    IncomeName : {
        type : String ,
        required : true
    },
    IncomeRef : {
        type : String ,
        required : true
    },
    IncomeDate : {
        type : String ,
        required : true
    },
    IncomeTotal : {
        type : Boolean ,
        required : true
    },
    IncomeAmount : {
        type : Number,
        required : true
    },
    TotalAmount : {
        type : Number
    }
})


module.exports = mongoose.model("Income", Income)