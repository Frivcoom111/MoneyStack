import jwt from "jsonwebtoken";

// Gerar token JWT
export const generateToken = async (payload, JWT_SECRET) => {
    return jwt.sign({payload}, JWT_SECRET, { expiresIn: "1h" });
}