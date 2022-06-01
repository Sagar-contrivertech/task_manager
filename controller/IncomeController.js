const mongoose = require("mongoose")
const express = require("express")
const Income = require("../model/Income")

exports.RegisterIncome = async (req, res) => {
    try {
        const {IncomeName , IncomeRef , IncomeDate , IncomeTotal , IncomeAmount , TotalAmount} = req.body;

        
        const Incomes = await Income.create({
            IncomeName : IncomeName , IncomeRef : IncomeRef , IncomeDate : IncomeDate , IncomeTotal : IncomeTotal , 
            IncomeAmount : IncomeAmount 
        })

        if (!Incomes) {
            res.status(400).json({error : "OOps Income Is Not Registered in try"})
            return
        }
        
        // const Incomefind = await Income.find();
        // console.log(Incomefind)

        // if (Incomes) {

        //     res.status(200).json({error : "Congratulation Income Is Created " , Incomes})
        //     return
        // }

    } catch (error) {
        res.status(400).json({error : "OOps Income Is Not Registered"})
    }
}

exports.GetAllIncome = async (req, res) => {
    try {
        const {IncomeName , IncomeRef , IncomeDate , IncomeTotal , IncomeAmount} = req.body;

        const Incomes = await Income.find()

        if (!Incomes) {
            res.status(400).json({error : "OOps Income Is Not Found in try"})
            return
        }
        
        if (Incomes) {
            res.status(200).json({error : "Congratulation All Income Is Found " , Incomes})
            return
        }

    } catch (error) {
        res.status(400).json({error : "OOps Income Not Found Catch"})
    }
}

exports.UpdateIncomeById = async (req, res) => {
    try {
        const {IncomeName , IncomeRef , IncomeDate , IncomeTotal , IncomeAmount} = req.body;

        const IncomesId = await Income.findById(req.params.id)

        if (!IncomesId) {
            res.status(400).json({error : "OOps Income Is Not Found  in try By Id for Update"})
            return
        }
        
        if (IncomesId) {

            const Incomes = await Income.findByIdAndUpdate(req.params.id , {
                IncomeName : IncomeName , IncomeRef : IncomeRef , IncomeDate : IncomeDate , IncomeTotal : IncomeTotal , IncomeAmount : IncomeAmount
            }, {new : true})

            if (!Incomes) {
                res.status(400).json({error : " All Income Is Found By Id for Update " })
                return
            }

            if (Incomes) {   
                res.status(200).json({Message : "Congratulation All Income Is Found By Id for Update " , Incomes})
                return
            }
        }

    } catch (error) {
        res.status(400).json({error : "OOps Income Not Found Catch By Id for Update"})
    }
}



exports.DeleteIncomeById = async (req, res) => {
    try {
        const {IncomeName , IncomeRef , IncomeDate , IncomeTotal , IncomeAmount} = req.body;

        const IncomesId = await Income.findById(req.params.id)

        if (!IncomesId) {
            res.status(400).json({error : "OOps Income Is Not Found  in try By Id for Delete"})
            return
        }
        
        if (IncomesId) {

            const Incomes = await Income.findByIdAndDelete(req.params.id)

            if (!Incomes) {
                res.status(400).json({error : " All Income Is Found By Id for Delete " })
                return
            }

            if (Incomes) {   
                res.status(200).json({Message : "Congratulation All Income Is Found By Id for Delete " , Incomes})
                return
            }
            
        }

    } catch (error) {
        res.status(400).json({error : "OOps Income Not Found Catch By Id for Update"})
    }
}