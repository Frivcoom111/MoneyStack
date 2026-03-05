import { updateUserPassword, findUserByEmail } from "../models/userModel.js";
import { generateHashPassword } from "../utils/generateHashPassword.js";
import { compareHashPassword } from "../utils/compareHashPassword.js";

// Regra de negócio, update senha usuário.
export const updatePasswordService = async ({ email, currentPassword, newPassword }) => {
  // Validação dos campos.
  if (!email || !currentPassword || !newPassword) throw new Error("Todos os campos são obrigatórios.");
  
  // Validação usuário banco de dados.
  const userExists = await findUserByEmail(email);
  if (!userExists) throw new Error("Usuário não cadastrado.");

  const isMatch = await compareHashPassword(currentPassword, userExists.password);
  if (!isMatch) throw new Error("Senha usuário inválida.");
  
  // Processa senha usuário.
  const hashPassword = await generateHashPassword(newPassword);

  // Atualizando senha usuário.
  const updatedUser = await updateUserPassword(userExists.id, hashPassword);
  if (!updatedUser) throw new Error("Erro ao atualizar senha do usuário.");

  return {
    id: userExists.id,
    name: userExists.name,
    email: userExists.email,
  };
};
