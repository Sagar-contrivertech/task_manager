const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/project").then(() => {
    console.log("MongoDB Is Connected")
}).catch(() => {
    console.log("MongoDB Is Not Connected")
})

module.exports = mongoose