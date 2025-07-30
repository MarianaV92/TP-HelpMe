const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

// Liste des tickets
router.get( '/', ticketController.getAllTickets);

// Détail d’un ticket
router.get('/:id', ticketController.getTicketById);

module.exports = router;
