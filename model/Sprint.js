const mongoose = require("mongoose")

const Sprint = mongoose.Schema({
    User : {
        type : mongoose.Schema.ObjectId,
        ref : "User",
        required : true
    },
    Project : {
        type : mongoose.Schema.ObjectId,
        ref : "ProjectLead",
        required : true
    },
    StartDate : {
        type : String,
        require : true
    },
    EndDate : {
        type : String,
        require : true
    }
})

module.exports = mongoose.model("Sprint" , Sprint)