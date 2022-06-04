const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        // required: true,
    },
    EmployeeName: {
        type: mongoose.Schema.ObjectId,
        ref: "Employee",
        // required: true,
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    status: {
        type: String
    },
    tag: {
        type: String
    },
    sprint: {
        type: mongoose.Schema.ObjectId,
        ref: "Sprint"
    }

})

module.exports = mongoose.model('Task', TaskSchema)