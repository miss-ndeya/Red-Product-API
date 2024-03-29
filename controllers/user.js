const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
      
        nom: req.body.nom,
        email: req.body.email,
        password: hash,
        // photo: `${req.protocol}://${req.get('host')}/images/${
        //   req.file.filename
        // }`,
      });
      user
        .save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            userId: user._id,
            username: user.nom,
            token: jwt.sign({ userId: user._id }, 'RANDOM_TOKEN_SECRET', {
              expiresIn: '24h',
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.getAllUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.forgotPassword = (req, res, next) => {
  const { email } = req.body;
  
  User.findOne({ email })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé !' });
      }

      const token = jwt.sign({ userId: user._id }, 'RESET_PASSWORD_SECRET', { expiresIn: '1h' });

      user.resetPasswordToken = token;
      user.resetPasswordExpires = Date.now() + 3600000; 
      return user.save();
    })
    .then(user => {
    
      res.status(200).json({ message: 'Un e-mail de réinitialisation de mot de passe a été envoyé !' });
    })
    .catch(error => res.status(500).json({ error }));
};

exports.resetPassword = (req, res, next) => {
  const { token, newPassword } = req.body;

  User.findOne({ resetPasswordToken: token, resetPasswordExpires: { $gt: Date.now() } })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'Token invalide ou expiré !' });
      }

      bcrypt.hash(newPassword, 10)
        .then(hash => {
          user.password = hash;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;
          return user.save();
        })
        .then(() => {
          res.status(200).json({ message: 'Mot de passe réinitialisé avec succès !' });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};