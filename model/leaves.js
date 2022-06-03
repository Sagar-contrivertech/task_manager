const mongoose = require('mongoose')

const LeaveSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.ObjectId,
        ref: "Employee",
    },
    paidLeaves: {
        type: Number,
        required: true
    },
    unPaidLeaves: {
        type: Number,
        required: true
    },
    sickleave: {
        type: Number
    },
    leaves: {
        type: String
    }

})

module.exports = mongoose.model('Leaves', LeaveSchema)