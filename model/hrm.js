const mongoose = require('mongoose')

const hrm = new mongoose.Schema({
    name : {
        type : mongoose.Schema.ObjectId,
        ref : "User",
        required : true
    },
    salaryOfMOnth:{
        type : String,
    },
    hoildays: {
        paidLeaves: {
            type : Number,
        },
        unPaidLeaves : {
            type : Number,
        }
    },
    monthWorked : {
        type : String,
    },
    workedDays : {
        type : Number,
    },
    halfDays : {
        type : Number,
    }
})

module.exports = mongoose.model("HRM", hrm)