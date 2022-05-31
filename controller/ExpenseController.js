const express = require("express")
const ExpenseTrack = require("../model/Expence")

exports.RegisterExpense = async (req, res) => {
    try {
        const { ExpenseName , ExpenseDate , ExpenseBy , EntryDate , Amount } = req.body;

        const Expenses = await ExpenseTrack.create({
            ExpenseName : ExpenseName , ExpenseDate : ExpenseDate , ExpenseBy : ExpenseBy , EntryDate : EntryDate ,
             Amount : Amount
        });

        if (!Expenses) {
            res.status(400).json({error : 'Expense Is Not Added In Database try'})
            return
        }
        
        if (Expenses) {
            await Expenses.save()
            res.status(400).json({Message : 'Expense Is Added ' , Expenses})
            return
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({error : 'Expense Is Not Added In Database Catch'})
    }
}