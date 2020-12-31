import { NextFunction, Request, Response } from "express";
import { GenericError } from "./generic_error";
import { isMiddlewareError } from "./not_found_error";

export function errorHandling(
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.error(error);
  const { statusCode, errorNotification } = isMiddlewareError(error)
    ? error
    : new GenericError();
  res.status(statusCode).json({ errorNotification });
}
