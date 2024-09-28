const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const bookRoute = require("./routers/Books");
const transactionRoute = require("./routers/Transactions");
const userRoute = require("./routers/User");
const { default: mongoose } = require("mongoose");


const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const port = process.env.port



app.get("/",async(req,res)=>{      
    res.send("Hello! from server of Library Management")
})



app.use("/api/members",userRoute)
app.use("/api/transactions",transactionRoute)
app.use("/api/books",bookRoute)

app.listen(port,()=>{
console.log(`Server is listening on http://localhost:${port}`);
})
