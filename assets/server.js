const express = require("express");

const app = express();

const fs = require("fs");

app.get("/titouan", (req, res, next) => {
	res.send("merci titouan");

	const data = ["hello", "world"];

	fs.writeFileSync("test.json", JSON.stringify(data));
});

app.get("/titoudata", (req, res, next) => {
	const data = fs.readFileSync("test.json", "utf8");

	res.send(data);
});

app.listen("3000", () => {
	console.log("server running");
});
