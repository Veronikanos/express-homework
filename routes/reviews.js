const express = require("express");
const booksMdware = require('../middlewares/checkBody.mdware');
const {getErrorMessage} = require('../middlewares/errors.mdware');
const books = require("../models/books");

// const router2 = express.Router();

// router2.get("/", async (req, res) => {
// 	console.log("ok");
// 			res.json("ok");

// 	})

// module.exports = router2