import mysql from "mysql2";

const dbConfigExemple = mysql.createConnection({
  host: "localhost",
  user: "username", // Remplacez par votre nom d'utilisateur MySQL
  password: "password", // Remplacez par votre mot de passe MySQL
  database: "spotify",
});

export default dbConfigExemple;