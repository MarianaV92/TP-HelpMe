const { Ticket, EtatTicket } = require('../bo/Ticket');

let tickets = [];
let nextId =1;

function setTickets(tab) {
  tickets = tab;
}

function findTickets() {
  return tickets.slice().sort((a, b) => a.creation - b.creation);
}

function createTicket(data) {
  const ticket = new Ticket({
    id: nextId++,
    auteur: data.auteur,
    titre: data.titre,
    description: data.description
  });
  tickets.push(ticket);
  return ticket;
}

module.exports = {
  findTickets,
  setTickets,
  createTicket
};
