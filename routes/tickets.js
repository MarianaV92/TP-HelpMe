import express from 'express';
import { getAllTickets, getTicketById, showCreateForm, createTicket,deleteTicketById } from '../controllers/ticketController.js';

const router = express.Router();

// ---Liste des tickets
router.get('/', getAllTickets);

//---- Affiche formulaire de création 
router.get('/create', showCreateForm);



// -----Création du ticket (POST)
router.post('/create', createTicket);

// ----Détail d’un ticket (id dynamique)
router.get('/:id', getTicketById);
//---- Delete un ticket
router.post('/:id/delete', deleteTicketById);

export default router;
