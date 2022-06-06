const mongoose = require("mongoose")

const LeaveRequest = mongoose.Schema({
    LeaveId : {
        type : mongoose.Schema.ObjectId,
        ref : "Leaves",
        required : true
    },
    LeaveDesc : {
        type : String,
        required : true
    },
    LeaveCount : {
        paidLeaves : {
            type : Number
        },
        unpaidLeaves : {
            type : Number
        },
        sickLeaves : {
            type : Number
        }
    },
    LeaveApproval : {
        type : Boolean,
        default : false
    }
})
// LeaveId , LeaveDesc , LeaveCount , LeaveApproval

module.exports = mongoose.model("LeaveRequest" , LeaveRequest)