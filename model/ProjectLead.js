const mongoose = require("mongoose");

const ProjectLead = mongoose.Schema({
    ProjectName : {
        type : String,
        required: true
    },
    LeadName : {
        type : String,
        required : true
    },
    Budget : {
        type : Number,
        required : true
    },
    ProposalSend : {
        type : Boolean,
        required : true
    },
    LeadFrom : {
        type : String,
        required : true
    },
    DatePSend : {
        type : String,
    },
    LeadDate : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model("ProjectLead" , ProjectLead)