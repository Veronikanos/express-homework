const checkBody = (req, res, next) => {
	if (!req.body || Object.keys(req.body).length === 0) {
		return res.status(400).send("Request body is missing or empty");
  }

	// if (!req.body.id){
	// 	return res.status(400).send("Id field required.");
	// }
	// if (!req.body.title){
	// 	return res.status(400).send("Title field required.");
	// }
	// if (!req.body.reviews){
	// 	return res.status(400).send("Reviews field required.");
	// }

	next();
}

// const checkAdditionalFields = (allowedFields) => (req, res, next) => {
//   const receivedFields = Object.keys(req.body);
//   const extraFields = receivedFields.filter((field) => !allowedFields.includes(field));
//   if (extraFields.length > 0) {
//     const err = new Error(`Received fields '${extraFields.join(", ")}' are not allowed in the request body`);
//     err.status = 403;
//     return next(err);
//   }
//   next();
// };

// Middleware to validate if book exists
const validateBook = (books) => (req, res, next) => {
	const bookId = Number(req.params.id);
  const book = books.find((b) => b.id === bookId);
  if (!book) {
    return res.status(404).json(`Book with id ${bookId} not found`);
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


// Middleware to check if book title is present in request body
const checkBookTitle = (req, res, next) => {
  if (!req.body.title) {
		return res.status(400).send("Title field required.");
  }
  next();
};

// Middleware to check if review is present in request body
const checkReview = (req, res, next) => {
  if (!req.body.review || !req.body.review.comment) {
    const err = new Error("Review is missing or incomplete in request body");
    err.status = 400;
    return next(err);
  }
  next();
};


module.exports = {
	checkBody,
	validateBook,
	validateReview,
	checkBookTitle,
	// checkAdditionalFields
}