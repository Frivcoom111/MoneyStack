import bcrypt from "bcrypt";

// Gerar hash de senha.
export const generateHashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};
