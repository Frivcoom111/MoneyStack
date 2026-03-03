import app from "./src/app.js";
import dotenv from "dotenv";
import { connectDatabase } from "./src/config/database.js";

dotenv.config();

// Conexão com o banco de dados.
connectDatabase();

// Rodando servidor node.js - terminal: npm run dev
app.listen(process.env.PORT, () => {
  console.log("Servidor rodando:", process.env.PORT);
});
