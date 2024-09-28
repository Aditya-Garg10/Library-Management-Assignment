const { Books } = require("../models/Books");



const getBookByName = async(req,res) =>{
    try {
        const {bookName} = req.body;

        
        const response = await Books.find({
            bookName: {$regex: bookName,
                $options : "i"
            }
        });
        console.log(response);
        res.send(response)
    } catch (error) {
        
    }
}


const getBooksPriceRange = async(req,res) =>{
    try {
        const {minRent,maxRent} = req.body;
        
        const response = await Books.find({
            rentPerDay: {$gte: minRent,
                $lte : maxRent
            }
        });
        console.log(response);
        res.send(response)
    } catch (error) {
        
    }
}


const getbooksByNamePriceCategory = async(req,res) =>{   
    try {
        const {minRent,maxRent,bookName,category} = req.body;        
        const response = await Books.find({
            rentPerDay: {$gte: minRent,
                $lte : maxRent
            },
            bookName: {$regex: bookName,
                $options : "i"
            },
            category: {$regex: category,
                $options : "i"
            }
        });
        console.log(response);
        res.send(response)
    } catch (error) {
        
    }
}

const getAllBooks = async(req,res) =>{
    try {
                
        const response = await Books.find({});
        console.log(response);
        res.send(response).status(200)
    } catch (error) {
        
    }
}


module.exports = {getbooksByNamePriceCategory,getAllBooks,getBooksPriceRange,getBookByName}