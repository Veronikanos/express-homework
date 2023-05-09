const express = require("express");

const booksRouter = require('./routes/create')
// const books = require("./books")

const app = express();
const port = 3000;


// router.use((req, res, next)=>{
// 	console.log("Router middleware");
// next();
// })


app.use(express.json());
app.use("/create", booksRouter);

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

// app.use((err, req, res, next)=>{
// 	// res.status(404).json({
// 	// 	message: "Not found"
// 	// })
// 	console.error("Error found!");
// 		res.status(500).send("Something wrong");
// })

app.listen(port, ()=> console.log("server running"))