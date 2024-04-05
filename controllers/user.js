const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

// exports.signup = (req, res, next) => {
//   bcrypt
//     .hash(req.body.password, 10)
//     .then((hash) => {
//       const user = new User({
//         nom: req.body.nom,
//         email: req.body.email,
//         password: hash,
//         // photo: `${req.protocol}://${req.get('host')}/images/${
//         //   req.file.filename
//         // }`,
//       });
//       user
//         .save()
//         .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
//         .catch((error) => res.status(400).json({ error }));
//     })
//     .catch((error) => res.status(500).json({ error }));
// };

exports.signup = (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then((hash) => {
      const user = new User({
        nom: req.body.nom,
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: "Utilisateur créé !" }))
        .catch((error) => {
          if (error.name === 'ValidationError' && error.errors && error.errors.email && error.errors.email.kind === 'unique') {
            // Email déjà existant dans la base de données
            return res.status(400).json({ error: "L'adresse e-mail est déjà utilisée." });
          }
          // Autres erreurs de validation ou erreurs internes du serveur
          return res.status(400).json({ error: "Une erreur s'est produite lors de l'inscription." });
        });
    })
    .catch((error) => res.status(500).json({ error }));
};


exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé !" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            userId: user._id,
            username: user.nom,
            token: jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
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
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé !" });
      }
      const token = jwt.sign({ userId: user._id }, "RESET_PASSWORD_SECRET", {
        expiresIn: "1h",
      });

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "redproduct2024@gmail.com",
          pass: "xxac drda bmfi bhdq",
        },
      });

      const mailOptions = {
        from: "redproduct2024@gmail.com",
        to: user.email,
        subject: "Réinitialisation de mot de passe",
        text: `Bonjour,
  
        Vous recevez cet email car nous avons reçu une demande de réinitialisation du mot de passe pour votre compte.

        Cliquez sur le lien suivant pour réinitialiser votre mot de passe :
        
        http://localhost:3001/reinitialiserPassword/${token}
        
        Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet e-mail.
  
        Cordialement,
        L'Equipe de RED PRODUCT`,
      };

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email envoyé: " + info.response);
        }
      });
      res.status(200).json({
        message: "Un e-mail de réinitialisation de mot de passe a été envoyé.",
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.resetPassword = (req, res, next) => {
  const { token, newPassword } = req.body;

  jwt.verify(token, "RESET_PASSWORD_SECRET", (err, decoded) => {
    if (err) {
      return res.status(400).json({ error: "Token invalide ou expiré !" });
    } else {
      // Si le token est valide, mettez à jour le mot de passe de l'utilisateur
      bcrypt.hash(newPassword, 10)
        .then((hash) => {
          // Trouvez l'utilisateur dans la base de données
          User.findOne({ _id: decoded.userId })
            .then((user) => {
              if (!user) {
                return res.status(404).json({ error: "Utilisateur non trouvé !" });
              }
              // Mettez à jour le mot de passe de l'utilisateur
              user.password = hash;
              // Sauvegardez les modifications dans la base de données
              user.save()
                .then(() => {
                  res.status(200).json({ message: "Mot de passe réinitialisé avec succès !" });
                })
                .catch((error) => res.status(500).json({ error }));
            })
            .catch((error) => res.status(500).json({ error }));
        })
        .catch((error) => res.status(500).json({ error }));
    }
  });
};






