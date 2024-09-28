const { default: mongoose } = require("mongoose");


let conn = require("../connection")



const transactionSchema = new mongoose.Schema({
    bookName : {
        type : String,
        require : true,
    },
    userName : {
        type : String,
        require : true,
    },
    issueDate : {
        type : String,
        required : true,
    },
    returnDate:{
        type: String,
        
    },   
    totalRent : {
        type: Number,

    }
},{timestamps:true})

const Transactions = conn.Transactions.model("Transactions",transactionSchema)

module.exports = Transactions