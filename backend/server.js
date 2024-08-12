const express = require("express");
const app = express();
const fs = require("fs");
const cors = require("cors"); // Importez le module CORS

app.use(cors()); // Utilisez CORS pour permettre des requêtes depuis n'importe quelle origine


//===================================== GET ================================
//
//===========================================================================
app.get("/titoudata", (req, res, next) => {
	const data = fs.readFileSync("bdd/bdd.json", "utf8");
	res.send(data);
});

app.get("/titoudata/map", (req, res, next) => {
	res.sendFile("C:\\Users\\T0293091\\Documents\\map-app-main\\backend\\1106.tif");
});

//retourne l'objet avec l'id écrit en paramètre
app.get("/titoudata/:id", (req, res, next) => {
	const data = fs.readFileSync("bdd/bdd.json", "utf8");
	const id = req.params.id;
	const regate = JSON.parse(data).find(r => r.id == id);
	res.send(regate || {});
});



//===================================== POST ================================
//
//===========================================================================
app.post("/titoudata", (req, res, next) => {
	res.sendFile("C:\\Users\\T0293091\\Documents\\map-app-main\\backend\\1106.tif");
});



//===================================== LISTEN ================================
//
//===========================================================================
app.listen("3000", () => {
	console.log("server running");
});
