"use strict";

require("dotenv").config();
const express = require("express");
const session = require("express-session");
const app = express();

const { setTickets } = require('./services/ticketsService');
const mockTickets = require('./services/mockTickets');
setTickets(mockTickets);

// EJS
app.set("views", "./views");
app.set("view engine", "ejs");


app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,       // signer le coookie de session   
  resave: false,                    
  saveUninitialized: true,           
  cookie: { secure: false }          
}));

//-----Attention indisponsable pour passer la session à toutes les vues
app.use((req, res, next) => {
  res.locals.session = req.session || null;  // rend `session` disponible dans toutes les vues
  next();
});
// Routes
const ticketRoutes = require('./routes/tickets');
//const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');

app.use('/tickets', ticketRoutes);
//app.use('/users', userRoutes);
app.use('/login',authRoutes)
app.use('/logout',authRoutes)

// Redirection de base vers /tickets
app.get('/', (req, res) => res.redirect('/tickets'));




// Serveur
const port = process.env.PORT_NO || 3000;
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
