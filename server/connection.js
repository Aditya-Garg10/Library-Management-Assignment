
const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URL).then(con=>{
    console.log("MongoDB Connected")
})
.catch(error=>{
    console.log(error.message);
})

mongoose.Transactions = mongoose.createConnection(process.env.MONGO_URL_TRANSACTIONS)   


module.exports = mongoose;
