import { getAllUsers } from '../services/usersService.js';
import { findTickets } from '../services/ticketsService.js';

export function getLogin(req, res) {
  res.render('login');
}

export function post(req, res) {
  const { username, password } = req.body;
  const user = getAllUsers().find(u => u.username === username);

  if (!user || user.password !== password) {
    return res.status(404).send('Utilisateur non trouvé ou mot de passe incorrect');
  }

  // Stockage des données dans la session
  req.session.user = {
    id: user.id,
    name: user.name,
    role: user.role
  };

  const tickets = findTickets();
  // Connexion OK
  res.render('liste-tickets', { tickets });
}

export function logout(req, res) {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send("Erreur lors de la déconnexion");
    }
    res.redirect('/login');
  });
}
