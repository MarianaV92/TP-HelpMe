import { findTickets, createTicketService, deleteTicket} from '../services/ticketsService.js';
import AppError from '../utils/AppError.js';

export function getAllTickets(req, res) {
  const tickets = findTickets();
  res.render('liste-tickets', { tickets });
}

export function getTicketById(req, res, next) {
  const id = parseInt(req.params.id, 10);
  const ticket = findTickets().find(t => t.id === id);

  if (!ticket) {
    return next(new AppError('Ticket non trouvé', 404));
  }

  res.render('detail-ticket', { ticket });
}


export function showCreateForm(req, res) {
  res.render('create-ticket');  
}

export function createTicket(req, res, next) {
  try {
    const { auteur, titre, description } = req.body;

    if (!auteur || !titre || !description) {
      throw new AppError('Tous les champs sont requis', 400);
    }

    createTicketService({ auteur, titre, description });

    res.redirect('/tickets');
  } catch (err) {
    next(err); // Passe l'erreur au middleware global
  }
}


export function deleteTicketById(req, res) {
  const id = parseInt(req.params.id, 10);
  const ticket = findTickets().find(t => t.id === id);

  if (!ticket) {
    return res.status(404).send('Ticket non trouvé');
  } 
  deleteTicket(ticket.id)
  res.redirect('/tickets');
}