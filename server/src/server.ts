import { connectDB } from "./config/db";
import { env } from "./config/env";
import app from "./app";

async function startServer() {
  await connectDB();
  app.listen(env.PORT, () => {
    console.log(`Server running on port ${env.PORT}`);
  });
}

startServer();
