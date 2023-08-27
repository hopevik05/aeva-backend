import { Request, Response } from "express";
import { handleError } from "../../common/exceptions/error";
import { Task } from "./interface";
import * as LidarService from "./service";

export default class LidarController {
  getAllTask = async (_req: Request, res: Response) => {
    try {
      const items: Task[] = await LidarService.findAll();
      res.status(200).send(items);
    } catch (error) {
      handleError(res, error);
    }
  };

  getTaskByPId = async (req: Request, res: Response) => {
    try {
      const { pid } = req.params;
      const item: Task = await LidarService.find(pid);
      if (item) {
        return res.status(200).send(item);
      }
      res.status(404).send({
        status: "fail",
        message: `No task with pid ${pid} was found`,
      });
    } catch (error) {
      handleError(res, error);
    }
  };

  download = async (req: Request, res: Response) => {
    try {
      const { pid } = req.params;
      const item: Task = await LidarService.find(pid);
      if (item) {
        let file = ".src/../public/sample.xlsx";
        if (item.type === "pdf") {
          file = ".src/../public/sample.pdf";
        }
        return res.download(file);
      }
      res.status(404).send({
        status: "fail",
        message: `No task with pid ${pid} was found`,
      });
    } catch (error) {
      handleError(res, error);
    }
  };

  raiseRequest = async (req: Request, res: Response) => {
    try {
      const item: Task = req.body;
      const newItem = await LidarService.create(item);
      res.status(201).json(newItem);
    } catch (error) {
      handleError(res, error);
    }
  };
  cancelTask = async (req: Request, res: Response) => {
    try {
      const { pid } = req.params;
      const item: Task = await LidarService.find(pid);
      if (item) {
        await LidarService.remove(pid);
        return res.sendStatus(204);
      }
      res.status(404).send({
        status: "fail",
        message: `No task with pid ${pid} was found`,
      });
    } catch (error) {
      handleError(res, error);
    }
  };
}
