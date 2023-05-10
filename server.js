const express = require("express");

const booksRouter = require('./routes/books');
// const reviewsRouter = require('./routes/reviews')


// const createBookRouter = require('./routes/create')
// const books = require("./books")

const app = express();
const port = 3000;


// router.use((req, res, next)=>{
// 	console.log("Router middleware");
// next();
// })


app.use(express.json());
// app.use(express.urlencoded({ extended: false}))
app.use("/books", booksRouter);
// app.use("/books/reviews", reviewsRouter);

app.get('/', (req, res)=>{
	res.send("<h2>Home page</h2>")
})


// app.use('/books', (req, res)=>{
// 	try {
// 		console.log("BOOKS route middleware");
// 	} catch (error) {
// 		next(error);
// 	}
// })


// Handle all GET requests that don't match any of other route handlers
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

app.use((error, req, res, next) => {
	if (error){
		// console.log("Error occured!!!");
		const message = error.message || "Something wrong";
		const status = error.status || 500;
		res.status(status).json( message);
		// return res.status(status).send(message);
	}

	// if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
  //   res.status(400).send({ error: "Bad request" });
  // } else {
  //   res.status(404).send({ error: "Not found" });
  // }

	// err.statusCode = err.statusCode || 500;
	// err.status = err.status || "Something wrong";

	// res.status(err.statusCode).json({
	// 	status: err.statusCode,
	// 	message: "Not found"
	// })
	// console.error("Error found!");
	// 	res.status(500).send("Something wrong");
})

app.listen(port, ()=> console.log("server running"))