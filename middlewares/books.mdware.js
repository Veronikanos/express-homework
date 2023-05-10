const checkBody = (req, res, next) => {
	if (!req.body || Object.keys(req.body).length === 0) {
		return res.status(400).send("Request body is missing or empty");
  }
	next();
}

// Middleware to validate if book exists
const validateBook = (books) => (req, res, next) => {

	if (!req.params.bookId) {
    return res.status(400).json("Book ID is missing in params");
  }

	const bookId = Number(req.params.bookId);
	if (isNaN(bookId)){
		return res.status(400).json("Invalid id format in params");
	}

  const book = books.find((b) => b.id === bookId);
  if (!book) {
    return res.status(404).json(`Book with id ${bookId} not found`);
  }
  req.book = book;
  next();
};

// Middleware to validate if review exists
const validateReview = (req, res, next) => {

	if (!req.params.reviewId) {
    return res.status(400).json("Review ID is missing in params");
  }

	const reviewId = Number(req.params.reviewId);

  const review = req.book.reviews.find((r) => r.id === reviewId);
  if (!review) {
    return res.status(404).json("Review not found");
  }
  req.review = review;
  next();
};


// Middleware to check if book title is present in request body
const checkBookTitle = (req, res, next) => {
  if (!req.body.title) {
		return res.status(400).send("Title field required.");
  }
  next();
};

// Middleware to check if review is present in request body
const checkReviewComment = (req, res, next) => {
  if (!req.body.comment) {
		return res.status(400).send("Review comment is missing or incomplete in request body");
  }
  next();
};


module.exports = {
	checkBody,
	validateBook,
	validateReview,
	checkBookTitle,
	checkReviewComment,

}