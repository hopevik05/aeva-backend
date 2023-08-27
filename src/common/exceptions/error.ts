import { Response } from "express";

export const handleError = (res: Response, error: any) => {
  const message = error?.message || "Internal server error";
  const statusCode = error?.response?.status || 500;
  return res.status(statusCode).send({
    statusCode,
    error: error?.reason || error,
    message,
  });
};
