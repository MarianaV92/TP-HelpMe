import express from 'express';
import { body, validationResult } from 'express-validator';
import { getLogin, post, logout } from '../controllers/userController.js';

const router = express.Router();

router.get('/', getLogin);

router.post(
  '/',
  // Validation
  body('username').notEmpty().withMessage("Le nom d'utilisateur est requis"),
  body('password').notEmpty().withMessage('Le mot de passe est requis'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('login', { errors: errors.array() });
    }
    next();
  },
  post
);

// GET logout
router.get('/logout', logout);

export default router;
