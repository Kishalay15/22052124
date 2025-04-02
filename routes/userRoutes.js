const express = require("express");
const { handleGetTopUsers } = require("../controllers/userController");
const router = express.Router();

router.get("/", handleGetTopUsers);

module.exports = router;
