const mongoose = require('mongoose')

const hrm = new mongoose.Schema({
    name : {
        type : mongoose.Schema.ObjectId,
        ref : "Employee",
        required : true
    },
    salaryOfMOnth:{
        type : String,
        required : true
    },
    hoildays: {
        paidLeaves: {
            type : Number,
            required : true
        },
        unPaidLeaves : {
            type : Number,
            required : true
        }
    },
    monthWorked : {
        type : String,
        required : true,
    },
    workedDays : {
        type : Number,
        required : true
    },
    halfDays : {
        type : Number,
        required : true
    }
})

module.exports = mongoose.model("HRM", hrm)