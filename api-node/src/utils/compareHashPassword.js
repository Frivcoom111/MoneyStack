import bcrypt from "bcrypt";

// Compara senha do usuário que está no banco com a senha digitada. 
export const compareHashPassword = async (passwordEntered, userPassword) => {
    const isMatch = await bcrypt.compare(passwordEntered, userPassword);
    return isMatch;
}