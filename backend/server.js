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
	const data = fs.readFileSync("bdd/bdd.json", "utf8");

	res.send(data);
});

//retourne l'objet avec l'id écrit en paramètre
app.get("/titoudata/:id", (req, res, next) => {
	const data = fs.readFileSync("bdd/bdd.json", "utf8");

	const id = req.params.id;

	const regate = JSON.parse(data).find(r => r.id == id);

	res.send(regate || {});
});

app.listen("3000", () => {
	console.log("server running");
});
