const mongoose = require("mongoose")

const Expense = mongoose.Schema({
    ExpenseName: {
        type: String,
        required: true
    },
    ExpenseDate: {
        type: String,
        required: true
    },
    ExpenseBy: {
        type: String,
        required: true
    },
    EntryDate: {
        type: String,
        required: true
    },
    Amount: {
        type: Number,
        required: true
    },
    typeofExp: {
        type: String
    }
})

module.exports = mongoose.model("Expenses", Expense)