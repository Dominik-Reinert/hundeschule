import { MiddlewareError } from "./middleware_error";

export function isMiddlewareError(
  error: Error | MiddlewareError
): error is MiddlewareError {
  return (error as MiddlewareError).statusCode !== undefined;
}

export class AlreadyRegisteredError extends Error implements MiddlewareError {
  public readonly statusCode: number = 409;

  constructor(
    public notification: string = "Email already registered!"
  ) {
    super(notification);
  }
}
