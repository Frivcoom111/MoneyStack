import pool from "../config/database.js";

// Model para criação do usuário no banco de dados.
export const createUser = async (name, email, password) => {
  // Query para criação do usuário.
  const query = `
        INSERT INTO users (name, email, password)
        VALUES ($1, $2, $3)
        RETURNING *
    `;

  const values = [name, email, password];
  const result = await pool.query(query, values);

  return result.rows[0];
};

// Query paraBuscar usuários no banco de dados.
export const findUserByEmail = async (email) => {
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  return result.rows[0];
};

export const updateUserPassword = async (id, password) => {
  const query = `UPDATE users SET 
    password = $1 
    WHERE id = $2 
    RETURNING id, email
  `;

  const values = [password, id];
  const result = await pool.query(query, values);

  return result.rows[0];
};
