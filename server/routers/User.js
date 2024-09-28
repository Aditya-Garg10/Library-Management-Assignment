const express = require("express");
const { getAllUser} = require("../controllers/User");

const router = express.Router()

router.get("/getAllUser",getAllUser);

module.exports = router;