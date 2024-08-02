const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors"); // Importez le module CORS

app.use(cors()); // Utilisez CORS pour permettre des requêtes depuis n'importe quelle origine
app.get("/titouan", (req, res, next) => {
	res.send("merci titouan");

	const data = ["hello", "world"];

	fs.writeFileSync("test.json", JSON.stringify(data));
});

app.get("/titoudata", (req, res, next) => {
	const data = fs.readFileSync("testReadFileServer/bdd.json", "utf8");

	res.send(data);
});

app.listen("3000", () => {
	console.log("server running");
});
