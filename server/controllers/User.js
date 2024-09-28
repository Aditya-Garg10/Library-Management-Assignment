const User = require("../models/User")

const getAllUser = async(req,res) =>{
    try {
        const response = await User.find({});
        res.json(response).status(200)
    } catch (error) {
        console.log(error)
        res.send(error.message).status(500)
    }
}

module.exports = {getAllUser}