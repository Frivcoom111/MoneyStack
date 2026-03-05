import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const auth = async (request, response, next) => {
  const token = request.headers.authorization;

  if (!token) {
    return response.status(401).json({ message: "Acesso negado." });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);

    request.userId = decoded.id;

    next();
  } catch (error) {
    return response.status(401).json({ message: "Acesso negado." });
  }
};

export default auth;