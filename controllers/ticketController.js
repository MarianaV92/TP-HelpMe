const { findTickets } = require('../services/ticketsService');

exports.getAllTickets = (req, res) => {
  const tickets = findTickets();
  res.render('liste-tickets', { tickets });
};

exports.getTicketById = (req, res) => {
  const id = parseInt(req.params.id, 10);
  const ticket = findTickets().find(t => t.id === id);

  if (!ticket) {
    return res.status(404).send('Ticket non trouvé');
  }
  res.render('detail-ticket', { ticket });
};
