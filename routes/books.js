const express = require("express");
const booksMdware = require('../middlewares/books.mdware');
const books = require("../models/books");

const router = express.Router();
// console.log(books.getAll());
// const books = [
// 	{
// 		id: 1,
// 		title: "lololo",
// 		reviews: [
// 			{id: 1, comment: "A charming and delightful novel."},
// 			{id: 2, comment: "Jane Austen's writing is exquisite."},
// 			{id: 3, comment: "Mr. Darcy is the ultimate romantic hero."}
// 		]
// 	},
// 	{
// 		id: 2,
// 		title: "fafafa",
// 		reviews: [
// 			{id: 1, comment: "A charming and delightful novel."},
// 			{id: 2, comment: "Jane Austen's writing is exquisite."},
// 			{id: 3, comment: "Mr. Darcy is the ultimate romantic hero."}
// 		]
// 	}
// ]

// router.get("/", (req, res)=>{
// 	res.sendStatus(404);
// })

router.get("/", async (req, res) => {
	const result = await books.getAll();
	res.json(result);
})

router.get("/:id", async (req, res) => {
	// console.log(req.params.id);
	const {id} = req.params;
	const result = await books.getBookById(id);

	// if not found - 404
	// console.log(result);
	res.json(result);
})

router.post("/", booksMdware.checkBody, async (req, res)=>{

	const result = await books.addBook(req.body);
	res.status(201).json(result);
	// const book = req.body;
	// books.push(book);
	// res.json(books);
	// res.send("New book created")
})

router.put("/:id", async (req, res)=>{
const {id} = req.params;
	const result = await books.updateBook(id, req.body);
	res.json(result);
})

router.delete("/:id", async (req, res)=>{
const {id} = req.params;
	const result = await books.removeBook(id, req.body);
	res.status(202).json(result);
})

module.exports = router