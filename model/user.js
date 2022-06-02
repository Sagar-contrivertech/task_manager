const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String,
  
  },
  role: {
    type: String,
    default: 'admin'
  },
  Permissions: {
    type: String,
    default: 'read'
  }
  // token: { type: String },
});

module.exports = mongoose.model("User", userSchema)