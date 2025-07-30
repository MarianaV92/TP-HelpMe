const { getAllUsers } = require('../services/usersService');
const { findTickets } = require('../services/ticketsService');

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.post = (req, res) => {
  const { username, password } = req.body;
  const user = getAllUsers().find(u => u.username === username);

  if (!user || user.password !== password) {
    return res.status(404).send('Utilisateur non trouvé ou mot de passe incorrect');
  }

// Faut stocker les donnes dans la session
   req.session.user = {
    id: user.id,
    name: user.name,
    role: user.role
  };

  const tickets = findTickets();
  // Connexion OK
  res.render('liste-tickets', { tickets });
};


exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.status(500).send("Erreur lors de la déconnexion");
    }
    res.redirect('/login');
  });
};
