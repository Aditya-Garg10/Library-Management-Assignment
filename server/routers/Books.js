const express = require("express");
const { getbooksByNamePriceCategory,getAllBooks ,getBooksPriceRange,getBookByName} = require("../controllers/Books");

const router = express.Router()

router.post("/getBookByName",getBookByName);
router.post("/getBookPriceRange",getBooksPriceRange);
router.post("/getbooksByNamePriceCategory",getbooksByNamePriceCategory);
router.get("/getAllBooks",getAllBooks);

module.exports = router;