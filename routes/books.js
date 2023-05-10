const express = require('express');
const { checkBody,
  validateBook,
  validateReview,
  checkBookTitleBody,
  checkReviewComment,
  checkReviewsBody,
} = require('../middlewares/books.mdware');
const books = require('../models/allBooks');

const router = express.Router();
router.use(express.json());

// Get list of books
router.get('/', (req, res) => {
  res.json(books);
});

// Get book by ID
router.get('/:bookId', validateBook(books), (req, res) => {
  res.json(req.book);
});

// Create new book
router.post('/', checkBookTitleBody(books), checkReviewsBody, (req, res) => {
    const newBook = {
      id: Date.now(),
      title: req.title,
      reviews: req.reviews,
    };
    books.push(newBook);
    res.status(201).json(newBook);
  }
);

// Edit book title
router.put('/:bookId?', validateBook(books), checkBody, checkBookTitleBody(books), (req, res) => {
    req.book.title = req.body.title;
    res.json(req.book);
  }
);

// Receive list of reviews by book id
router.get('/:bookId/reviews', validateBook(books), (req, res) => {
  res.json(req.book.reviews);
});

// Add a review for a book
router.put('/:bookId/reviews', validateBook(books), checkBody, checkReviewComment, (req, res) => {
    const review = {id: Date.now(), comment: req.body.comment};
    req.book.reviews.push(review);
    res.status(201).json(review);
  }
);

// Delete a review by ID
router.delete('/:bookId/reviews/:reviewId', validateBook(books), validateReview, (req, res) => {
    const index = req.book.reviews.findIndex(
      (r) => r.id === req.review.id
    );
    req.book.reviews.splice(index, 1);
    res.json(req.review);
  }
);

module.exports = router;
