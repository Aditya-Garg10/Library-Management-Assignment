const express = require("express");
const { getbooksByNamePriceCategory,getAllBooks ,getBooksPriceRange,getBookByName} = require("../controllers/Books");

const router = express.Router()

router.get("/getBookByName",getBookByName);
router.get("/getBookPriceRange",getBooksPriceRange);
router.get("/getbooksByNamePriceCategory",getbooksByNamePriceCategory);
router.get("/getAllBooks",getAllBooks);

module.exports = router;