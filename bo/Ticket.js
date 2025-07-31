import { format } from 'date-fns';

export const EtatTicket = {
  OUVERT: 'OUVERT',
  CLOS: 'CLOS'
};

export class Ticket {
  constructor({ id, auteur, titre, description, creation = new Date(), etat = EtatTicket.OUVERT }) {
    if (!auteur) throw new Error("Auteur est obligatoire");
    if (!titre || titre.length > 50) throw new Error("Titre invalide");
    if (description && description.length > 2000) throw new Error("Description trop longue");

    this.id = id;
    this.auteur = auteur;
    this.titre = titre;
    this.description = description;
    this.creation = creation;
    this.etat = etat;
  }

  setEtat(newEtat) {
    if (!Object.values(EtatTicket).includes(newEtat)) {
      throw new Error("Etat invalide");
    }
    this.etat = newEtat;
  }

  getFormattedDate() {
    return format(this.creation, 'dd/MM/yyyy HH:mm');
  }
}
