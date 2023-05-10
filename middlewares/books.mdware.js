const checkBody = (req, res, next) => {
	if (!req.body || Object.keys(req.body).length === 0) {
		return res.status(400).send("Request body is missing or empty");
  }
	next();
}

// Middleware to validate if book exists
const validateBook = (books) => (req, res, next) => {

	if (!req.params.bookId) {
    return res.status(400).send("Book ID is missing in params");
  }

	const bookId = Number(req.params.bookId);
	if (isNaN(bookId)){
		return res.status(400).send("Invalid id format in params");
	}

  const book = books.find((b) => b.id === bookId);
  if (!book) {
    return res.status(404).send(`Book with id ${bookId} not found`);
  }
  req.book = book;
  next();
};

// Middleware to validate if review exists
const validateReview = (req, res, next) => {

	if (!req.params.reviewId) {
    return res.status(400).send("Review ID is missing in params");
  }

	const reviewId = Number(req.params.reviewId);

  const review = req.book.reviews.find((r) => r.id === reviewId);
  if (!review) {
    return res.status(404).send("Review not found");
  }
  req.review = review;
  next();
};


// Middleware to check if book title is present in request body
const checkBookTitleBody = (books) => (req, res, next) => {

	const { title } = req.body;

  if (!title) {
    return res.status(204).send("Title is required");
  }

	if (typeof title !== "string"){
		return res.status(400).send("Invalid book title");
	}

  const existingBook = books.find((book) => book.title === title);
  if (existingBook) {
    return res
      .status(409)
      .send({ error: `Book with title ${title} already exists` });
  }

	req.title = title;

  next();
};

// Middleware to check if review is present in request body
const checkReviewComment = (req, res, next) => {
  if (!req.body.comment) {
		return res.status(400).send("Review comment is missing or incomplete in request body");
  }
  next();
};

const checkReviewsBody = (req, res, next) =>{
	const {reviews} = req.body;
	if (!reviews){
		req.reviews = [];
		return next();
	} 

  if (!Array.isArray(reviews)) {
		return res.status(400).send("Comments for reviews should be an array of objects");
	}

	const isOnlyCommentsFieldExists =  reviews.every(review => Object.keys(review).length === 1 && review.comment);


	if (!isOnlyCommentsFieldExists){
		return res.status(400).send("Comment is empty or reviews contain unnecessary fields");
	}
	req.reviews = reviews;

	next();
}


module.exports = {
	checkBody,
	validateBook,
	validateReview,
	checkBookTitleBody,
	checkReviewComment,
	checkReviewsBody
}