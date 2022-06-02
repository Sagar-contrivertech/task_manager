const express = require("express")
const ExpenseTrack = require("../model/Expence")
const IncomeModal = require('../model/Income')

exports.RegisterExpense = async (req, res) => {
    try {
        const { ExpenseName , ExpenseDate , ExpenseBy , EntryDate , Amount ,typeofExp} = req.body;
        let TotalIncome = 0;
        const Expenses = await ExpenseTrack.create({
            ExpenseName : ExpenseName , ExpenseDate : ExpenseDate , ExpenseBy : ExpenseBy , EntryDate : EntryDate ,
             Amount : Amount,typeofExp
        });


        if (!Expenses) {
            res.status(400).json({error : 'Expense Is Not Added In Database try'})
            return
        }
        
        if (Expenses) {
            // calling income controller
            const Income = await IncomeModal.find();
            console.log(Income)
            TotalIncome = Income[Income.length-1].TotalAmount;
            console.log(TotalIncome)

            TotalIncome -= req.body.Amount;
            console.log(TotalIncome)
            const updateincome = await IncomeModal.updateMany({} , {$set : {TotalAmount : TotalIncome}});

            if (!updateincome) {
                res.status(400).json({message : "Yes income modal is updated"})
            }
            await Expenses.save()

            res.status(400).json({Message : 'Expense Is Added ' , Expenses})
            return
        }


    } catch (error) {
        console.log(error)
        res.status(400).json({error : 'Expense Is Not Added In Database Catch'})
    }
}

exports.GetAllExpense = async (req, res) => {
    try {

        const Expenses = await ExpenseTrack.find()
        
        if (!Expenses) {
            res.status(400).json({error : 'OOps ! Expense Is NOT Getting In try'})
            return
        }

        if (Expenses) {
            res.status(200).json({message : 'Congratulation All Expenses Is Found ' , Expenses})
            return
        }
    } catch (error) {
        res.status(400).json({error : 'OOps ! Expense Is Not Get'})
    }
}

exports.UpdateById = async (req, res) => {
    try {
        const { ExpenseName , ExpenseDate , ExpenseBy , EntryDate , Amount } = req.body;

        const ExpenseId = await ExpenseTrack.findById(req.params.id)

        if (!ExpenseId) {
            res.status(400).json({error : 'OOps ! Expense Is Not found'})
            return
        }

        if (ExpenseId) {
            const Expenses = await ExpenseTrack.findByIdAndUpdate(req.params.id , {
                ExpenseName : ExpenseName , ExpenseDate : ExpenseDate , ExpenseBy : ExpenseBy , EntryDate : EntryDate ,
                 Amount : Amount
            }, {new : true})    

            if (!Expenses) {
                res.status(400).json({error : 'OOps ! Expense Is Not Updated By Id In Try'})
                return
            }

            if (Expenses) {
                res.status(200).json({message : 'Congratulation ! Expense Is  Updated By Id' , Expenses})
                return
            }

        }

    } catch (error) {
        res.status(400).json({error : 'OOps ! Expense Is Not Updated By Id In catch'})
    }
}


exports.DeleteById = async (req, res) => {
    try {
        const { ExpenseName , ExpenseDate , ExpenseBy , EntryDate , Amount } = req.body;

        const ExpenseId = await ExpenseTrack.findById(req.params.id)

        if (!ExpenseId) {
            res.status(400).json({error : 'OOps ! Expense Is Not found'})
            return
        }

        if (ExpenseId) {
            const Expenses = await ExpenseTrack.findByIdAndDelete(req.params.id)    

            if (!Expenses) {
                res.status(400).json({error : 'OOps ! Expense Is Not Deleted By Id In Try'})
                return
            }

            if (Expenses) {
                res.status(200).json({message : 'Congratulation ! Expense Is  Deleted By Id' , Expenses})
                return
            }

        }

    } catch (error) {
        res.status(400).json({error : 'OOps ! Expense Is Not Updated By Id In catch'})
    }
}