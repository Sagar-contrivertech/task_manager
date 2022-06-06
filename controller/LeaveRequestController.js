const mongoose = require("mongoose")
const LeaveRequest = require("../model/LeaveRequest")
const Leaves = require("../model/leaves")

exports.ApplyForLeave = async (req, res) => {
    try {
        const { LeaveId , LeaveDesc , LeaveCount , LeaveApproval } = req.body;

        const LRequest = await LeaveRequest.create({
            LeaveId : LeaveId , LeaveDesc : LeaveDesc , LeaveCount : LeaveCount , LeaveApproval : LeaveApproval 
        }) 

        if (!LRequest) {
            res.status(400).json({message : "Applying for leave is not possible in try"})
        }
        
        if (LRequest) {
            res.status(400).json({message : "Applying for leave is possible " , LRequest})
        }

    } catch (error) {
        res.status(400).json({message : "Applying for leave is not possible"})
    }
}


exports.GetAllLeaveRequet = async (req, res) => {
    try {
        // const { LeaveId , LeaveDesc , LeaveCount , LeaveApproval } = req.body;

        const LRequest = await LeaveRequest.find();

        if (!LRequest) {
            res.status(400).json({message : "Applying for leave is not possible in try"})
        }
        
        if (LRequest) {
            res.status(400).json({message : "Applying for leave is possible " , LRequest})
        }

    } catch (error) {
        res.status(400).json({message : "Applying for leave is not possible"})
    }
}


exports.UpdateLeaveRequet = async (req, res) => {
    try {
        const { LeaveId , LeaveDesc , LeaveCount , LeaveApproval } = req.body;
        const findLeaveid = await Leaves.findById(LeaveId);

        if (!findLeaveid) {
            res.status(400).json({message : "Thsi leave id Is Not FOund For This Update Leave request and update leave"});
            return
        }
        console.log(findLeaveid)
/// thsi code is not woring 
        if (LeaveApproval) {
            
            let total = findLeaveid.paidLeaves;
            let subtotal;
            if (total > 4) {
                subtotal = findLeaveid.paidLeaves - 4;
                findLeaveid.unPaidLeaves = findLeaveid.unPaidLeaves - subtotal;
            }else{
                subtotal = 0;
            }
            
            if (findLeaveid) {

                const UpdateId = await Leaves.findByIdAndUpdate(finduserid._id , {
                    name : name,
                    paidLeaves :  total,
                    unPaidLeaves : subtotal,
                    sickleave : UpdateId.sickleave
                } , {new : true})
                console.log(UpdateId)
                if (!UpdateId) {
                    res.status(400).json({message : "Leave cannot updated at 2 stage"})
                    return
                }
                
                if (UpdateId) {
                    res.status(200).json({message : "Leave is updated " , UpdateId})
                    return
                }
                return
            }
        }
        /// thsi code is not woring 
        // const LRequest = await LeaveRequest.find();

        // if (!LRequest) {
        //     res.status(400).json({message : "Applying for leave is not possible in try"})
        // }
        
        // if (LRequest) {
        //     res.status(400).json({message : "Applying for leave is possible " , LRequest})
        // }

    } catch (error) {
        res.status(400).json({message : "Applying for leave is not possible"})
    }
}