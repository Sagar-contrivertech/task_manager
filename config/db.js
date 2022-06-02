const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://contrivertech:info123@cluster0.neduui0.mongodb.net/?retryWrites=true&w=majority").then(() => {
    console.log("MongoDB Is Connected");
  }).catch((errr) => {
    console.log("MongoDB Is Not Connected",errr);
  });

   // "mongodb+srv://Contrivertech:CT123@contrivertech.rafja54.mongodb.net/?retryWrites=true&w=majority",{
        // useNewUrlParser : true

module.exports = mongoose;
