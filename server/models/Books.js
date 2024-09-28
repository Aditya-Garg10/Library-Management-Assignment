const { default: mongoose } = require("mongoose");


let conn = require("../connection")

const BooksSchema = new mongoose.Schema({
    bookName : {
        type : String,
        require : true,
    },
    category:{
        type : String,
        require : true,
    },
    rentPerDay : {
        type : Number,
        require : true,
    },
    available:{
        type : Boolean,
        default : true,
    }
},{timestamps:true})

const Books = mongoose.model("Books",BooksSchema)

module.exports =  {Books} ;
