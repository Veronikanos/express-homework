const express = require("express");
const booksMdware = require('../middlewares/books.mdware')

const router = express.Router();

const books = [
	{
		id: 1,
		title: "lololo"
	},
	{
		id: 2,
		title: "fafafa"
	}
]

// router.get("/", (req, res)=>{
// 	res.sendStatus(404);
// })

router.get("/", (req, res)=>{
	res.json(books);
})

router.post("/", booksMdware.checkBody, (req, res)=>{
	const book = req.body;
	books.push(book);
	// res.json(books);
	res.send("New book created")
})

module.exports = router