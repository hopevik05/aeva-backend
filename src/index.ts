import { errors } from "celebrate";
import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import lidarRoutes from "./apis/lidar/router";
import { errorHandler } from "./middleware/error.middleware";
import { notFoundHandler } from "./middleware/not-found.middleware";

dotenv.config();

if (!process.env.PORT) {
  process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);
const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use("/api/lidar", lidarRoutes);
app.use(errors());
app.use(errorHandler);
app.use(notFoundHandler);

app.listen(PORT, () => {
  console.log(`App available http://localhost:${PORT}`);
});
