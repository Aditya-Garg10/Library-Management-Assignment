const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const bookRoute = require("./routers/Books");
const transactionRoute = require("./routers/Transactions");
const userRoute = require("./routers/User");
const { default: mongoose } = require("mongoose");
const cors = require("cors")


const app = express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const port = process.env.port


app.use(cors({
    origin: [               
        "http://localhost:5173",                
      ],    
    methods:["GET","POST","DELETE","PUT","PATCH"],
    credentials: true,
}))



const allowedOrigins = [         
    "http://localhost:5173", 
  ];
  
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
      res.header("Access-Control-Allow-Origin", "*");
    }
    res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
  });



app.get("/",async(req,res)=>{      
    res.send("Hello! from server of Library Management")
})



app.use("/api/members",userRoute)
app.use("/api/transactions",transactionRoute)
app.use("/api/books",bookRoute)

app.listen(port,()=>{
console.log(`Server is listening on http://localhost:${port}`);
})
