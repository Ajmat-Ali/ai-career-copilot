import express from "express";
import cors from "cors";
import { errorHandler } from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running! AI-CAREER-COPILOT");
});

app.use(errorHandler);

export default app;
