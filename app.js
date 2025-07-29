
require("dotenv").config();
const express = require("express");
const app = express();

// EJS
app.set("views", "./views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("liste-tickets", {
    message: "Ceci est un message envoyé depuis Express."
  });
});


const port = process.env.PORT_NO || 3000;
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
