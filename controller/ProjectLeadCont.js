const express = require("express")
// const res = require("express/lib/response")
const mongoose = require("mongoose")
const ProjectLead = require("../model/ProjectLead")

exports.RegisterProject = async (req , res) => {
    try {
        const {User , ProjectName , LeadName , Budget , status,ProposalSend , LeadFrom , DatePSend , LeadDate } = req.body

        const Project = await ProjectLead.create({
            User : User , ProjectName : ProjectName , LeadName : LeadName , Budget : Budget , ProposalSend : ProposalSend , LeadFrom : LeadFrom , DatePSend : DatePSend , LeadDate : LeadDate 
            ,status:status
        })

        if (!Project) {
            res.status(400).json({message : "Project Registered is Failled "})
            return;
        }

        if (Project) {
            await Project.save()
            res.status(200).json({message : "Congratulation , ProjectLead Is Created." , Project})
            return;
        }

    } catch (error) {
        res.status(400).json({message : "OOPS !! Project Registered is Failled "})
    }
}

exports.GetAllProjectLead = async (req , res) => {
    try {
        const Project = await ProjectLead.find();
        
        if (!Project) {
            res.status(400).json({message : "Failled To Get Projects"})
            return;
        }

        if (Project) {
            res.status(200).json({message : "Congratulation , You Got The All Projectlead " , Project})
            return;
        }

    } catch (error) {
        res.json({message : "OOPS !! Failled To Get All The ProectLead "})
    }
}

exports.Updateproject = async (req , res) => {
    try {

        const {User , ProjectName , LeadName , Budget , ProposalSend , LeadFrom , DatePSend , LeadDate } = req.body

        const ProjectId = await ProjectLead.findById(req.params.id);
        console.log(ProjectId);
        if (!ProjectId) {
            res.status(400).json({message : "This Id Is Not In The Database"})
        }

        if (ProjectId) {
            const Project = await ProjectLead.findByIdAndUpdate(req.params.id , {
                User : User ,ProjectName : ProjectName , LeadName : LeadName , Budget : Budget , ProposalSend : ProposalSend , LeadFrom : LeadFrom , DatePSend : DatePSend , LeadDate : LeadDate
            }, {new : true})

            if (!Project) {
                res.status(400).json({message : "This is Not Updating By Id"}) 
                return
            }
            
            if (Project){
                res.status(200).json({message : "Congratulation Record is Updated" , Project}) 
                return
            }
        }

    } catch (error) {
        res.json({message : "OOPS !! Failled To Update The ProectLead "})
    }
}

exports.DeleteProductLead = async (req, res) => {
    try {
        const ProductId = await ProjectLead.findById(req.params.id)

        if (!ProductId) {
            res.status(400).json({message : "OOPS !! Id Failled To Get For Delete The ProectLead "});
        }

        if (ProductId) {
            const Product = await ProjectLead.findByIdAndDelete(req.params.id);

            if (!Product) {
                res.status(400).json({message : "Product Lead is Not find for productid"})
                return;
            }
            
            if (Product) {
                res.status(200).json({message : "Congratulation , Product lead is deleted " , Product})
                return;
            }

        }
    } catch (error) {
        res.json({message : "OOPS !! Failled To Delete The ProectLead "})
    }
}