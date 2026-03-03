import express from "express";
import publicRoutes from "./routes/authRoutes.js"

const app = express();
app.use(express.json());

app.use("/", publicRoutes)

export default app;