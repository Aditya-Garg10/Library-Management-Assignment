const express = require("express");
const { updateReturnTransaction,allTransactions,listofEntriesbtwDateRange,bookTotalRentGenerated,listOfBooksIssuedtoPerson, updateOrCreateTransaction,BookDetails } = require("../controllers/Transactions");

const router = express.Router()

router.put("/updateOrCreateTransaction",updateOrCreateTransaction);
router.put("/updateReturnTransaction",updateReturnTransaction);
router.post("/BookDetails",BookDetails);
router.post("/bookTotalRentGenerated",bookTotalRentGenerated);
router.post("/listOfBooksIssuedtoPerson",listOfBooksIssuedtoPerson);
router.post("/listofEntriesbtwDateRange",listofEntriesbtwDateRange);
router.get("/allTransactions",allTransactions);


module.exports = router;