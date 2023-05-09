const express = require("express");
const booksMdware = require('../middlewares/checkBody.mdware');
const {getErrorMessage} = require('../middlewares/errors.mdware');
const books = require("../models/allBooks");

const router = express.Router();
router.use(express.json());



// Middleware to validate if book exists
const validateBook = (req, res, next) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }
  req.book = book;
  next();
};

// Middleware to validate if review exists
const validateReview = (req, res, next) => {
  const review = req.book.reviews.find((r) => r.id === parseInt(req.params.id));
  if (!review) {
    return res.status(404).json({ message: "Review not found" });
  }
  req.review = review;
  next();
};



// Get list of books
router.get("/", (req, res)=>{
	console.log(books);
	res.json(books);
})


// Get book by ID
router.get("/:id",(req, res) => {
		const book = books.find((book) => book.id === parseInt(req.params.id));
	if (!book) {
		return res.status(404).json({ message: "Book not found" });
	}
	res.json(book);
})

// Edit book title
router.put("/:id", validateBook, (req, res) => {

  const bookId = parseInt(req.params.id);
  const newTitle = req.body.title;

  const book = books.find((b) => b.id === bookId);
  if (!book) {
    res.status(404).json({ message: `Book with id ${bookId} not found` });
    return;
  }

  book.title = newTitle;

  res.json({ message: "Book title updated", book });
})

// Add a review for a book
router.post("/:id/reviews", validateBook, (req, res) => {
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