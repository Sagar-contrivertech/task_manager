const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://Contrivertech:CT123@contrivertech.rafja54.mongodb.net/?retryWrites=true&w=majority",{
        useNewUrlParser : true
    }
  )
  .then(() => {
    console.log("MongoDB Is Connected");
  })
  .catch((errr) => {
    console.log("MongoDB Is Not Connected",errr);
  });

module.exports = mongoose;
