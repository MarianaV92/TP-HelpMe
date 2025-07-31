import { EtatTicket } from '../bo/Ticket.js';

const mockTickets = [
  {
    id: 1,
    titre: 'Ticket 1',
    auteur: { name: 'Alice', id: 1 },
    description: 'Description du ticket 1',
    creation: new Date('2025-06-07T15:30:00Z'),
    etat: EtatTicket.OUVERT,
  },
  {
    id: 2,
    titre: 'Ticket 2',
    auteur: { name: 'Bob', id: 2 },
    description: 'Description du ticket 2',
    creation: new Date('2025-06-07T15:35:00Z'),
    etat: EtatTicket.CLOS,
  },
  {
    id: 3,
    titre: 'Ticket 3',
    auteur: { name: 'Joe', id: 3 },
    description: 'Description du ticket 3',
    creation: new Date('2025-06-08T15:05:00Z'),
    etat: EtatTicket.OUVERT,
  },
];

export default mockTickets;
