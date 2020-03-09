const express = require("express");
var app = express();

app.get("/time", (request, response) => {
	response.send(new Date());
})
app.listen(8080);

console.log("Server ready");