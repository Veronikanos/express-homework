const express = require("express");
const booksRouter = require('./routes/books');

const app = express();
const port = 3000;

app.use(express.json());
app.use("/books", booksRouter);

app.get('/', (req, res)=>{
	res.send("<h2>Home page</h2>")
})


// Handle all GET requests that don't match any of other route handlers
app.get("*", (req, res) => {
  res.status(404).send("Page not found");
});

// Global errors handler
app.use((error, req, res, next) => {
	if (error){
		const message = error.message || "Something wrong";
		const status = error.status || 500;
		res.status(status).json( message);
	}
})

app.listen(port, ()=> console.log("server running"))