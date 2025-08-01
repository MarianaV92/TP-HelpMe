import dotenv from 'dotenv';
import { connectToDb,  } from './db/db.js';  

dotenv.config();

import express from 'express';
import session from 'express-session';
import path from 'path';
import { fileURLToPath } from 'url';

import ticketRoutes from './routes/tickets.js';
import authRoutes from './routes/auth.js';

const app = express();
const PORT = process.env.PORT_NO || 3000;

// -------Pour __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));


//------- Middleware pour parser le body
app.use(express.urlencoded({ extended: true }));

// --------Configuration de la session
app.use(session({
  secret: process.env.SESSION_SECRET || 'changeme',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

//---------- Rendre la session accessible dans les vues
app.use((req, res, next) => {
  res.locals.session = req.session || null;
  next();
});


// ------Setup EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//---------- Routes
app.use('/tickets', ticketRoutes);  // toutes les routes tickets démarrent par /tickets
app.use('/login', authRoutes);           // authRoutes gère /login et /logout

// Redirection page d’accueil vers liste tickets
app.get('/', (req, res) => {
  res.redirect('/tickets');
});


// ------Après toutes tes routes --------
app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status);
  res.render('error', { error: err, status });
});


// -------- Middleware pour les 404 - doit être tout à la fin
app.use((req, res, next) => {
  res.status(404).render('404');  
});


(async () => {
  await connectToDb();

  app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
  });
})(); 