const express = require("express");
const { updateReturnTransaction,allTransactions,listofEntriesbtwDateRange,bookTotalRentGenerated,listOfBooksIssuedtoPerson, updateOrCreateTransaction,BookDetails } = require("../controllers/Transactions");

const router = express.Router()

router.put("/updateOrCreateTransaction",updateOrCreateTransaction);
router.put("/updateReturnTransaction",updateReturnTransaction);
router.get("/BookDetails",BookDetails);
router.get("/bookTotalRentGenerated",bookTotalRentGenerated);
router.get("/listOfBooksIssuedtoPerson",listOfBooksIssuedtoPerson);
router.get("/listofEntriesbtwDateRange",listofEntriesbtwDateRange);
router.get("/allTransactions",allTransactions);


module.exports = router;