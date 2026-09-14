import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";
import cookieParser from "cookie-parser";

import authRoutes from "./routse/auth.routes";
import { env } from "./config/env";

const app = express();

app.use(
  cors({
    origin:
      env.NODE_ENV === "production"
        ? "https://ai-career-copilot-pink.vercel.app/"
        : "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.get("/healthy", (req, res) => {
  res.send("Server is running! AI-CAREER-COPILOT");
});

app.use("/api/v1/auth", authRoutes);

app.use(errorHandler);

export default app;
