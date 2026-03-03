import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { createUser, findUserByEmail } from "../models/userModel.js";
import { generateToken } from "../utils/generateToken.js";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

// Regra de negócio, aqui será feita a verificação para poder gravar os dados no banco.
export const registerService = async ({ name, email, password }) => {
  // Validação dos campos
  if (!name || !email || !password) {
    throw new Error("Todos os campos são obrigatórios.");
  }

  // Verificando se o usuário já existe no banco.
  const userExists = await findUserByEmail(email);
  if (userExists) {
    throw new Error("Usuário já cadastrado.");
  }

  // Processamento senha.
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  // Criando usuário no banco de dados.
  const newUser = await createUser(name, email, hashPassword);
  if (!newUser) {
    throw new Error("Erro ao criar usuário no banco.");
  }

  return {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
  };
};

// Regra de negócio, aqui será feita a verificação do usuário para que ele possa logar.
export const loginService = async ({ email, password }) => {
  // Validação dos campos
  if (!email || !password) {
    throw new Error("Email e senha são obrigatórios.");
  }

  // Verificação se o usuário existe no banco.
  const userExists = await findUserByEmail(email);
  if (!userExists) {
    throw new Error("Usuário não cadastrado.");
  }

  // Comparando a senha do banco com a enviado na req.
  const isMatch = await bcrypt.compare(password, userExists.password);
  if (!isMatch) {
    throw new Error("Senha inválida.");
  }

  // Criação do token JWT após as verificações.
  const token = generateToken({ id: userExists.id }, JWT_SECRET);

  return token;
};
