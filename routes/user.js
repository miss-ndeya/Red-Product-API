const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const authMiddleware = require('../middleware/auth');
const User = require('../models/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);

// Route pour récupérer tous les utilisateurs
router.get('/users', userCtrl.getAllUsers);

router.get('/profile', authMiddleware, (req, res) => {
  User.findById(req.auth.userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
      res.status(200).json(user);
    })
    .catch((err) => {
      res
        .status(500)
        .json({ error: "Erreur lors de la récupération de l'utilisateur" });
    });
});

router.put('/profile', authMiddleware, (req, res) => {
  let updateValues = { ...req.body };

 
  delete updateValues._id;
  delete updateValues._userId;

  
  User.findOneAndUpdate({ _id: req.auth.userId }, updateValues, { new: true })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }
      res.status(200).json({ message: 'Utilisateur modifié!', user });
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
});

module.exports = router;
