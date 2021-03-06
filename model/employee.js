const mongoose = require("mongoose");

const employeeModel = new mongoose.Schema({
  employeeName: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  joiningDate: {
    type: Date,
    default: new Date(),
    required: true,
  },
  lastDate: {
    type: Date,
  },
  documents: {
    type: String,
  },
  //lisit of holidays
  hoildays: {
    paidLeaves: {
      type: Number,
      
    },
    unPaidLeaves: {
      type: Number,
      
    },
    sickleave: {
      type : Number
    },
  }
});

module.exports = mongoose.model("Employee", employeeModel);
