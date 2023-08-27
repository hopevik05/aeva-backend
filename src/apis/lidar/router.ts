import express from "express";
import LidarController from "./controllers";
import { validateRequestAddTask } from "./validations";

const lidarRoutes = express.Router();

const lidarController = new LidarController();

lidarRoutes.post("/", validateRequestAddTask, lidarController.raiseRequest);
lidarRoutes.get("/", lidarController.getAllTask);
lidarRoutes.get("/:pid", lidarController.getTaskByPId);
lidarRoutes.get("/download/:pid", lidarController.download);
lidarRoutes.delete("/:pid", lidarController.cancelTask);

export default lidarRoutes;
