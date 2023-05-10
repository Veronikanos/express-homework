const express = require("express");
const {checkBody,
	validateBook,
	validateReview, checkBookTitle} = require('../middlewares/books.mdware');
const {getErrorMessage} = require('../middlewares/errors.mdware');
const books = require("../models/allBooks");

const router = express.Router();
router.use(express.json());


// Get list of books
router.get("/", (req, res)=>{
	res.json(books);
})


// Get book by ID
router.get("/:id", validateBook(books), (req, res) => {
	// console.log(req.book);
	res.json(req.book);
})

// Edit book title
router.put("/:id", validateBook(books), checkBody, checkBookTitle, (req, res) => {
  req.book.title = req.body.title;
  res.json(req.book);
})

// Add a review for a book
router.post("/:id/reviews", checkBody, validateBook, (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  const review = { id: String(books.length + 1), comment: req.body.comment };
  book.reviews.push(review);
  res.status(201).json({ message: "Review added", review });
});


// Delete a review by ID
router.delete("/:id/reviews/:id", validateBook, validateReview, (req, res) => {
  req.book.reviews = req.book.reviews.filter((r) => r.id !== req.review.id);
  res.json({ message: "Review deleted", review: req.review });
});


// Receive list of reviews by book id
router.get("/:id/reviews", validateBook, (req, res) => {
  const bookId = parseInt(req.params.id);

  const book = books.find((b) => b.id === bookId);
  if (!book) {
    res.status(404).json({ message: `Book with id ${bookId} not found` });
    return;
  }

  res.json({ reviews: book.reviews });
})



// router.get("/", async (req, res, next) => {
// 	try {
// 			const result = await books.getAll();
// 			res.json(result);
// 	} catch (error) {
// 		// console.log(error);
// 		next(getErrorMessage({status: 400, message: "Error while getting all books"}));
// 		// next(new Error("Can not get all books"))
// 		// res.status(500).send("Can not get all books")
// 	}
// })



// router.get("/:id", async (req, res) => {
// 	try {
// 			const {id} = req.params;
// 		const result = await books.getBookById(id);
// 		res.json(result);
// 	} catch (error) {
// 		next(getErrorMessage({status: 400, message: "Error while adding book by ID"}));
// 	}
// })


// Add a review to a book
// exports.patch = (req, res) => {
//   const book = books.find((book) => book.id === parseInt(req.params.bookId));
//   if (!book) {
//     return res.status(404).json({ message: "Book not found" });
//   }
//   const review = { id: Date.now(), comment: req.body.comment };
//   book.reviews.push(review);
//   res.status(201).json({ message: "Review added", review });
// };

// router.post("/", booksMdware.checkBody, async (req, res) => {
// 	try {
// 		const result = await books.addBook(req.body);
// 		res.status(201).json(result);
// 	} catch (error) {
// 		// console.log(error);
// 		next(getErrorMessage({status: 400, message: "Error while adding book"}));
// 	}
// })

// router.put("/:id", async (req, res)=>{
// 	try {
// 		const {id} = req.params;
// 	const result = await books.updateBook(id, req.body);
// 	res.json(result);
// 	} catch (error) {
// 		next(getErrorMessage({status: 400, message: "Error while updating book by id"}));
// 	}
// })

// router.delete("/:id", async (req, res)=>{
// 	try {
// 		const {id} = req.params;
// 	const result = await books.removeBook(id, req.body);
// 	res.status(202).json(result);
// 	} catch (error) {
// 		next(getErrorMessage({status: 400, message: "Error while deleting book"}));
// 	}

// })

module.exports = router