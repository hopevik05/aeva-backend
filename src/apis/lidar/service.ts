import { spawn } from "child_process";
import { lidarStore } from "../../common/data/db";
import { Task } from "./interface";

export const findAll = async (): Promise<Task[]> => Object.values(lidarStore);

export const find = async (pid: string): Promise<Task> => lidarStore[pid];

export const create = async ({ data, type, purpose }: Task): Promise<Task> => {
  const job = spawn("node", ["./src/task/index.ts"], {
    detached: false, //if not detached and your main process dies, the child will be killed too
    stdio: [process.stdin, process.stdout, process.stderr], //those can be file streams for logs or whatever
  });
  const pid = job.pid || 0;
  const newTask: Task = {
    pid,
    status: "running",
    job,
    startTime: Date.now(),
    endTime: 0,
    data,
    type,
    purpose,
    link: "",
  };
  lidarStore[pid] = newTask;
  job.on("close", function () {
    lidarStore[pid].status = "completed";
    lidarStore[pid].endTime = Date.now();
  });
  return lidarStore[pid];
};

export const remove = async (pid: string): Promise<null | void> => {
  lidarStore[pid].job.kill("SIGTERM");
  lidarStore[pid].status = "cancelled";
};
