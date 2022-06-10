const mongoose = require('mongoose')

const hrm = new mongoose.Schema({
    name : {
        type : mongoose.Schema.ObjectId,
        ref : "User",
        required : true
    },
    LeaveRequest : {
        type : mongoose.Schema.ObjectId,
        ref : "LeaveRequest", 
        required : true
    },
    salaryOfMOnth:{
        type : String,
    },
    salary : {
        type : Number
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