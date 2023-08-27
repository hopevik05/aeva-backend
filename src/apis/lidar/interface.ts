export interface Task {
  pid: number;
  status: string;
  startTime: number;
  endTime: number;
  job: any;
  purpose: string;
  data: string;
  type: string;
  link: string;
}

export interface LidarTask {
  [key: string]: Task;
}
