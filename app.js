"use strict";

require("dotenv").config();
const express = require("express");
const app = express();

const { format, formatDate } = require('date-fns');
const { findTickets, setTickets } = require('./services/ticketsService');
const mockTickets = require('./services/mockTickets');
setTickets(mockTickets);

// EJS
app.set("views", "./views");
app.set("view engine", "ejs");

app.get(['/', '/tickets'], (req, res) => {
   const tickets = findTickets()
  /* const tickets = [
    { description: 'Test ticket 1' },
    { description: 'Test ticket 2' },
  ];*/
  console.log(findTickets())
  res.render('liste-tickets', { tickets });
  console.log(tickets)
});



app.get('/tickets/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  const ticket = findTickets().find(t => t.id === id);
  console.log(ticket)
  if (!ticket) {
    return res.status(404).send('Ticket non trouvé');
  }
  res.render('detail-ticket', { ticket });
});



const port = process.env.PORT_NO || 3000;
app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});
