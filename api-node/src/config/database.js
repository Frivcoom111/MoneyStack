import dotenv from "dotenv";
dotenv.config();

import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.USER_DB,
  password: process.env.USER_PASSWORD,
  host: process.env.HOST,
  database: process.env.DATABASE,
  port: 5432,
});

export default pool;