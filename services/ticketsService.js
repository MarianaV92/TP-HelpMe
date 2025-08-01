import { insertTicket, findAll, findTicketByObjectId, deleteTicket } from '../dal/ticketsDal.js';


//----------- Retourne tous les tickets, triés par date de création
export async function findTickets() {
  const tickets = await findAll();
  return tickets;
}

//----------- Retourne un ticket par son ID

export async function findTicketByID(id) {
  const ticket = await findTicketByObjectId(id);
  return ticket;
}

//-------- Filtrage par état
export function filterTicketsByEtat(tickets, etat) {
  return tickets.filter(ticket => ticket.etat === etat);
}

// --------Création d’un ticket
export async function createTicketService(data) {
  const inserted = await insertTicket(data);
  return inserted;
}

// -------Suppression d’un ticket
export async function deleteTicketService(id) {
  return await deleteTicket(id); 
}



/*import { Ticket, EtatTicket } from '../bo/Ticket.js';
import mockTickets from './mockTickets.js';

let tickets = [];
let nextId = 1;

export function setTickets(tab) {
  tickets = tab;
   nextId = tickets.length > 0 ? Math.max(...tickets.map(t => t.id)) + 1 : 1;
}

export function findTickets() {
  return tickets.slice().sort((a, b) => a.creation - b.creation);
}

export function filterTicketsByEtat(tickets, etat) {
  return tickets.filter(ticket => ticket.etat === etat);
}

export function createTicketService(data) {
  const ticket = new Ticket({
    id: nextId++,
    auteur: data.auteur,
    titre: data.titre,
    description: data.description,
  });
  tickets.push(ticket);
  return ticket;
}


export function deleteTicket(id) {
  const index = tickets.findIndex(t => t.id === id);
  if (index !== -1) {
    tickets.splice(index, 1);
    return true;  
  }
  return false; 
}

setTickets(mockTickets);*/