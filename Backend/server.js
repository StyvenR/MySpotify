import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bcrypt from "bcrypt";
import dbConfig from "./config/db_config.js";

const app = express();
const PORT = 8001;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "GET", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// Connexion à la base de données
const db = mysql.createConnection(dbConfig);

db.connect((err) => {
  if (err) {
    console.error("ERREUR DE CONNEXION MySQL:", err);
    return;
  }
  console.log("Connecté à la base de données MySQL");

  db.query("SELECT 1", (err, results) => {
    if (err) {
      console.error("Test de requête échoué:", err);
    } else {
      console.log("Test de requête réussi");
    }
  });
});

// Route d'inscription
app.post("/register", async (req, res) => {
  // console.log("Tentative d'inscription reçue:", req.body);
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    // console.log("Données incomplètes");
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  try {
    // console.log("Vérification de l'email:", email);
    // Vérifier si l'email existe déjà
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          // console.error("Erreur SQL (vérif email):", err);
          return res.status(500).json({ message: "Erreur serveur" });
        }

        // console.log("Résultats vérif email:", results.length);
        if (results.length > 0) {
          return res
            .status(400)
            .json({ message: "Cet email est déjà utilisé" });
        }

        console.log("🔍 Vérification du username:", username);
        // Vérifier si le nom d'utilisateur existe déjà
        db.query(
          "SELECT * FROM users WHERE username = ?",
          [username],
          async (err, results) => {
            if (err) {
              // console.error("Erreur SQL (vérif username):", err);
              return res.status(500).json({ message: "Erreur serveur" });
            }

            // console.log("Résultats vérif username:", results.length);
            if (results.length > 0) {
              return res
                .status(400)
                .json({ message: "Ce nom d'utilisateur est déjà utilisé" });
            }

            // Hash du mot de passe avant insertion
            // console.log("Hashage du mot de passe");
            const hashedPassword = await bcrypt.hash(password, 10);

            // console.log("Tentative d'insertion en DB");
            const sql =
              "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
            db.query(sql, [username, email, hashedPassword], (err, result) => {
              if (err) {
                // console.error("ERREUR INSERTION:", err);
                return res
                  .status(500)
                  .json({
                    message:
                      "Erreur lors de l'enregistrement dans la base de données",
                  });
              }
              // console.log("Insertion réussie! Résultat:", result);
              res
                .status(201)
                .json({ message: "Utilisateur inscrit avec succès!" });
            });
          }
        );
      }
    );
  } catch (error) {
    // console.error("Erreur générale:", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
});

// Route de login
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  // Vérifier si l'utilisateur existe
  db.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Erreur serveur" });
      }

      if (results.length === 0) {
        return res
          .status(400)
          .json({ message: "Email ou mot de passe incorrect" });
      }

      const user = results[0];

      // Vérifier le mot de passe
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ message: "Email ou mot de passe incorrect" });
      }

      // Connexion réussie
      res
        .status(200)
        .json({
          message: "Connexion réussie",
          user: { id: user.id, username: user.username, email: user.email },
        });
    }
  );
});

// Lancer le serveur
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
