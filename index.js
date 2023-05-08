const express = require("express");

const app = express();

app.get('/', (request, response)=>{
	response.send("<h2>Home page</h2>")
})

app.get("/contacts", (request, response)=>{
	response.send("<h2>Contacts page</h2>")
})

app.listen(3000, ()=> console.log("server running"))