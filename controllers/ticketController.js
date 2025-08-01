import { findTickets, createTicketService, deleteTicketService,findTicketByID } from '../services/ticketsService.js';
import AppError from '../utils/AppError.js';

//------ Get all tickets
export async function getAllTickets(req, res, next) {
  try {
    const tickets = await findTickets();  // attendre la résolution
    res.render('liste-tickets', { tickets });
  } catch (err) {
    next(err);
  }
}

//
export async function getTicketById(req, res, next) {
  try {
    const ticket = await findTicketByID(req.params.id); 
    if (!ticket) {
      return res.status(404).render('404');
    }
    res.render('detail-ticket', { ticket });
  } catch (err) {
    next(err);
  }
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


export async function deleteTicketById(req, res) {
  const id = req.params.id;  

  try {
    await deleteTicketService(id);
    res.redirect('/tickets');
  } catch (error) {
    console.error('Erreur lors de la suppression du ticket:', error);
    res.status(500).send('Erreur serveur lors de la suppression');
  }
}