const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullName : {
        type : String,
        require : true,
    },
    email:{
        type : String,
        require : true,
    },
    contactNo : {
        type : Number,
        require : true,
    }
},{timestamps:true})

const User = mongoose.model("Users",UserSchema)

module.exports = User;