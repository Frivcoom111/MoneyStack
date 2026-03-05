import express from "express";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import auth from "./middlewares/authMiddlewares.js"

const app = express();
app.use(express.json());

app.use("/", authRoutes);

app.use("/user", auth, userRoutes);

export default app;
