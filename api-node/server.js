import app from "./src/app.js";
import dotenv from "dotenv";
import pool from "./src/config/database.js";

dotenv.config();

// Conexão com o banco de dados.
pool.query("SELECT NOW()")
  .then((res) => {console.log("Banco conectado:", res.rows)})
  .catch((err) => console.error(err));

// Rodando servidor node.js - terminal: npm run dev  
app.listen(process.env.PORT, () => {
  console.log("Servidor rodando:", process.env.PORT);
});
