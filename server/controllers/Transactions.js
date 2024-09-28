const { Books } = require("../models/Books");
const Transactions = require("../models/Transactions");
const User = require("../models/User");

const updateOrCreateTransaction = async (req, res) => {
  try {
    const { bookName, userName, issueDate, returnDate } = req.body;

    const validateBook = await Books.findOne({ bookName });
    const validateUser = await User.findOne({ fullName: userName });
    console.log(validateBook);
    if (!validateUser || validateBook === null) {
      res.status(404).send("User or Book not exists");
    } else {
      if (validateBook.available === true) {
        const response = await Transactions.create({
          bookName,
          issueDate,
          userName,
          returnDate,
        });
        const response2 = await Books.findOneAndUpdate(
          { bookName },
          { available: false },
          { new: true }
        );
        // console.log(response)
        res.json({ response, response2 }).status(200);
      } else {
        res.send("Book is not Available").status(304);
      }
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

function countDaysBetween(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  if (isNaN(start) || isNaN(end)) {
    throw new Error("Invalid date format");
  }
  const differenceInMilliseconds = end - start;
  const days = differenceInMilliseconds / (1000 * 60 * 60 * 24);

  return Math.round(days);
}

const updateReturnTransaction = async (req, res) => {
  try {
    let { bookName, returnDate, userName } = req.body;

    const validateAvaibilityOfBook = await Books.findOne({ bookName });
    const validateBook = await Transactions.findOne({ bookName });
    const validateUser = await Transactions.findOne({ userName });
    if (
      validateUser === null ||
      validateBook === null ||
      validateAvaibilityOfBook === null
    ) {
      res.status(404).send("User or Entry does'nt exists");
    } else {
      if (validateAvaibilityOfBook.available === false) {
        const response = await Transactions.findOneAndUpdate(
          { bookName, userName },
          { $set: { returnDate } },
          { new: true }
        );
        await Books.findOneAndUpdate({ bookName }, { available: true });
        // console.log(response)
        const totalRent =
          countDaysBetween(response.issueDate, response.returnDate) *
          validateAvaibilityOfBook.rentPerDay;
        const Total_Rent = await Transactions.findOneAndUpdate(
          { bookName, userName },
          { $set: { totalRent } },
          { new: true }
        );
        res.json({ Total_Rent }).status(201);
      } else {
        res.status(503).send("Book is not available!!");
      }
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const BookDetails = async (req, res) => {
  try {
    const { bookName } = req.body;

    const response = await Transactions.find({ bookName });
    let activeUser;
    response.map((user) => {
      if (user.returnDate === "") {
        activeUser = user.userName;
      }
    });
    const users = response.map((user) => {
      return user.userName;
    });
    const totalCount = response.length;

    res.json({ users, totalCount, activeUser }).status(200);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const bookTotalRentGenerated = async (req, res) => {
  try {
    const { bookName } = req.body;

    const response = await Transactions.find({ bookName });

    // res.send("book not found")
    if (response) {
      const totalRent = response.map((user) => {
        if (!user.totalRent) {
          return 0;
        } else {
          return user.totalRent;
        }
      });
      let sum = 0;
      totalRent.forEach((n) => {
        sum += n;
      });
      res.json({ total_rent: sum }).status(200);
    } else {
      res.send("book not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const listOfBooksIssuedtoPerson = async (req, res) => {
try {
    const {userName} = req.body;

    const response = await Transactions.find({userName})
    console.log(response);
    const members = response.map((user) => {
        return user.bookName;
      });
      res.send(members)
      
} catch (error) {
    res.status(500).send(error.message);
}
};


const listofEntriesbtwDateRange = async(req,res) =>{

    const {startDate,endDate} = req.body;
    
    try {
      const entries = await Transactions.find({
        issueDate:{
          $gte: startDate,
          $lte: endDate,
        }
      },'userName bookName');
      
      //   let userName = entries.map((entry)=>{
      //   return entry.userName;               
      // })
      //   let bookName = entries.map((entry)=>{
      //   return entry.bookName;               
      // })
      res.json({entries}).status(201);
    } catch (error) {
      res.status(500).send(error.message);
    }
}

module.exports = {
  bookTotalRentGenerated,
  updateOrCreateTransaction,
  updateReturnTransaction,
  BookDetails,
  listOfBooksIssuedtoPerson,
  listofEntriesbtwDateRange
};
