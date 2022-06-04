const mongoose = require("mongoose");

const status = new mongoose.Schema({
  userName: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    // required: true,
  },
  EmployeeName : {
    type: mongoose.Schema.ObjectId,
    ref: "Employee",
    // required: true,
  },
  monthOfWork: {
    type: String,
  },
  clockIn: {
    type: Date,
  },
  clockOut: {
    type: Date,
  },
  halfDays: {
    type: Number,
  },
  regularizations: {
    type: Array,
  },
  totalHours: {
    type: String,
  },
  holidays: {
    type: Number,
  },
},{
  timestamps: true
});

module.exports = mongoose.model("Status", status);
