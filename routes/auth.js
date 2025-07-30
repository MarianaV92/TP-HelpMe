const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const userController = require('../controllers/userController');

router.get('/', userController.getLogin);

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
  userController.post
);

// GET logout
router.get('/logout', userController.logout);

module.exports = router;
