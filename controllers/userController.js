import { getAllUsers } from '../services/usersService.js';
import { findTickets } from '../services/ticketsService.js';
import bcrypt from 'bcrypt';

export function getLogin(req, res) {
  res.render('login');
}
export async function post(req, res) {
  const { username, password } = req.body;

  try {
    const users = await getAllUsers();
    const user = users.find(u => u.username === username);

    if (!user) {
      return res.status(401).send('Nom d’utilisateur ou mot de passe incorrect');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      // Message générique
      return res.status(401).send('Nom d’utilisateur ou mot de passe incorrect');
    }

    // --------Stockage dans la session
    req.session.user = {
      id: user._id || user.id,
      name: user.name,
      role: user.role,
    };

    const tickets = await findTickets();
    res.render('liste-tickets', { tickets });

  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).send('Erreur serveur');
  }
}

export function logout(req, res) {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send("Erreur lors de la déconnexion");
    }
    res.redirect('/login');
  });
}
