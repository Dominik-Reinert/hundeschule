import { MiddlewareError } from "./middleware_error";

export function isMiddlewareError(
  error: Error | MiddlewareError
): error is MiddlewareError {
  return (error as MiddlewareError).statusCode !== undefined;
}

export class NotFoundError extends Error implements MiddlewareError {
  public readonly statusCode: number = 404;

  constructor(public errorNotification: string = "Could not find entry!") {
    super(errorNotification);
  }
}
