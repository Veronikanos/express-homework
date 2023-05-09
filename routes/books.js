const express = require("express");
const booksMdware = require('../middlewares/checkBody.mdware');
const {getErrorMessage} = require('../middlewares/errors.mdware');
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

router.get("/", async (req, res, next) => {
	try {
			const result = await books.getAll();
			res.json(result);
	} catch (error) {
		// console.log(error);
		next(getErrorMessage({status: 400, message: "Error while getting all books"}));
		// next(new Error("Can not get all books"))
		// res.status(500).send("Can not get all books")
	}

})

router.get("/:id", async (req, res) => {
	try {
			const {id} = req.params;
		const result = await books.getBookById(id);
		res.json(result);
	} catch (error) {
		next(getErrorMessage({status: 400, message: "Error while adding book by ID"}));
	}
})

router.post("/", booksMdware.checkBody, async (req, res) => {
	try {
		const result = await books.addBook(req.body);
		res.status(201).json(result);
	} catch (error) {
		// console.log(error);
		next(getErrorMessage({status: 400, message: "Error while adding book"}));
	}
})

router.put("/:id", async (req, res)=>{
	try {
		const {id} = req.params;
	const result = await books.updateBook(id, req.body);
	res.json(result);
	} catch (error) {
		next(getErrorMessage({status: 400, message: "Error while updating book by id"}));
	}

})

router.delete("/:id", async (req, res)=>{
	try {
		const {id} = req.params;
	const result = await books.removeBook(id, req.body);
	res.status(202).json(result);
	} catch (error) {
		next(getErrorMessage({status: 400, message: "Error while deleting book"}));
	}

})

module.exports = router